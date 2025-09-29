import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Paperclip, X } from "lucide-react";
import { useChatSignalR } from "@/features/signalr/ChatSignalRProvider";

// Debounce hook for typing status
function useDebounce(callback: () => void, delay: number) {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    return useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(callback, delay);
    }, [callback, delay]);
}

export default function ChatInput() {
    const { sendMessage, sendTypingStatus } = useChatSignalR();
    const [text, setText] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Stop typing after 3 seconds of inactivity
    const stopTyping = useDebounce(() => {
        if (isTyping) {
            setIsTyping(false);
            sendTypingStatus(false);
        }
    }, 3000);

    // Генерація preview URL-ів і ревок при зміні файлів
    useEffect(() => {
        // Ревокуємо попередні URL-и в cleanup
        const objectUrls = files.map((f) => URL.createObjectURL(f));
        setPreviews(objectUrls);

        return () => {
            objectUrls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [files]);

    // Clean up typing status on unmount
    useEffect(() => {
        return () => {
            if (isTyping) {
                sendTypingStatus(false);
            }
        };
    }, [isTyping, sendTypingStatus]);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setText(value);

        // Send typing status
        if (value.trim() && !isTyping) {
            setIsTyping(true);
            sendTypingStatus(true);
        } else if (!value.trim() && isTyping) {
            setIsTyping(false);
            sendTypingStatus(false);
        }

        // Reset the stop typing timer
        if (value.trim()) {
            stopTyping();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selected = Array.from(e.target.files);

        // Фільтр: тільки картинки + максимум 5
        const valid = selected.filter((f) =>
            ["image/jpeg", "image/png", "image/webp"].includes(f.type)
        );

        // Додаємо нові і обмежуємо до 5
        const newFiles = [...files, ...valid].slice(0, 5);
        setFiles(newFiles);

        // Скидаємо value щоб можна було вибрати ті самі файли знову
        e.target.value = "";
    };

    const handleRemoveFile = (idx: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== idx));
    };

    const handleSend = () => {
        if (!text.trim() && files.length === 0) return;

        // Stop typing immediately when sending
        if (isTyping) {
            setIsTyping(false);
            sendTypingStatus(false);
        }

        sendMessage(text.trim(), files);
        setText("");
        setFiles([]);
        // previews будуть ревокнуті в useEffect cleanup
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="px-3 flex items-end gap-4 min-h-[60px] py-2">
            <div className="flex-1 bg-[#2c2c2c] rounded-md px-3 py-2 flex flex-col">
                {/* PREVIEWS — висота анімована, щоб інпут не сіпається */}
                <div
                    className={`mb-2 flex gap-2 flex-wrap transition-all duration-200 ease-in-out ${
                        previews.length ? "max-h-36 overflow-auto" : "max-h-0 overflow-hidden"
                    }`}
                >
                    {previews.map((url, idx) => (
                        <div key={url} className="relative w-16 h-16 rounded-md overflow-hidden bg-black flex-shrink-0">
                            <img src={url} alt={`preview-${idx}`} className="object-cover w-full h-full" />
                            <button
                                onClick={() => handleRemoveFile(idx)}
                                className="absolute top-1 right-1 bg-black/60 rounded-full p-1 hover:bg-black/80"
                                type="button"
                            >
                                <X size={14} className="text-white" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* INPUT ROW */}
                <div className="flex items-center gap-3">
                    <label className="cursor-pointer">
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            multiple
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={files.length >= 5}
                        />
                        <Paperclip size={20} className="text-[#d0d0d0]" />
                    </label>

                    <input
                        type="text"
                        placeholder="Type a message"
                        className="flex-1 bg-transparent text-white outline-none placeholder-[#d0d0d0] font-amulya font-medium text-base"
                        value={text}
                        onChange={handleTextChange}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>

            <Button
                onClick={handleSend}
                className="font-amulya font-bold rounded-md px-[30px] py-[10px] bg-white text-[#212121]"
            >
                Send
            </Button>
        </div>
    );
}