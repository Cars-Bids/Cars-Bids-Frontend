import React from "react";
import { ChevronRight } from "lucide-react";
import type {CarData} from "@/features/types/AuctionDetailed.ts";

export type LotSection = { title: string; bullets?: string[]; };

function Accordion({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="group border-zinc-800 p-4" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-black dark:text-gray-200">
        <span>{title}</span>
        <ChevronRight className="h-5 w-5 transition-transform group-open:rotate-90" />
      </summary>
      <div className="mt-3 text-sm text-black dark:text-gray-200">{children}</div>
    </details>
  );
}

export default function LotAccordions({ car }: { car: CarData }) {
   const sections: LotSection[] = [
       { title: "Highlights", bullets: car.highlights },
       { title: "Recent Service History", bullets: car.serviceHistory },
       { title: "Equipment", bullets: car.equipment },
       { title: "Known Flaws", bullets: car.flaws },
       { title: "Modifications", bullets: car.modifications },
       { title: "Other Items Included In Sale", bullets: car.otherItems },
       { title: "Ownership History", bullets: car.ownershipHistory },
       { title: "Seller Notes", bullets: car.sellerNotes }
   ];

  return (
    <div className="space-y-3">
      {sections.map((s) => (
        <Accordion key={s.title} title={s.title} defaultOpen={s.title === "Highlights"}>
          
        </Accordion>
      ))}
    </div>
  );
}
