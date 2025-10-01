import { Button } from "@/components/ui/button.tsx";
import ChatMessage from "@/components/ui/ChatMessage.tsx";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {useGetChatInfoQuery, useGetChatMessagesQuery} from "@/features/api/endpoints/Chat";
import {ChatSignalRProvider, useChatSignalR} from "@/features/signalr/ChatSignalRProvider.tsx";
import ChatInput from "@/components/ui/ChatInput.tsx";
import RequiredInfoPanel from "@/components/ui/RequiredInfoPanel.tsx";
import TypingIndicator from "@/components/ui/TypingIndicator.tsx";

function getUserIdFromToken() {
    const token =
        localStorage.getItem("accessToken") ??
        sessionStorage.getItem("accessToken");

    if (!token) {
        console.error("Токен не знайдено ні в localStorage, ні в sessionStorage");
        return null;
    }

    try {
        const payload = token.split(".")[1];

        let base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        // додаємо падінг, якщо треба
        while (base64.length % 4 !== 0) {
            base64 += "=";
        }

        const decodedPayload = atob(base64);
        const parsedPayload = JSON.parse(decodedPayload);
        const userId = parsedPayload.nameid;

        if (!userId) {
            console.error("User ID не знайдено в токені");
            return null;
        }

        return userId;
    } catch (error) {
        console.error("Помилка при декодуванні токена:", error);
        return null;
    }
}

function getUserRoleFromToken() {
    const token =
        localStorage.getItem("accessToken") ||
        sessionStorage.getItem("accessToken");

    if (!token) {
        console.error("Токен не знайдено ні в localStorage, ні в sessionStorage");
        return null;
    }

    try {
        const payload = token.split(".")[1];
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const decodedPayload = atob(base64);
        const parsedPayload = JSON.parse(decodedPayload);

        const role = parsedPayload.roles;

        if (!role) {
            console.error("Role не знайдено в токені");
            return null;
        }

        return role;
    } catch (error) {
        console.error("Помилка при декодуванні токена:", error);
        return null;
    }
}


