import { lots } from "@/lib/mockData";
import LotHeader from "@/components/Main/Auction/LotHeader.tsx";
import LotGallery from "@/components/Main/Auction/LotGallery.tsx";
import Section from "@/components/ui/Auction/Section.tsx";
import LotSpecs from "@/components/Main/Auction/LotSpecs";
import LotAccordions from "@/components/Main/Auction/LotAccordions.tsx";
import LotQA from "@/components/Main/Auction/LotQA.tsx";
import LotComments from "@/components/Main/Auction/LotComments.tsx";
import LotBidPanel from "@/components/Main/Auction/LotBidPanel.tsx";
import LotOtherAuctions from "@/components/Main/Auction/LotOtherAuctions.tsx";
import {useParams} from "react-router-dom";

export default function AuctionPage() {
  const { id } = useParams<{ id: string }>();
  const lot = lots.find(l => l.id === id) ?? lots[0];
  console.log(id);

  return (
    <div className="min-h-dvh">
      <LotHeader title={lot.title} subtitle={lot.subtitle} />
      <main className="mx-auto max-w-7xl gap-6 px-4 py-5 lg:grid lg:grid-cols-12">
        <div className="lg:col-span-8 xl:col-span-9">
          <LotGallery hero={lot.hero} photos={lot.photos} title={lot.title} />

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
            <Section className="xl:col-span-2">
              <h3 className="mb-2 text-lg font-semibold">About this {lot.title.split(" ")[1]}</h3>
              {lot.about && <p className="text-sm leading-relaxed text-zinc-200">{lot.about}</p>}
            </Section>
            <Section>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">At a glance</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">Ends in soon</div>
                <div className="flex items-center gap-2">{lot.stats.views.toLocaleString()} views</div>
                <div className="flex items-center gap-2">{lot.stats.watchers.toLocaleString()} watching</div>
                <div className="flex items-center gap-2">{lot.stats.bids} bids</div>
              </div>
            </Section>
          </div>

          <div className="mt-6">
            <LotSpecs left={lot.specsLeft} right={lot.specsRight} />
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

        <div className="mt-6 lg:col-span-4 lg:mt-0 xl:col-span-3">
          <LotBidPanel currentBidUSD={lot.currentBidUSD} endsAtISO={lot.endsAtISO} stats={lot.stats} seller={lot.seller} highBidder={lot.highBidder} />
          <div className="mt-6 hidden lg:block">
            <LotOtherAuctions items={lot.otherAuctions} />
          </div>
        </div>
      </main>
      <footer className="mx-auto max-w-7xl px-4 py-8 text-xs text-zinc-500">© {new Date().getFullYear()} AutoBid — All rights reserved.</footer>
    </div>
  );
}
