import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownPreviewProps = {
  value?: string | string[] | null; // тепер може бути string або string[]
  placeholder?: string;
};

export function MarkdownPreview({ value, placeholder }: MarkdownPreviewProps) {
  // якщо value - масив, з'єднуємо в один рядок через новий рядок
  const content = Array.isArray(value) ? value.join("\n") : value ?? "";

  return (
    <div className="markdown-content">
      {content.trim() ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
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
                <table
                  className="min-w-full border-collapse border border-[#d0d0d0]"
                  {...props}
                >
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
              <th
                className="border border-gray-300 px-4 py-2 text-left font-semibold"
                {...props}
              >
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
              <blockquote
                className="border-l-4 border-gray-300 pl-4 italic my-4"
                {...props}
              >
                {children}
              </blockquote>
            ),
            code: ({ children, ...props }) => (
              <code
                className="bg-[#1c1c1c] px-1 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      ) : (
        <span className="text-[#d0d0d0]">{placeholder}</span>
      )}
    </div>
  );
}
