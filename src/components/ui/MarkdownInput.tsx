import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MarkdownPreview } from "./MarkdownPreview";

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
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
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
            "w-full rounded-md min-h-[121.5px] border-[0.5px] p-3 cursor-text prose prose-sm max-w-none",
            "prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4",
            "prose-table:border-collapse prose-table:border prose-table:border-gray-300",
            "prose-th:border prose-th:border-gray-300 prose-th:bg-gray-100 prose-th:p-2 prose-th:text-left",
            "prose-td:border prose-td:border-gray-300 prose-td:p-2",
            "prose-p:mb-2 prose-h1:text-xl prose-h2:text-lg prose-h3:text-base",
            "prose-strong:font-bold prose-em:italic",
            "dark:prose-invert dark:prose-th:bg-gray-800 dark:prose-th:border-gray-600 dark:prose-td:border-gray-600",
            previewClassName
          )}
          onClick={() => setFocused(true)}
        >
          <MarkdownPreview value={value} placeholder={placeholder} />
        </div>
      )}
    </div>
  );
}
