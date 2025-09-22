import LotGallery from "@/components/Main/Auction/LotGallery.tsx";
import LotSpecs from "@/components/Main/Auction/LotSpecs";
import LotAccordions from "@/components/Main/Auction/LotAccordions.tsx";
import {useParams} from "react-router-dom";
import {useGetAuctionDetailedByIdQuery} from "@/features/api/endpoints/Auction.ts";
import LotHeaderApproval from "@/components/Main/Auction/LotHeaderApproval.tsx";
import LotBidPanelApproval from "@/components/Main/Auction/LotBidPanelApproval.tsx";

export default function AuctionApprovalPage() {
    const { id } = useParams<{ id: string }>();
    const { data } = useGetAuctionDetailedByIdQuery(Number(id));
    console.log("data", data);

    return (data &&
        <div className="min-h-dvh">
            <LotHeaderApproval title={data.car.title} subtitle={data.car.subtitle} />
            <main className="mx-auto max-w-7xl gap-3 px-4 py-5 lg:grid lg:grid-cols-12">
                <div className="lg:col-span-7 xl:col-span-8">

                    <LotGallery photos={data.images} title={data.car.title} />

                    <div className="mt-6">
                        <LotSpecs car={data.car} />
                    </div>

                    <div className="mt-6">
                        <LotAccordions car={data.car} />
                    </div>
                </div>

                <div className="mt-6 lg:col-span-5 lg:mt-0 xl:col-span-4">
                    <LotBidPanelApproval auction={data.auction} title={data.car.title} about={data.car.subtitle} />
                </div>
            </main>
        </div>
    );
}