"use client";
import {Hammer, Clock, AlertCircle} from "lucide-react";
import Section from "@/components/ui/Auction/Section.tsx";
import Pill from "@/components/ui/Auction/Pill.tsx";

export default function LotBidPanel({ currentBidUSD, endsAtISO, stats, seller, highBidder } : { currentBidUSD: number; endsAtISO: string; stats: { bids: number; views: number; watchers: number }; seller: string; highBidder?: string; }) {
  const fmtCurrency = (n: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
  const timeLeft = (iso: string) => {
    const end = new Date(iso).getTime();
    const diff = Math.max(0, end - Date.now());
    const days = Math.floor(diff / 86400000);
    const hrs = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    return days > 0 ? `${days}d ${hrs}h` : `${hrs}h ${mins}m`;
  };
  return (
    <Section>
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-xs uppercase tracking-wide text-zinc-400">Current Bid</div>
          <div className="text-3xl font-extrabold">{fmtCurrency(currentBidUSD)}</div>
          {highBidder && <div className="text-xs text-zinc-400">@{highBidder}</div>}
        </div>
        <Pill><Clock className="h-4 w-4"/> {timeLeft(endsAtISO)}</Pill>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-2"><div className="font-semibold">{stats.bids}</div><div className="text-zinc-400">Bids</div></div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-2"><div className="font-semibold">{stats.views.toLocaleString()}</div><div className="text-zinc-400">Views</div></div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-2"><div className="font-semibold">{stats.watchers.toLocaleString()}</div><div className="text-zinc-400">Watching</div></div>
      </div>
      <button className="mt-4 w-full rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"><Hammer className="mr-2 inline h-4 w-4"/>Place Bid</button>
      <div className="mt-3 text-xs text-zinc-400">Seller: <span className="font-medium text-zinc-200">{seller}</span></div>
      <div className="mt-2 flex items-start gap-2 rounded-lg border border-amber-900/60 bg-amber-950/40 p-2 text-xs text-amber-200">
        <AlertCircle className="mt-0.5 h-4 w-4"/> Remember to review the listing and ask questions before bidding.
      </div>
    </Section>
  );
}
