import {ChevronLeft, ChevronRight, DollarSign} from "lucide-react";
import AuctionTimer from "@/components/Main/Clock";

interface CarCardProps {
    data: any;
    variant?: "default" | "mirror";
}

export const CarCard = ({ data, variant = "default" }: CarCardProps) => {


    return (
    <div
      className={`w-full h-75 max-w-3xl bg-white dark:bg-neutral-900 text-white rounded-lg outline outline-1 outline-gray-400 dark:outline-white overflow-hidden grid  ${
        variant === "mirror"
          ? "grid-cols-[1.2fr_2fr_2fr]"
          : "grid-cols-[2fr_2fr_1.2fr]"
      }`}
    >
      {/* Main car block */}
      <div
        className={`col-span-2 relative ${
          variant == "mirror" ? "order-1" : "order-0"
        }`}
      >
        <img src={data?.car?.mainImage} alt="img" className="h-[300px] w-full object-cover" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/10 p-4 flex flex-col justify-between">
          {/* Top info */}

          <div className={`${variant== "mirror" ? "text-right" : "text-left"} `}>
            <h2 className="text-lg font-bold font-amulya">{data?.car?.year} {data?.car?.makeName} {data?.car?.modelName} </h2>
            <p className="text-xs  font-synonym">{data?.car?.exteriorColor}, {data?.car?.engine}</p>
            <p className="text-xs  font-synonym">{data?.car?.interiorColor}, {data?.car?.location}</p>
          </div>

          {/* Bottom bar */}
          <div className="flex items-center justify-between w-full">
            {variant == "mirror" ? (
              <>
                <div className="bg-neutral-800 flex text-[14px] rounded-md overflow-hidden font-synonym outline outline-1 outline-white ">
                  <button className="px-1 py-1 hover:bg-black/80 transition border-r border-white">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="px-1 py-1 hover:bg-black/80 transition">
                    <ChevronRight size={20} />
                  </button>
                </div>
                <div className=" flex text-[14px] rounded-md overflow-hidden font-synonym  gap-4">
                    <div className="flex items-center gap-2 bg-neutral-800 border border-[#8ebf0b] px-3 py-1.5 rounded-lg text-xs font-medium font-synonym">
                        <DollarSign className="w-4 h-4 text-[#8ebf0b]" />
                        {data?.currentPrice}
                    </div>
                    <AuctionTimer startTime={data?.startTime} endTime={data?.endTime} className='rounded-lg'/>
                </div>
              </>
            ) : (
              <>
                <div className=" flex text-[14px] rounded-md overflow-hidden font-synonym  gap-4">
                    <AuctionTimer startTime={data?.startTime} endTime={data?.endTime} className='rounded-lg'/>
                    <div className="flex items-center gap-2 bg-neutral-800 border border-[#8ebf0b] px-3 py-1.5 rounded-lg text-xs font-medium font-synonym">
                        <DollarSign className="w-4 h-4 text-[#8ebf0b]" />
                        {data?.currentPrice}
                    </div>

                </div>

                <div className="bg-neutral-800 flex text-[14px] rounded-md overflow-hidden font-synonym outline outline-1 outline-white ">
                  <button className="px-1 py-1 hover:bg-black/80 transition border-r border-white">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="px-1 py-1 hover:bg-black/80 transition">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

   
      <div className="flex flex-col ">
        <div className={`self-stretch self-stretch p-4 inline-flex flex-col justify-center items-center border-white border ${variant=="mirror" ? " border-r-2" : "border-l-2"}`}>
          <div className="justify-start text-black dark:text-white text-lg font-bold font-amulya leading-tight ">
              Newly Added
          </div>
        </div>


          <div
            className={`${variant=="mirror" ? " border-r-2" : "border-l-2"}  border border-white overflow-hidden relative`}
          >
            <img
              src={data?.car?.exteriorImage2}
              alt="featured"
              className="w-[210px] h-31 object-cover "
            />
          </div>
          <div
              className={`${variant=="mirror" ? " border-r-2" : "border-l-2"}  border border-white overflow-hidden relative`}
          >
              <img
                  src={data?.car?.exteriorImage1}
                  alt="featured"
                  className="w-[210px] h-31 object-cover "
              />
          </div>

      </div>
    </div>
  );
};

export default CarCard;
