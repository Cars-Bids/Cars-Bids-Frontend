import Section from "@/components/ui/Auction/Section.tsx";

export type Spec = { label: string; value: string };

export default function LotSpecs({ left, right }: { left: Spec[]; right: Spec[] }) {
  return (
    <Section>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {[left, right].map((group, idx) => (
          <div key={idx} className="overflow-hidden rounded-xl border border-zinc-800">
            <dl className="grid grid-cols-2">
              {group.map((s) => (
                <div key={s.label} className="flex items-center gap-2 border-b border-zinc-800 p-3 odd:bg-zinc-900/40">
                  <dt className="text-xs uppercase tracking-wide text-zinc-400">{s.label}</dt>
                  <dd className="col-span-1 text-sm font-medium text-zinc-100">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </Section>
  );
}
