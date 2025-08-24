import React from "react";
import { ChevronRight } from "lucide-react";

export type LotSection = { title: string; bullets?: string[]; body?: string };

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group rounded-xl border border-zinc-800 bg-zinc-900 p-4" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold">
        <span>{title}</span>
        <ChevronRight className="h-5 w-5 transition-transform group-open:rotate-90" />
      </summary>
      <div className="mt-3 text-sm text-zinc-200">{children}</div>
    </details>
  );
}

export default function LotAccordions({ sections }: { sections: LotSection[] }) {
  return (
    <div className="space-y-3">
      {sections.map((s) => (
        <Accordion key={s.title} title={s.title} defaultOpen={s.title === "Highlights"}>
          {s.bullets && (
            <ul className="list-outside list-disc space-y-2 pl-5">
              {s.bullets.map((b, i) => (<li key={i} className="leading-relaxed">{b}</li>))}
            </ul>
          )}
          {s.body && <p className="leading-relaxed">{s.body}</p>}
        </Accordion>
      ))}
    </div>
  );
}
