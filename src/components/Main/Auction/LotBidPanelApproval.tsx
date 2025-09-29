import type { AuctionData } from "@/features/types/AuctionDetailed";
import {User, Calendar} from "lucide-react";
import { message } from "antd";
import {useUpdateAuctionStatusMutation} from "@/features/api/endpoints/Auction.ts";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import type {RootState} from "@/app/store.ts";

export default function LotBidPanelApproval({ auction, title, about } :
                                    { auction: AuctionData; title: string; about: string; }) {

    const fmtCurrency = (n: number) => new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
    const [updateStatus] = useUpdateAuctionStatusMutation();
    const currentLang = useSelector((state: RootState) => state.lang.current);
    const navigate = useNavigate();

    const handleApprove = async () => {
        //auction must be in Approved status now
        if (auction.status == "New") {
            message.error("Auction is not approved by manager yet");
            return;
        }
        if (auction.status != "Approved") {
            message.error(`Auction is already in status ${auction.status}`);
            return;
        }
        try {
            await updateStatus({
                id: auction.id,
                status: "Pending",
            }).unwrap();
            message.success("Auction approved successfully!");
            setTimeout(() => {
                navigate(`/${currentLang.toLowerCase()}/seller-dashboard`);
            }, 1500);
        } catch (err) {
            console.error("Error auction approval", err);
            message.error("Error auction approval");
        }
    };

    const handleDecline = async () => {
        //auction must be in Approved status now
        if (auction.status != "Approved") {
            message.error(`Auction is already in status ${auction.status}`);
            return;
        }
        try {
            await updateStatus({
                id: auction.id,
                status: "New",
            }).unwrap();
            message.success("Auction declined successfully!");
            setTimeout(() => {
                navigate(`/${currentLang.toLowerCase()}/seller-dashboard`);
            }, 1500);
        } catch (err) {
            console.error("Error decline auction", err);
            message.error("Error decline auction");
        }
    };

    return (
        <section className="dark:bg-zinc-900 border border-zinc-800 p-3 text-black dark:text-gray-200">
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

            <div className="text-xs font-bold tracking-wide">Start price</div>
            <div className="text-2xl font-extrabold">{fmtCurrency(auction.currentPrice)}</div>

            <h5 className="font-bold mt-5">About {title}</h5>
            <p className="text-xs my-3">{about}</p>

            {auction.isSeller ?
                (<div className="flex items-center justify-center gap-5 mt-15">
                    <button onClick={handleDecline}
                            className="rounded-md bg-red-700 px-4 py-1 text-sm font-semibold text-white hover:bg-red-800 cursor-pointer">
                        Decline
                    </button>

                    <button onClick={handleApprove}
                            className="rounded-md bg-blue-500 px-4 py-1 text-sm font-semibold text-white hover:bg-blue-800 cursor-pointer">
                        Approve
                    </button>
                </div>)
                :
                (<div className="text-xl text-red-700 text-center font-bold">You don't have access to manage this auction</div>)
            }
        </section>
    );
}