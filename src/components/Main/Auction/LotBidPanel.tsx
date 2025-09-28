import type { AuctionData } from "@/features/types/AuctionDetailed";
import {User, Calendar, Star, LoaderPinwheel, X} from "lucide-react";
import {useEffect, useState} from "react";
import { message } from "antd";
import {useAuctionSignalR} from "@/features/signalr/AuctionSignalRProvider.tsx";
import {Dialog, DialogClose, DialogContent, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {getTimeRemaining} from "@/lib/utils.ts";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import type {RootState} from "@/app/store.ts";

export default function LotBidPanel({ auction, title, about, mainPhoto } :
                                    { auction: AuctionData; title: string; about: string; mainPhoto: string }) {

    const fmtCurrency = (n: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
    const bidStep = 250;
    const { connection } = useAuctionSignalR();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bidAmount, setBidAmount] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining(auction.endTime ?? new Date()));

    const format = (num: number) => String(num).padStart(2, "0");
    const currentLang = useSelector((state: RootState) => state.lang.current);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeRemaining(auction.endTime ?? new Date()));
        }, 1000);
        return () => clearInterval(timer);
    }, [auction.endTime]);

    const handleConfirm = async () => {
        const bid = Number(bidAmount);

        if (!bid) {
            message.error("Please enter a bid amount");
            return;
        }

        if (bid < auction.currentPrice + bidStep) {
            message.error(`Bid must be higher than current price on $${bidStep}`);
            return;
        }

        if (!connection) {
            message.error("Not connected to auction hub");
            return;
        }

        try {
            await connection.invoke("PlaceBid", auction.id, bid);
            setIsModalOpen(false);
            setBidAmount(null);
        } catch (err) {
            console.error("Bid error:", err);
            message.error("Failed to place bid");
        }
    };

    return (
        <>
        <section className="dark:bg-zinc-900 border border-zinc-800 p-3 text-black dark:text-gray-200">
            <div className="flex items-center gap-7 my-2">
                <div className="text-xs font-bold tracking-wide">
                    {auction.status == "Sold" ? "Winner" : "Current Bid"}
                </div>

                {auction.currentBidder &&
                <div className="flex items-center gap-1 text-xs">
                    {auction.currentBidderPhoto
                        ? <img src={auction.currentBidderPhoto} alt={auction.currentBidder} className="h-6 inline rounded-full" />
                        : <User className="h-6 w-4 inline" />}
                    <Link to={`/${currentLang.toLowerCase()}/profile/${auction.currentBidderId}`} className="block">
                        {auction.currentBidder}
                    </Link>
                </div>}
            </div>

            <div className="flex items-center justify-between gap-2 my-2">
                <div className="text-2xl font-extrabold">{fmtCurrency(auction.currentPrice)}</div>
                { auction.status == "Active"
                    ?
                <button onClick={() => setIsModalOpen(true)} disabled={auction.isSeller}
                    className="rounded-md bg-red-800 px-4 py-1 text-sm font-semibold text-white hover:bg-red-950 cursor-pointer">
                        Place Bid
                </button>
                    :
                <div className="bg-yellow-500 px-4 py-1 text-sm font-semibold text-black">
                    {auction.status}
                </div>
                }
            </div>

            <div className="grid grid-cols-2 items-center my-2">
                <div className="text-xs font-bold tracking-wide">Seller</div>
                <div className="text-xs flex items-center gap-1">
                    {auction.sellerPhoto
                        ? <img src={auction.sellerPhoto} alt={auction.seller} className="h-6 inline rounded-full" />
                        : <User className="h-6 w-4 inline" />}
                    <Link to={`/${currentLang.toLowerCase()}/profile/${auction.sellerId}`} className="block">
                        {auction.seller}
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-2 items-center my-2">
                <div className="text-xs font-bold tracking-wide">Starting</div>
                <div className="text-xs flex items-center gap-1">
                    <Calendar className="h-6 w-4" />
                    {auction.startTime ? new Date(auction.startTime).toLocaleString() : " - "}
                </div>
            </div>

            <div className="grid grid-cols-2 items-center my-2">
                <div className="text-xs font-bold tracking-wide">Ending</div>
                <div className="text-xs flex items-center gap-1">
                    <Calendar className="h-6 w-4" />
                    {auction.endTime ? new Date(auction.endTime).toLocaleString() : " - "}
                </div>
            </div>

            <div className="grid grid-cols-2 items-center my-2">
                <div className="text-xs font-bold tracking-wide">Bids count</div>
                <div className="text-xs flex items-center gap-1"><LoaderPinwheel className="h-5" />{auction.bidsCount}</div>
            </div>

            {/*<div className="grid grid-cols-2 items-center my-2">*/}
            {/*    <div className="text-xs font-bold tracking-wide">Views</div>*/}
            {/*    <div className="text-xs flex items-center gap-1"><Eye className="h-6 w-4" />{auction.viewsCount}</div>*/}
            {/*</div>*/}

            <div className="grid grid-cols-2 items-center my-2">
                <div className="text-xs font-bold tracking-wide">Watching</div>
                <div className="text-xs flex items-center gap-1"><Star className="h-6 w-4" />{auction.watchersCount}</div>
            </div>

            <h5 className="font-bold mt-5">About {title}</h5>
            <p className="text-xs my-3">{about}</p>
        </section>

        <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
            <DialogContent
                className="bg-white dark:bg-neutral-900 text-black dark:text-white max-w-sm p-6 rounded-xl border-2 border-red-600 shadow-xl"
                showCloseButton={false}
            >
                <DialogTitle className={"hidden"}>Place Your Bid</DialogTitle>

                <div className="flex justify-between items-center">
                    <div />
                    <DialogClose asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-black hover:bg-black/5 dark:text-gray-400 hover:text-black dark:hover:text-white rounded-full transition-all duration-200 backdrop-blur-sm dark:hover:bg-white/5"
                            aria-label="Close"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </DialogClose>
                </div>

                <div className="flex flex-col gap-6 items-center text-xl">
                    <svg
                        width="58"
                        height="39"
                        viewBox="0 0 58 39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M57.9685 39H48.5024L34.414 22.7287H12.8857V16.1754H45.0199C45.9697 16.1115 46.8561 15.8877 47.5843 15.568C48.3441 15.2803 49.0723 14.8328 49.6738 14.2574C49.7688 14.1934 49.8321 14.0975 49.8954 14.0016C50.4336 13.4582 50.8135 12.8508 51.0352 12.2115C51.3834 11.2525 51.5417 10.4213 51.5417 9.52623V8.53525C51.5417 7.9918 51.3834 7.6082 51.3201 7.51229C51.2251 7.22459 51.0352 6.96885 50.8135 6.84098C50.6236 6.68115 50.3387 6.55328 50.117 6.55328H49.8638C49.8638 6.55328 49.6738 6.52131 49.5788 6.52131H25.7711V0H49.5788C51.1618 0 52.4598 0.287705 53.5046 0.831147C54.6443 1.43852 55.4675 2.1418 56.1323 2.97295C56.7971 3.86803 57.272 4.79508 57.5253 5.72213C57.8419 6.68115 57.9685 7.6082 57.9685 8.50328V9.52623C57.9685 11.0287 57.7786 12.4033 57.4303 13.65L57.367 13.8738C56.9238 15.2484 56.4172 16.3352 55.7841 17.2303C54.9609 18.3172 54.2327 19.0844 53.4413 19.7238C52.5865 20.3631 51.6683 20.9705 50.6553 21.45C49.5788 21.9295 48.6607 22.2172 47.7109 22.377C46.8245 22.6008 45.9064 22.7287 44.9882 22.7287H44.0701L58.0002 39H57.9685Z"
                            fill="#EC2729"
                        />
                        <path
                            d="M36.0599 32.4787V39H9.75105C8.76962 39 7.72486 38.8082 6.55347 38.4566C5.44539 38.1369 4.36898 37.5615 3.4192 36.7943C2.43776 35.9951 1.61462 34.9721 0.981437 33.7254C0.316593 32.4787 0 30.9443 0 29.1221V8.50328C0 7.57623 0.158296 6.64918 0.474889 5.72213C0.728163 4.79508 1.20305 3.86803 1.8679 2.97295C2.53274 2.1418 3.35588 1.43852 4.49562 0.831147C5.50871 0.287705 6.8384 0 8.38971 0H19.3122V6.52131H8.10477C8.10477 6.52131 7.94648 6.55328 7.88316 6.55328C7.62988 6.55328 7.34495 6.68115 7.18665 6.80902C6.93338 6.96885 6.77508 7.19262 6.68011 7.44836C6.52181 7.73607 6.42683 8.15164 6.42683 8.53525V29.1221C6.45849 30.177 6.74342 31.0082 7.31329 31.5836C7.88316 32.191 8.73796 32.4787 9.78271 32.4787H36.0599Z"
                            fill="#DEDEDE"
                            className="dark:fill-[#DEDEDE] fill-black"
                        />
                    </svg>

                    <img src={mainPhoto} alt={title} className="h-30" />

                    <h2 className="text-xl font-semibold">{title}</h2>

                    <p className="text-xs font-semibold">
                        Last Bid<span className="text-xs font-normal ml-1 mr-4 text-red-600">${auction.currentPrice}</span>
                        Time left<span className="text-xs font-normal ml-1 text-red-600">{format(timeLeft.hours)}:{format(timeLeft.minutes)}:{format(timeLeft.seconds)}</span>
                    </p>
                    <hr className="w-full"/>

                    <input
                        value={bidAmount ?? ""}
                        onChange={(e) => setBidAmount(e.target.value)}
                        placeholder={`Bid ${auction.currentPrice + bidStep} or more`}
                        className="border dark:border-zinc-100 border-zinc-800 p-1 text-sm outline-none
                        focus:border-zinc-600 rounded-md w-full bg-zinc-700"
                    />
                    <button onClick={handleConfirm}
                            className="rounded-md bg-red-800 px-4 py-1 text-sm font-semibold text-white hover:bg-red-950 cursor-pointer">
                        Make a bid
                    </button>

                    <p className="text-xs">
                        Minimum bid increment is ${bidStep}. All bids in USD
                    </p>
                </div>
            </DialogContent>
        </Dialog>
        </>
      );
}
