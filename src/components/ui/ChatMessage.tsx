import type { ChatMessageDto } from "@/features/types/Chat";
import {Check, CheckCheck} from "lucide-react";

type ChatMessageProps = {
    message: ChatMessageDto;
    currentUserId: number;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, currentUserId }) => {
    const isMine = message.senderId === currentUserId;

    return (
        <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[45%] px-2 py-1 rounded-sm text-xs ${
                    isMine
                        ? "bg-[#d0d0d0] text-black"
                        : "bg-[#2c2c2c] text-white"
                }`}
            >
                {/* текст */}
                {message.message && (
                    <p className="">{message.message}</p>
                )}

                {/* час + статус */}
                <div className="flex justify-end items-center gap-1">
                    {isMine && (
                        <span>{message.seenBy?.length && message.seenBy.length > 1 ? <CheckCheck className="text-black h-[14px]"/> : <Check className="text-black h-[14px]"/>}</span>
                    )}

                    <span className="text-black text-[10px] font-synonym">
                        {message.sentAt.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;