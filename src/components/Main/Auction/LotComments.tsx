import { useState } from "react";
import { MessageCircle, Flag, Send } from "lucide-react";
import {timeAgo} from "@/lib/utils.ts";

export type Comment = {
    id: string;
    author: string;
    text: string;
    time: Date;
};

const MAX_LENGTH = 200;

export default function LotComments({ comments }: { comments: Comment[] }) {
    const [inputText, setInputText] = useState("");

    const handleReply = (id: string) => {
        alert(`Reply clicked for comment ${id}`);
    };
    const handleReport = (id: string) => {
        alert(`Report clicked for comment ${id}`);
    };
    const handlePost = () => {
        alert(`Post comment clicked: ${inputText}`);
        setInputText(""); // очищаємо інпут після "посту"
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black dark:text-gray-200">Comments</h3>
            <section>
                {/* Інпут з іконкою всередині */}
                <div className="mb-1 relative">
                    <input
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        maxLength={MAX_LENGTH}
                        className="w-full rounded-sm border dark:border-zinc-100 border-zinc-800 px-3 py-2 pr-10 text-sm outline-none focus:border-zinc-600 text-black dark:text-gray-200"
                        placeholder="Leave a comment"
                    />
                    <button
                        onClick={handlePost}
                        className="absolute right-1 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-white hover:bg-zinc-950"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </div>

                {/* Лічильник символів */}
                <div className="mb-3 text-xs text-zinc-400 text-right">
                    {inputText.length}/{MAX_LENGTH}
                </div>

                <ul className="space-y-4">
                    {comments.map((c) => (
                        <li key={c.id} className="p-3">
                            <div className="mb-1 text-xs text-black dark:text-gray-200">
                                <b>{c.author}</b> • {timeAgo(c.time)}
                            </div>
                            <p className="text-sm leading-relaxed mb-2 text-black dark:text-gray-200">{c.text}</p>
                            <div className="flex gap-4 text-xs text-black dark:text-gray-200">
                                <button
                                    className="flex items-center gap-1 hover:underline"
                                    onClick={() => handleReply(c.id)}
                                >
                                    <MessageCircle className="h-3 w-3" /> Reply
                                </button>
                                <button
                                    className="flex items-center gap-1 hover:underline"
                                    onClick={() => handleReport(c.id)}
                                >
                                    <Flag className="h-3 w-3" /> Report message
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}