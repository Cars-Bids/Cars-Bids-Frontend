import React, {useRef, useState} from "react";
import {MessageCircle, Flag, Send, User} from "lucide-react";
import {timeAgo} from "@/lib/utils.ts";
import type {CommentData} from "@/features/types/AuctionDetailed.ts";
import {message} from "antd";
import {useAddAuctionCommentMutation} from "@/features/api/endpoints/Auction.ts";

const MAX_LENGTH = 200;

export default function LotComments({ comments, auctionId }: { comments: CommentData[], auctionId: number }) {
    const [inputText, setInputText] = useState("");
    const [replyToId, setReplyToId] = useState<number | null>(null);
    const [replyTo, setReplyTo] = useState<string>("");
    const [addComment, { isLoading }] = useAddAuctionCommentMutation();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleReport = (commentId: number) => {
        message.info(`Report was sent for comment ${commentId}`);
    };
    const handleReply = (commentId: number, author?: string) => {
        const prefix = `Re: ${author}:`;
        setReplyToId(commentId);
        setReplyTo(prefix);
        setInputText(prefix + " ");

        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
                // ставимо курсор в кінець префікса
                inputRef.current.setSelectionRange(prefix.length + 1, prefix.length + 1);
            }
        }, 5);
    };
    const handlePost = async (e: React.FormEvent) => {
        e.preventDefault();
        let text = inputText;
        let replyIdToSend = replyToId;

        if (replyTo && inputText.startsWith(replyTo)) {
            text = text.substring(replyTo.length);
        }
        else {
            replyIdToSend = null;
        }
        try {
            await addComment({
                auctionId: auctionId,
                replyId: replyIdToSend,
                text: text.trim()
            }).unwrap();

            setInputText("");
            setReplyToId(null);
            setReplyTo("");
            message.success("Comment added successfully!");
        } catch (err) {
            console.error("Error adding message", err);
            message.error("Error adding message");
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black dark:text-gray-200">Comments</h3>
            <section>
                {/* Інпут з іконкою всередині */}
                <div className="mb-1 relative">
                    <input
                        ref={inputRef}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        maxLength={MAX_LENGTH}
                        className="w-full rounded-sm border dark:border-zinc-100 border-zinc-800 px-3 py-2 pr-10 text-sm outline-none focus:border-zinc-600 text-black dark:text-gray-200"
                        placeholder="Leave a comment"
                    />
                    <button
                        onClick={handlePost}
                        disabled={isLoading || !inputText.trim()}
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
                                {c.authorPhoto
                                    ? <img src={c.authorPhoto} alt={c.author} className="h-6 inline rounded-full" />
                                    : <User className="h-6 w-4 inline" />}
                                <b> {c.author}</b> • {timeAgo(new Date(c.createdAt))}
                            </div>
                            <p className="text-sm leading-relaxed mb-2 text-black dark:text-gray-200">
                                <b>{c.replyTo ? `Re: ${c.replyTo} ` : ""}</b>{c.text}
                            </p>
                            <div className="flex gap-4 text-xs text-black dark:text-gray-200">
                                <button
                                    className="flex items-center gap-1 hover:underline"
                                    onClick={() => handleReply(c.id, c.author)}
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