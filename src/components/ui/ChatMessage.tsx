import type { ChatMessageDto } from "@/features/types/Chat";
import {Check, CheckCheck} from "lucide-react";

type ChatMessageProps = {
    message: ChatMessageDto;
    currentUserId: string | null;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, currentUserId }) => {
    const isMine = message.senderId.toString() === currentUserId;
    const numImages = message.attachment?.length || 0;
    const isOdd = numImages % 2 === 1;

    return (
        <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[45%] px-2 py-1 rounded-sm text-xs ${
                    isMine
                        ? "bg-[#d0d0d0] text-black"
                        : "bg-[#2c2c2c] text-white"
                }`}
            >
                {/* Attachments */}
                {numImages > 0 && (
                    <div className="grid grid-cols-2 gap-1 mt-1">
                        {message.attachment!.map((url, idx) => (
                            <img
                                key={idx}
                                src={url}
                                alt={`attachment ${idx + 1}`}
                                className={`rounded object-cover w-full ${
                                    numImages === 1
                                        ? "max-h-96"
                                        : "h-32"
                                } ${
                                    idx === 0 && (isOdd || numImages === 1)
                                        ? "col-span-2"
                                        : ""
                                }`}
                            />
                        ))}
                    </div>
                )}

                {/* текст */}
                {message.message && (
                    <p className="">{message.message}</p>
                )}

                {/* час + статус */}
                <div className="flex justify-end items-center">
                    {isMine && (
                        <span>{message.seenBy?.length && message.seenBy.length > 1 ? <CheckCheck className="text-black h-[14px]"/> : <Check className="text-black h-[14px]"/>}</span>
                    )}

                    <span className={`${ isMine ? "text-black" : "text-white"} text-[10px] font-synonym`}>
                        {new Date(message.sentAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;