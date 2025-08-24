import Section from "@/components/ui/Auction/Section.tsx";

export default function LotOtherAuctions({ items }: { items: Array<{ id: string; title: string; price?: string; thumb: string; meta?: string }> }) {
  if (!items?.length) return null;
  return (
    <Section className="sticky top-20">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">Other auctions</h3>
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it.id} className="flex gap-3">
            <img src={it.thumb} alt={it.title} className="h-16 w-24 flex-none rounded-md object-cover" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium text-zinc-100">{it.title}</div>
              {it.meta && <div className="truncate text-xs text-zinc-400">{it.meta}</div>}
              {it.price && <div className="text-sm font-semibold">{it.price}</div>}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
