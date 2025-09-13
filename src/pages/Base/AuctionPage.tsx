import { lots } from "@/lib/mockData";
import LotHeader from "@/components/Main/Auction/LotHeader.tsx";
import LotGallery from "@/components/Main/Auction/LotGallery.tsx";
import LotSpecs from "@/components/Main/Auction/LotSpecs";
import LotAccordions from "@/components/Main/Auction/LotAccordions.tsx";
import LotQA from "@/components/Main/Auction/LotQA.tsx";
import LotComments from "@/components/Main/Auction/LotComments.tsx";
import LotBidPanel from "@/components/Main/Auction/LotBidPanel.tsx";
import LotOtherAuctions from "@/components/Main/Auction/LotOtherAuctions.tsx";
import {useParams} from "react-router-dom";
import {useState} from "react";

export default function AuctionPage() {
  const { id } = useParams<{ id: string }>();
  const lot = lots.find(l => l.id === id) ?? lots[0];
  const [watched, setWatched] = useState(false);

  const onToggleWatch = () => {
    setWatched(prev => !prev);
    //todo - save to db
  };

  return (
    <div className="min-h-dvh">
      <LotHeader title={lot.title} subtitle={lot.subtitle} isWatched={watched} onToggleWatch={onToggleWatch} />
      <main className="mx-auto max-w-7xl gap-3 px-4 py-5 lg:grid lg:grid-cols-12">
        <div className="lg:col-span-7 xl:col-span-8">

          <LotGallery photos={lot.photos} title={lot.title} />

          <div className="mt-6">
            <LotSpecs specs={lot.specs} />
          </div>

          <div className="mt-6">
            <LotAccordions sections={lot.sections} />
          </div>

          <div className="mt-8">
            <LotQA qa={lot.qa} />
          </div>

          <div className="mt-8">
            <LotComments comments={lot.comments} />
          </div>
        </div>

        <div className="mt-6 lg:col-span-5 lg:mt-0 xl:col-span-4">
          <LotBidPanel currentBidUSD={lot.currentBidUSD} seller={lot.seller} endsAt={lot.endsAt} stats={lot.stats}
                       highBidder={lot.highBidder} title={lot.title} about={lot.about} />
          <div className="mt-6 hidden lg:block">
            <LotOtherAuctions items={lot.otherAuctions} />
          </div>
        </div>
      </main>
    </div>
  );
}
