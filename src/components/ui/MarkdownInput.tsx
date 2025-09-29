import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import remarkGfm from "remark-gfm";

type MarkdownInputProps = {
    value: string;
    onChange: (val: string) => void;
    textareaClassName?: string;
    previewClassName?: string;
    placeholder?: string;
};

export function MarkdownInput({
                                  value,
                                  onChange,
                                  textareaClassName,
                                  previewClassName,
                                  placeholder,
                              }: MarkdownInputProps) {
    const [focused, setFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const resize = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    };

    useEffect(() => {
        resize();
    }, [value, focused]);

    return (
        <div className={cn("w-full")}>
            {focused ? (
                <textarea
                    ref={textareaRef}
                    className={cn(
                        "w-full rounded-md p-3 h-min-[121.5px] focus:outline-none focus:ring-2 border-0 focus:ring-red-500 resize-none overflow-hidden placeholder:text-[#d0d0d0]",
                        textareaClassName
                    )}
                    rows={4}
                    value={value}
                    onChange={(e) => {
                        onChange(e.target.value);
                        resize();
                    }}
                    onBlur={() => setFocused(false)}
                    autoFocus
                    placeholder={placeholder}
                />
            ) : (
                <div
                    className={cn(
                        "w-full rounded-md min-h-[121.5px] border-[0.5px] p-3  cursor-text prose prose-sm max-w-none",
                        // Custom markdown styles
                        "prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4",
                        "prose-table:border-collapse prose-table:border prose-table:border-gray-300",
                        "prose-th:border prose-th:border-gray-300 prose-th:bg-gray-100 prose-th:p-2 prose-th:text-left",
                        "prose-td:border prose-td:border-gray-300 prose-td:p-2",
                        "prose-p:mb-2 prose-h1:text-xl prose-h2:text-lg prose-h3:text-base",
                        "prose-strong:font-bold prose-em:italic",
                        // Dark mode styles for your theme
                        "dark:prose-invert dark:prose-th:bg-gray-800 dark:prose-th:border-gray-600 dark:prose-td:border-gray-600",
                        previewClassName
                    )}
                    onClick={() => setFocused(true)}
                >
                    {value.trim() ? (
                        <div className="markdown-content">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    // Custom components for better styling
                                    ul: ({ children, ...props }) => (
                                        <ul className="list-disc ml-6 mb-4 space-y-1" {...props}>
                                            {children}
                                        </ul>
                                    ),
                                    ol: ({ children, ...props }) => (
                                        <ol className="list-decimal ml-6 mb-4 space-y-1" {...props}>
                                            {children}
                                        </ol>
                                    ),
                                    li: ({ children, ...props }) => (
                                        <li className="mb-1" {...props}>
                                            {children}
                                        </li>
                                    ),
                                    table: ({ children, ...props }) => (
                                        <div className="overflow-x-auto mb-4">
                                            <table className="min-w-full border-collapse border border-[#d0d0d0]" {...props}>
                                                {children}
                                            </table>
                                        </div>
                                    ),
                                    thead: ({ children, ...props }) => (
                                        <thead className="bg-[#1c1c1c]" {...props}>
                                        {children}
                                        </thead>
                                    ),
                                    th: ({ children, ...props }) => (
                                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold" {...props}>
                                            {children}
                                        </th>
                                    ),
                                    td: ({ children, ...props }) => (
                                        <td className="border border-gray-300 px-4 py-2" {...props}>
                                            {children}
                                        </td>
                                    ),
                                    p: ({ children, ...props }) => (
                                        <p className="mb-3" {...props}>
                                            {children}
                                        </p>
                                    ),
                                    h1: ({ children, ...props }) => (
                                        <h1 className="text-2xl font-bold mb-4 mt-6" {...props}>
                                            {children}
                                        </h1>
                                    ),
                                    h2: ({ children, ...props }) => (
                                        <h2 className="text-xl font-bold mb-3 mt-5" {...props}>
                                            {children}
                                        </h2>
                                    ),
                                    h3: ({ children, ...props }) => (
                                        <h3 className="text-lg font-bold mb-2 mt-4" {...props}>
                                            {children}
                                        </h3>
                                    ),
                                    blockquote: ({ children, ...props }) => (
                                        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props}>
                                            {children}
                                        </blockquote>
                                    ),
                                    code: ({ children, ...props }) => {
                                        return (
                                            <code className="bg-[#1c1c1c] px-1 py-0.5 rounded text-sm font-mono" {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                }}
                            >
                                {value}
                            </ReactMarkdown>
                        </div>
                    ) : (
                        <span className="text-[#d0d0d0]">{placeholder}</span>
                    )}
                </div>
            )}
        </div>
    );
}