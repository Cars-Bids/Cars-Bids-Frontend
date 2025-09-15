import { useEffect, useState } from "react";
import {getTimeRemaining} from "@/lib/utils.ts";
import {Star} from "lucide-react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import type {RootState} from "@/app/store.ts";
import type {OtherAuction} from "@/features/types/AuctionDetailed.ts";

export default function LotOtherAuctions({ items }: { items: OtherAuction[]; }) {
    if (!items?.length) return null;

    return (
        <section className="sticky top-20">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Other auctions
            </h3>
            <ul className="space-y-3">
                {items.map((it) => (
                    <AuctionItem key={it.id} item={it} getTimeRemaining={getTimeRemaining} />
                ))}
            </ul>
        </section>
    );
}

function AuctionItem({ item, getTimeRemaining }: {
    item: OtherAuction;
    getTimeRemaining: (start: Date) => {
        hours: number;
        minutes: number;
        seconds: number;
    };
}) {
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining(item.endTime));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeRemaining(item.endTime));
        }, 1000);
        return () => clearInterval(timer);
    }, [item.endTime]);

    const format = (num: number) => String(num).padStart(2, "0");
    const currentLang = useSelector((state: RootState) => state.lang.current);

    return (
        <Link to={`/${currentLang.toLowerCase()}/auction/${item.id}`} className="block group">
        <li className="flex gap-1 border border-zinc-700 rounded-md aspect-[8/3] text-zinc-100">
            <div className="min-w-0 flex-1 relative">
                <img src={item.mainPhoto} alt={item.title} className="h-full w-full object-cover" />
                <Star className={`h-4 w-4 absolute top-2 left-2 ${item.isWatched ? "fill-yellow-400 stroke-yellow-400" : ""}`} />
                <span className="px-2 mx-1 text-xs text-zinc-900 bg-zinc-300 dark:bg-zinc-100 rounded-md absolute top-2 right-1">
                    Featured
                </span>
                <div className="absolute bottom-1 left-1 rounded-md text-xs text-zinc-100 bg-zinc-800 border border-zinc-100">
                    <span className="px-2 border-r border-zinc-100">{format(timeLeft.hours)}:{format(timeLeft.minutes)}:{format(timeLeft.seconds)}</span>
                    <span className="px-2">${item.currentPrice}</span>
                </div>
            </div>

            <div className="min-w-0 flex-1 flex flex-col justify-between py-1">
                <h4 className="text-s font-bold">{item.title}</h4>
                <p className="text-xs">{item.subtitle}</p>
                <div className="text-xs font-bold">
                    { item.isInspected
                        ? <span className="px-2 mx-1 text-zinc-900 bg-zinc-300 dark:bg-zinc-100 rounded-md">Inspected</span>
                        : <span className="px-2 mx-1 text-zinc-200 bg-blue-500 rounded-md">No Reserve</span>
                    }
                </div>
                <p className="text-xs">{item.location}</p>
            </div>
        </li>
        </Link>
    );
}

