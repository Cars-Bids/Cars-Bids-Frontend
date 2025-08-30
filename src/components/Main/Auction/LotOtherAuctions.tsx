export default function LotOtherAuctions({ items }: { items:
    Array<{ id: string; title: string; subtitle?: string; price: number; thumb: string; meta?: string }> }) {

    if (!items?.length) return null;

    return (
        <section className="sticky top-20">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">Other auctions</h3>
          <ul className="space-y-3">
            {items.map((it) => (
              <li key={it.id} className="flex gap-1 border border-zinc-700 rounded-md aspect-[8/3] text-zinc-100">
                  <div className="min-w-0 flex-1">
                      <img src={it.thumb} alt={it.title} className="h-full w-full object-cover" />
                  </div>

                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold my-1">{it.title}</h4>
                    <p className="text-xs my-1">{it.subtitle}</p>
                    <span className="px-2 mx-1 text-xs text-zinc-900 bg-zinc-300 dark:bg-zinc-100 rounded-md font-bold">Inspected</span>
                    <span className="px-2 mx-1 text-xs text-zinc-200 bg-blue-500 rounded-md font-bold">No Reserve</span>
                  {it.meta && <div className="truncate text-xs text-zinc-400">{it.meta}</div>}
                  {it.price && <div className="text-sm font-semibold">{it.price}</div>}
                </div>
              </li>
            ))}
          </ul>
        </section>
    );
}
