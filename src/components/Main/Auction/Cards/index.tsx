import {  DollarSign } from "lucide-react";
import type { AuctionDto } from "@/features/types/Auction";
import AuctionTimer from "../../Clock";

import { Links } from "../../Links";

interface AuctionCardsProps {
  data: AuctionDto;
}
export const AuctionCards = ( { data } :AuctionCardsProps ) =>{
  return (
    <Links to={`/auction/${data.id}`} className="w-[770px] rounded-xl border border-gray-400 bg-white dark:bg-[#2C2C2C] text-white flex overflow-hidden shadow-lg">
      {/* Ліва частина (фото) */}
      <div className="relative w-96 h-64">
    
        <img
          src={data?.car?.mainImageUrl || "https://placehold.co/680x350"}
          alt="2022 Porsche 911 Turbo S Coupe"
          className="w-full h-full object-cover"
        />

<div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/10">
        {/* Верхній бейдж */}
        {/* <div className="absolute top-3 right-3 bg-neutral-200/60 text-black text-xs font-medium px-2 py-1 rounded-lg">
          Featured
        </div> */}

        {/* Нижній блок (таймер + ціна) */}
        <div className="absolute bottom-3 left-0 w-full px-3 flex justify-between">
        <AuctionTimer startTime={data?.startTime} endTime={data?.endTime} />
          <div className="flex items-center gap-2 bg-neutral-800 border border-[#8ebf0b] px-3 py-1.5 rounded-lg text-xs font-medium font-synonym">
            <DollarSign className="w-4 h-4 text-[#8ebf0b]" />
            {data?.currentPrice.toLocaleString()} 
          </div>
        </div>
        </div>
      </div>

      {/* Права частина (опис) */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-black dark:text-white text-lg font-bold font-amulya">{data?.car?.year} {data?.car?.make} {data?.car?.model}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 font-amulya">
            {data?.car?.description }
          </p>
        </div>

       
        <div className="flex gap-2 mt-2">
           {data?.isInspected ? (
          <span className="bg-white border border-gray-400  dark:border-none text-black text-xs font-bold px-2 py-0.5 rounded-lg font-synonym">
          Inspected
          </span>
      ) : null}
        </div>

        {/* Локація */}
        <div className="text-sm text-gray-400 mt-2 font-amulya">{data?.car?.location}</div>

        {/* Характеристики */}
        <div className="flex gap-2 mt-3 flex-wrap">
           <span
    
              className="px-3 py-1 bg-white dark:bg-[#2C2C2C] border border-gray-400 rounded-lg text-xs dark:text-white text-black font-synonym"
            >
              {data?.car?.transmissionType === 0 ? "Manual" : "Automatic"}
            </span>
               <span
    
              className="px-3 py-1 bg-white dark:bg-[#2C2C2C] border border-gray-400 rounded-lg text-xs dark:text-white text-black font-synonym"
            >
              {data?.car?.mileage.toLocaleString()} km
            </span>
        </div>
      </div>
    </Links>
  );
}

