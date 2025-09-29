import LotHeader from "@/components/Main/Auction/LotHeader.tsx";
import LotGallery from "@/components/Main/Auction/LotGallery.tsx";
import LotSpecs from "@/components/Main/Auction/LotSpecs";
import LotAccordions from "@/components/Main/Auction/LotAccordions.tsx";
import LotQA from "@/components/Main/Auction/LotQA.tsx";
import LotComments from "@/components/Main/Auction/LotComments.tsx";
import LotBidPanel from "@/components/Main/Auction/LotBidPanel.tsx";
import LotOtherAuctions from "@/components/Main/Auction/LotOtherAuctions.tsx";
import {useParams} from "react-router-dom";
import {useGetAuctionDetailedByIdQuery} from "@/features/api/endpoints/Auction.ts";
import {AuctionSignalRProvider} from "@/features/signalr/AuctionSignalRProvider.tsx";

export default function AuctionPage() {
  const { id } = useParams<{ id: string }>();
  const {data} = useGetAuctionDetailedByIdQuery(Number(id));
  console.log("data", data);

  return (data &&
    <AuctionSignalRProvider auctionId={Number(id)}>
    <div className="min-h-dvh">
      <LotHeader title={data.car.title} subtitle={data.car.subtitle} isWatched={data.auction.isWatched} auctionId={data.auction.id} />
      <main className="mx-auto max-w-7xl gap-3 px-4 py-5 lg:grid lg:grid-cols-12">
        <div className="lg:col-span-7 xl:col-span-8">

          <LotGallery photos={data.images} title={data.car.title} />

          <div className="mt-6">
            <LotSpecs car={data.car} />
          </div>

          <div className="mt-6">
            <LotAccordions car={data.car} />
          </div>

          <div className="mt-8">
            <LotQA qa={data.qa} auction={data.auction} />
          </div>

          <div className="mt-8">
            <LotComments comments={data.comments} auctionId={data.auction.id} sellerId={data.auction.sellerId} />
          </div>
        </div>

        <div className="mt-6 lg:col-span-5 lg:mt-0 xl:col-span-4">
          <LotBidPanel auction={data.auction} title={data.car.title} about={data.car.about ?? data.car.subtitle}
                       mainPhoto={data.images ? data.images[0].imageUrl : ""}
          />
          <div className="mt-6 hidden lg:block">
            <LotOtherAuctions items={data.auctions} />
          </div>
        </div>
      </main>
    </div>
    </AuctionSignalRProvider>
  );
}