function formatDate(date: Date) {
    const now = new Date();
    if (date.getFullYear() !== now.getFullYear()) {
        return date.toLocaleDateString("en-EN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }
    return date.toLocaleDateString("en-EN", {
        day: "2-digit",
        month: "long",
    });
}

export default function ChatPageWrapper() {
    const { id: chatIdStr } = useParams<{ id: string }>();
    const chatId = Number(chatIdStr) || 100;

    return (
        <ChatSignalRProvider chatId={chatId}>
            <ChatPage chatId={chatId} />
        </ChatSignalRProvider>
    );
}

function ChatPage({ chatId }: { chatId: number }) {
    const [page, setPage] = useState(1);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
    const { data: chatInfo, isLoading: isInfoLoading } = useGetChatInfoQuery({ chatId });
    const { data: chatData, isLoading, isFetching, error } = useGetChatMessagesQuery({ chatId, page, pageSize: 50 });
    const [activeDate, setActiveDate] = useState<string | null>(null);
    const [isDateVisible, setIsDateVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const totalCount = chatData?.totalCount ?? 0;

    useEffect(() => {
        setCurrentUserId(getUserIdFromToken());
        setCurrentUserRole(getUserRoleFromToken());
    }, []);

    useEffect(() => {
        if (!containerRef.current || !chatData?.messages) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .map((e) => e.target.getAttribute("data-timestamp"))
                    .filter(Boolean);

                if (visible.length > 0) {
                    const lastVisible = new Date(parseInt(visible[visible.length - 1]!, 10));
                    setActiveDate(formatDate(lastVisible));
                    setIsDateVisible(true);

                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }
                    timeoutRef.current = setTimeout(() => {
                        setIsDateVisible(false);
                    }, 3000);
                }
            },
            { root: containerRef.current, threshold: 0.6 }
        );

        const nodes = containerRef.current.querySelectorAll("[data-timestamp]");
        nodes.forEach((n) => observer.observe(n));

        let lastScrollTop = containerRef.current.scrollTop;
        const handleScroll = () => {
            const currentScrollTop = containerRef.current!.scrollTop;
            if (currentScrollTop < lastScrollTop) {
                setIsDateVisible(true);
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(() => {
                    setIsDateVisible(false);
                }, 3000);
            }
            lastScrollTop = currentScrollTop;
        };

        containerRef.current.addEventListener("scroll", handleScroll);

        return () => {
            observer.disconnect();
            containerRef.current?.removeEventListener("scroll", handleScroll);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [chatData?.messages]);

    // Auto-scroll to bottom on load or new messages
    useEffect(() => {
        if (containerRef.current && chatData?.messages?.length) {
            containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
        }
    }, [chatData?.messages]);

    const handleLoadMore = () => {
        if (chatData && page * 50 < totalCount) {
            setPage((prev) => prev + 1); // Fetch earlier messages
        }
    };

    return (
        <main className="w-2/3 mx-auto flex gap-[12px] h-[720px] pb-16 pt-5">
            <RequiredInfoPanel chatId={chatId} isManager={currentUserRole === "Manager"} />

            <section className="w-3/4 flex flex-col rounded-md bg-[#212121] relative">
                <div className="flex items-center justify-between px-3 py-2.5 border-b border-white">
                    <span className="font-amulya font-bold text-lg text-white">
                        {isInfoLoading
                            ? "Loading car info..."
                            : chatInfo
                                ? `${chatInfo.year} ${chatInfo.make} ${chatInfo.model}`
                                : "Unknown car"}
                    </span>
                    <span className="text-base font-synonym font-medium text-white">
                        {currentUserRole === "Manager" ? "Seller:" : "Working manager:"}
                        <span className="font-amulya font-bold ml-3">
                            {isInfoLoading
                                ? "Loading..."
                                : chatInfo?.username ?? "Unknown user"}
                        </span>
                    </span>
                </div>

                {activeDate && (
                    <div
                        className={`absolute top-[50px] mt-3 left-0 right-0 flex justify-center z-50 pointer-events-none transition-opacity duration-300 ${
                            isDateVisible ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <span className="bg-gray-400 text-white text-sm px-3 py-1 rounded-full shadow">
                          {activeDate}
                        </span>
                    </div>
                )}

                <div ref={containerRef} className="h-full flex flex-col gap-2.5 px-3 overflow-y-auto">
                    {error && (
                        <div className="text-center text-red-500">
                            Failed to load messages: {(error as any).data?.message || "Unknown error"}
                        </div>
                    )}
                    {totalCount > page * 50 && (
                        <div className="text-center my-2">
                            <Button onClick={handleLoadMore} disabled={isFetching}>
                                {isFetching ? "Loading..." : "Load More"}
                            </Button>
                        </div>
                    )}
                    {isLoading ? (
                        <div className="text-center text-white">Loading...</div>
                    ) : !chatData?.messages?.length ? (
                        <div className="text-center text-white">No messages yet</div>
                    ) : (
                        chatData.messages
                            .slice()
                            .sort((a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime())
                            .map((msg, index, sortedArray) => {
                            const prev = sortedArray[index - 1];
                            const currDate = new Date(msg.sentAt);
                            const prevDate = prev ? new Date(prev.sentAt) : null;

                            const showDateDivider =
                                !prevDate ||
                                currDate.getDate() !== prevDate.getDate() ||
                                currDate.getMonth() !== prevDate.getMonth() ||
                                currDate.getFullYear() !== prevDate.getFullYear();

                            return (
                                <div key={msg.id} data-timestamp={+currDate}>
                                    {showDateDivider && (
                                        <div className="text-center my-2">
                                            <span className="bg-gray-300 text-gray-700 text-sm px-3 py-1 rounded-full">
                                                {formatDate(currDate)}
                                            </span>
                                        </div>
                                    )}
                                    <ChatMessage message={msg} currentUserId={currentUserId} />
                                </div>
                            );
                        })
                    )}

                </div>
                <TypingIndicator/>
                <ChatInput/>
            </section>
        </main>
    );
}