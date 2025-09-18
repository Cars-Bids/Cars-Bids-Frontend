import {createContext, useCallback, useContext, useEffect, useState,} from "react";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import conf from "@/app/conf/basic.conf.json";
import {getAccessToken} from "@/features/api/Auth/authService";
import type {ChatMessageDto} from "@/features/types/Chat";
import {message} from "antd";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "@/app/store";
import {ChatEndpoints} from "@/features/api/endpoints/Chat";

interface ChatSignalRContextValue {
    connection: HubConnection | null;
    sendMessage: (text: string, files?: File[]) => Promise<void>;
}

const ChatSignalRContext = createContext<ChatSignalRContextValue>({
    connection: null,
    sendMessage: async () => {},
});

export const useChatSignalR = () => useContext(ChatSignalRContext);

interface Props {
    chatId: number;
    children: React.ReactNode;
}

export const ChatSignalRProvider = ({ chatId, children }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const [connection, setConnection] = useState<HubConnection | null>(null);

    useEffect(() => {
        const conn = new HubConnectionBuilder()
            .withUrl(`${conf.hubUrl}/chat`, {
                accessTokenFactory: () => getAccessToken() || "",
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        conn.start()
            .then(async () => {
                console.log(`SignalR connected for chat ${chatId}`);
                await conn.invoke("JoinChat", chatId);
            })
            .catch((err) => console.error("SignalR connection failed:", err));

        // === Обробка подій від хаба ===
        conn.on("ReceiveMessage", (newMessage: ChatMessageDto) => {
            if (newMessage.chatId !== chatId) return;
            dispatch(
                ChatEndpoints.util.updateQueryData(
                    "getChatMessages",
                    { chatId, page: 1, pageSize: 50 },
                    (draft) => {
                        draft.messages.unshift(newMessage); // додаємо нове повідомлення
                        draft.totalCount++;
                    }
                )
            );
        });

        conn.on("NewRequest", (dto) => {
            dispatch(
                ChatEndpoints.util.updateQueryData(
                    "getChatRequirements",
                    chatId,
                    (draft) => {
                        draft.push(dto);
                    }
                )
            );
        });

        conn.on("RequestDeleted", (id: number) => {
            dispatch(
                ChatEndpoints.util.updateQueryData(
                    "getChatRequirements",
                    chatId,
                    (draft) => {
                        const idx = draft.findIndex((r) => r.id === id);
                        if (idx !== -1) draft.splice(idx, 1);
                    }
                )
            );
        });

        conn.on("EditMessage", (editedMessage: ChatMessageDto) => {
            if (editedMessage.chatId !== chatId) return;
            dispatch(
                ChatEndpoints.util.updateQueryData(
                    "getChatMessages",
                    { chatId, page: 1, pageSize: 50 },
                    (draft) => {
                        const idx = draft.messages.findIndex((m) => m.id === editedMessage.id);
                        if (idx !== -1) draft.messages[idx] = editedMessage;
                    }
                )
            );
        });

        conn.on("DeleteMessage", (messageId: number) => {
            dispatch(
                ChatEndpoints.util.updateQueryData(
                    "getChatMessages",
                    { chatId, page: 1, pageSize: 50 },
                    (draft) => {
                        draft.messages = draft.messages.filter((m) => m.id !== messageId);
                        draft.totalCount--;
                    }
                )
            );
        });

        conn.on("MessageRejected", (reason: string) => {
            message.error(reason);
        });

        setConnection(conn);

        return () => {
            conn.stop();
            setConnection(null);
            console.log(`SignalR disconnected for chat ${chatId}`);
        };
    }, [chatId, dispatch]);

    // === функція для відправки повідомлення ===
    const sendMessage = useCallback(
        async (text: string, files?: File[]) => {
            if (!connection) return;

            let attachmentUrls: string[] = [];

            if (files && files.length > 0) {
                // завантажуємо файли через REST API
                const formData = new FormData();
                files.forEach((f) => formData.append("Files", f));
                const res = await fetch(`${conf.baseUrl}/Chat/upload`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${getAccessToken()}`,
                    },
                    body: formData,
                });
                if (!res.ok) {
                    message.error("File upload failed");
                    return;
                }
                attachmentUrls = await res.json(); // очікуємо, що сервер повертає масив URL
            }

            try {
                await connection.invoke("SendMessage", chatId, text, attachmentUrls);
            } catch (err) {
                console.error("SendMessage failed:", err);
            }
        },
        [connection, chatId]
    );

    return (
        <ChatSignalRContext.Provider value={{ connection, sendMessage }}>
            {children}
        </ChatSignalRContext.Provider>
    );
};
