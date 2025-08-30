import React from "react";
import {ChevronRight, Forward} from "lucide-react";
import {timeAgo} from "@/lib/utils.ts";

export type QA = {
    id: string;
    author: string;
    question: string;
    time: Date;
    answer: string;
};

function Accordion({ title, children, actionLink, defaultOpen = false }: { title: string; children: React.ReactNode; actionLink?: React.ReactNode; defaultOpen?: boolean }) {
    return (
        <details className="group" open={defaultOpen}>
            <summary className="flex cursor-pointer list-none items-center px-4 py-3 text-base font-semibold text-black dark:text-gray-200">
                <span className="flex items-center gap-2">{title}{actionLink}</span>
                <ChevronRight className="ml-auto h-5 w-5 transition-transform group-open:rotate-90" />
            </summary>
            <div className="p-1 text-sm text-black dark:text-gray-200">{children}</div>
        </details>
    );
}

export default function LotQAAccordions({ qa }: { qa: QA[] }) {
    const mid = Math.ceil(qa.length / 2);
    const left = qa.slice(0, mid);
    const right = qa.slice(mid);

    const renderColumn = (column: QA[]) =>
        column.map((q) => (
            <div key={q.id} className="mb-4 p-3">
                <div className="text-xs text-black dark:text-gray-200 mb-1">
                    <b>{q.author}</b> • {timeAgo(q.time)}
                </div>
                <div className="mb-2"><b>Q: </b>{q.question}</div>
                {q.answer && (
                    <div className="flex items-start gap-2 p-2 text-sm text-black dark:text-gray-200">
                        <Forward className="mt-0.5 text-black dark:text-gray-200" />
                        <span><b>A: </b>{q.answer}</span>
                    </div>
                )}
            </div>
        ));

    const handleAskQuestion = (e: React.MouseEvent) => {
        e.stopPropagation();
        alert("todo!");
    };

    const askLink = (
        <button
            onClick={handleAskQuestion}
            className="text-sm text-blue-400 hover:underline"
        >
            Ask a question
        </button>
    );

    return (
        <Accordion title="Seller Q&A" defaultOpen={true} actionLink={askLink}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>{renderColumn(left)}</div>
                <div>{renderColumn(right)}</div>
            </div>
        </Accordion>
    );
}


