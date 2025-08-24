import Section from "@/components/ui/Auction/Section.tsx";

export type QA = { id: string; author: string; isSeller?: boolean; text: string; time: string };

export default function LotQA({ qa }: { qa: QA[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Seller Q&amp;A</h3>
      <Section>
        <ul className="space-y-4">
          {qa.map((q) => (
            <li key={q.id} className="rounded-lg border border-zinc-800 bg-zinc-900 p-3">
              <div className="mb-1 text-xs text-zinc-400">{q.author}{q.isSeller ? " (Seller)" : ""} • {q.time}</div>
              <p className="text-sm leading-relaxed">{q.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center gap-2">
          <input className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-zinc-600" placeholder="Ask a question" />
          <button className="rounded-lg border border-zinc-800 px-3 py-2 text-sm hover:bg-zinc-900">Submit</button>
        </div>
      </Section>
    </div>
  );
}
