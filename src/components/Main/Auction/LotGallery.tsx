"use client";
import { Image as ImgIcon, Play } from "lucide-react";
import Section from "@/components/ui/Auction/Section.tsx";

export type Photo = { id: string; src: string; alt?: string };

export default function LotGallery({ hero, photos, title }: { hero: string; photos: Photo[]; title: string }) {
  return (
    <Section>
      <div className="aspect-[16/9] w-full overflow-hidden rounded-xl">
        <img src={hero} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {photos.slice(0, 8).map((p, i) => (
          <button key={p.id} className={`relative h-16 w-24 flex-none overflow-hidden rounded-md border ${i === 0 ? "border-zinc-300" : "border-zinc-800"}`}>
            <img src={p.src} alt={p.alt || "thumbnail"} className="h-full w-full object-cover" />
          </button>
        ))}
        <button className="inline-flex h-16 items-center gap-2 rounded-md border border-zinc-800 px-3 text-xs hover:bg-zinc-900"><ImgIcon className="h-4 w-4"/>All Photos</button>
        <button className="inline-flex h-16 items-center gap-2 rounded-md border border-zinc-800 px-3 text-xs hover:bg-zinc-900"><Play className="h-4 w-4"/>Videos</button>
      </div>
    </Section>
  );
}
