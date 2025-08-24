"use client";
import { Heart, Share2 } from "lucide-react";

export default function LotHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-900/80 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <h1 className="truncate text-lg font-bold sm:text-xl">{title}</h1>
          {subtitle && <p className="truncate text-xs text-zinc-400">{subtitle}</p>}
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button className="rounded-full border border-zinc-800 px-3 py-1 text-sm hover:bg-zinc-900"><Heart className="mr-1 inline h-4 w-4"/>Watch</button>
          <button className="rounded-full border border-zinc-800 px-3 py-1 text-sm hover:bg-zinc-900"><Share2 className="mr-1 inline h-4 w-4"/>Share</button>
        </div>
      </div>
    </header>
  );
}
