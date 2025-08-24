import Section from "@/components/ui/Auction/Section.tsx";

export type Comment = { id: string; author: string; text: string; time: string };

export default function LotComments({ comments }: { comments: Comment[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Comments</h3>
      <Section>
        <div className="mb-3 flex items-center gap-2">
          <input className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-zinc-600" placeholder="Leave a comment" />
          <button className="rounded-lg border border-zinc-800 px-3 py-2 text-sm hover:bg-zinc-900">Post</button>
        </div>
        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="rounded-lg border border-zinc-800 bg-zinc-900 p-3">
              <div className="mb-1 text-xs text-zinc-400">{c.author} • {c.time}</div>
              <p className="text-sm leading-relaxed">{c.text}</p>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
