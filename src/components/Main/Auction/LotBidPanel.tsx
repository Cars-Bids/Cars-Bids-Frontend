import type { AuctionData } from "@/features/types/AuctionDetailed";
import { User, Calendar, Star, Eye, LoaderPinwheel } from "lucide-react";

export default function LotBidPanel({ auction, title, about } : { auction: AuctionData; title: string; about: string }) {

    const fmtCurrency = (n: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
    
    /*const timeLeft = (iso: string) => {
        const end = new Date(iso).getTime();
        const diff = Math.max(0, end - Date.now());
        const days = Math.floor(diff / 86400000);
        const hrs = Math.floor((diff % 86400000) / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        return days > 0 ? `${days}d ${hrs}h` : `${hrs}h ${mins}m`;
    };*/

  return (
    <section className="dark:bg-zinc-900 border border-zinc-800 p-3 text-black dark:text-gray-200">
        <div className="flex items-center gap-7 my-2">
            <div className="text-xs font-bold tracking-wide">Current Bid</div>

            {auction.currentBidder &&
            <div className="flex items-center gap-1 text-xs">
                {auction.currentBidderPhoto
                    ? <img src={auction.currentBidderPhoto} alt={auction.currentBidder} className="h-6 inline rounded-full" />
                    : <User className="h-6 w-4 inline" />}
                {auction.currentBidder}
            </div>}
        </div>

        <div className="flex items-center justify-between gap-2 my-2">
            <div className="text-2xl font-extrabold">{fmtCurrency(auction.currentPrice)}</div>
            <button className="rounded-md bg-red-800 px-4 py-1 text-sm font-semibold text-white hover:bg-red-950">
                Place Bid
            </button>
        </div>

        <div className="grid grid-cols-2 items-center my-2">
            <div className="text-xs font-bold tracking-wide">Seller</div>
            <div className="text-xs flex items-center gap-1">
                {auction.sellerPhoto
                    ? <img src={auction.sellerPhoto} alt={auction.seller} className="h-6 inline rounded-full" />
                    : <User className="h-6 w-4 inline" />}
                {auction.seller}
            </div>
        </div>
        <div className="grid grid-cols-2 items-center my-2">
            <div className="text-xs font-bold tracking-wide">Endings</div>
            <div className="text-xs flex items-center gap-1"><Calendar className="h-6 w-4" />{new Date(auction.endTime).toLocaleString()}</div>
        </div>
        <div className="grid grid-cols-2 items-center my-2">
            <div className="text-xs font-bold tracking-wide">Bids count</div>
            <div className="text-xs flex items-center gap-1"><LoaderPinwheel className="h-5" />{auction.bidsCount}</div>
        </div>
        <div className="grid grid-cols-2 items-center my-2">
            <div className="text-xs font-bold tracking-wide">Views</div>
            <div className="text-xs flex items-center gap-1"><Eye className="h-6 w-4" />{auction.viewsCount}</div>
        </div>
        <div className="grid grid-cols-2 items-center my-2">
            <div className="text-xs font-bold tracking-wide">Watching</div>
            <div className="text-xs flex items-center gap-1"><Star className="h-6 w-4" />{auction.watchersCount}</div>
        </div>

        <h5 className="font-bold mt-5">About {title}</h5>
        <p className="text-xs my-3">{about}</p>
    </section>
  );
}
