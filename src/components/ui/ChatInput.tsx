import {type ChangeEvent, useState} from "react";
import { Button } from "@/components/ui/button.tsx";
import { Paperclip, Smile, X } from "lucide-react";
import { useChatSignalR } from "@/features/signalr/ChatSignalRProvider";

export default function ChatInput() {
    const { sendMessage } = useChatSignalR();
    const [text, setText] = useState("");
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selected = Array.from(e.target.files);

        // фільтр: тільки картинки + максимум 5
        const valid = selected.filter((f) =>
            ["image/jpeg", "image/png", "image/webp"].includes(f.type)
        );

        const newFiles = [...files, ...valid].slice(0, 5); // максимум 5
        setFiles(newFiles);

        e.target.value = ""; // щоб можна було вибирати ті ж самі файли знову
    };

    const handleRemoveFile = (idx: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== idx));
    };

    const handleSend = () => {
        if (!text.trim() && files.length === 0) return;
        sendMessage(text.trim(), files);
        setText("");
        setFiles([]);
    };

    return (
        <div className="px-3 flex items-center gap-4 h-auto min-h-[60px] py-2">
            <div className="flex-1 flex flex-col bg-[#2c2c2c] rounded-md px-3 py-1.5 gap-2">
                {/* прев’ю файлів */}
                {files.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                        {files.map((file, idx) => {
                            const url = URL.createObjectURL(file);
                            return (
                                <div
                                    key={idx}
                                    className="relative w-16 h-16 rounded-md overflow-hidden bg-black"
                                >
                                    <img
                                        src={url}
                                        alt={file.name}
                                        className="object-cover w-full h-full"
                                    />
                                    <button
                                        onClick={() => handleRemoveFile(idx)}
                                        className="absolute top-1 right-1 bg-black/60 rounded-full p-1 hover:bg-black/80"
                                    >
                                        <X size={14} className="text-white" />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* панель інпута */}
                <div className="flex items-center gap-3">
                    <label className="cursor-pointer">
                        <input
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
                        onChange={(e) => setText(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    />

                    <button>
                        <Smile size={20} className="text-[#d0d0d0]" />
                    </button>
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
