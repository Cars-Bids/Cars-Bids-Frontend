import {createContext, useCallback, useContext, useEffect, useState,} from "react";
import {HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import conf from "@/app/conf/basic.conf.json";
import {getAccessToken} from "@/features/api/Auth/authService";
import type {ChatMessageDto} from "@/features/types/Chat";
import {message} from "antd";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "@/app/store";
import {ChatEndpoints} from "@/features/api/endpoints/Chat";

interface TypingUser {
    userId: number;
    username?: string;
}

interface ChatSignalRContextValue {
    connection: HubConnection | null;
    sendMessage: (text: string, files?: File[]) => Promise<void>;
    sendTypingStatus: (isTyping: boolean) => void;
    readMessage: (messageId: number) => void;
    typingUsers: TypingUser[];
}

const ChatSignalRContext = createContext<ChatSignalRContextValue>({
    connection: null,
    sendMessage: async () => {},
    sendTypingStatus: () => {},
    readMessage: () => {},
    typingUsers: []
});

export const useChatSignalR = () => useContext(ChatSignalRContext);

interface Props {
    chatId: number;
    children: React.ReactNode;
}

export const ChatSignalRProvider = ({ chatId, children }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);

    // Typing status sender
    const sendTypingStatus = useCallback((isTyping: boolean) => {
        if (!connection) {
            console.log("Cannot send typing status - no connection");
            return;
        }

        console.log(`Sending typing status: ${isTyping} for chat ${chatId}`);
        connection.invoke("SendTypingStatus", chatId, isTyping)
            .then(() => {
                console.log(`Successfully sent typing status: ${isTyping}`);
            })
            .catch(err => console.error("Error sending typing status:", err));
    }, [connection, chatId]);

    // Read message function
    const readMessage = useCallback((messageId: number) => {
        if (!connection) return;

        connection.invoke("ReadMessage", chatId, messageId)
            .catch(err => console.error("Error marking message as read:", err));
    }, [connection, chatId]);

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

        // Typing status received
        conn.on("ReceiveTypingStatus", (data: {
            chatId: number;
            userId: number;
            isTyping: boolean;
            username?: string;
        }) => {
            console.log("ReceiveTypingStatus received:", data);

            if (data.chatId !== chatId) return;

            console.log(`User ${data.userId} ${data.isTyping ? 'started' : 'stopped'} typing`);

            setTypingUsers(prev => {
                if (data.isTyping) {
                    // Add user to typing list if not already there
                    const exists = prev.some(user => user.userId === data.userId);
                    if (!exists) {
                        console.log(`Adding User ${data.userId} to typing users`);
                        return [...prev, { userId: data.userId, username: data.username }];
                    }
                    return prev;
                } else {
                    // Remove user from typing list
                    console.log(`Removing User ${data.userId} from typing users`);
                    return prev.filter(user => user.userId !== data.userId);
                }
            });

            // Auto-remove typing indicator after 5 seconds
            if (data.isTyping) {
                setTimeout(() => {
                    setTypingUsers(prev => prev.filter(user => user.userId !== data.userId));
                }, 5000);
            }
        });

        // Message seen notification
        conn.on("MessageSeen", ({ ChatId, MessageId, ReaderId }: {
            ChatId: number;
            MessageId: number;
            ReaderId: number;
        }) => {
            if (ChatId !== chatId) return;

            // Update message read status in cache
            dispatch(
                ChatEndpoints.util.updateQueryData(
                    "getChatMessages",
                    { chatId, page: 1, pageSize: 50 },
                    (draft) => {
                        const messageIndex = draft.messages.findIndex(msg => msg.id === MessageId);
                        if (messageIndex !== -1) {
                            // Add reader to message if read status tracking exists
                            if (!draft.messages[messageIndex].readBy) {
                                draft.messages[messageIndex].readBy = [];
                            }
                            const alreadyRead = draft.messages[messageIndex].readBy?.some(reader => reader.userId === ReaderId);
                            if (!alreadyRead) {
                                draft.messages[messageIndex].readBy?.push({
                                    userId: ReaderId,
                                    readAt: new Date().toISOString()
                                });
                            }
                        }
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
            // Stop typing when disconnecting
            if (conn.state === "Connected") {
                conn.invoke("SendTypingStatus", chatId, false).catch(() => {});
            }
            conn.stop();
            setConnection(null);
            setTypingUsers([]);
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
        <ChatSignalRContext.Provider value={{
            connection,
            sendMessage,
            sendTypingStatus,
            readMessage,
            typingUsers
        }}>
            {children}
        </ChatSignalRContext.Provider>
    );
};