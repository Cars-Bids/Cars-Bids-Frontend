import { useState } from "react";
import { ChevronLeft, ChevronRight, DollarSign } from "lucide-react";
import AuctionTimer from "@/components/Main/Clock";

interface CarCardProps {
  data: any[]; // масив машин
}

export const CarCard = ({ data }: CarCardProps) => {
  const [startIndex, setStartIndex] = useState(0); // індекс лівої картки
  const total = data.length;

  const prevCars = () => setStartIndex((prev) => (prev === 0 ? total - 2 : prev - 1));
  const nextCars = () => setStartIndex((prev) => (prev + 2 >= total ? 0 : prev + 1));

  // Визначаємо дві картки для відображення
  const leftCar = data[startIndex];
  const rightCar = data[startIndex + 1] || data[0]; // якщо масив менше 2, беремо першу

  const carsToShow = [leftCar, rightCar];

  return (
    <div className="flex gap-5 w-full justify-center items-start">
      {carsToShow.map((car, idx) => {
        if (!car) return null;

        const images = [car?.car?.mainImage, car?.car?.exteriorImage1, car?.car?.exteriorImage2];

        return (
          <div
            key={car.id}
            className={`w-full max-w-3xl bg-white dark:bg-neutral-900 text-white rounded-lg outline outline-1 outline-gray-400 dark:outline-white overflow-hidden grid ${
              idx === 1 ? "grid-cols-[1.2fr_2fr_2fr]" : "grid-cols-[2fr_2fr_1.2fr]"
            }`}
          >
            {/* Main car block */}
            <div className={`col-span-2 relative ${idx === 1 ? "order-1" : "order-0"}`}>
              <img src={images[0]} alt="img" className="h-[300px] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/10 p-4 flex flex-col justify-between">
                <div className={`${idx === 1 ? "text-right" : "text-left"}`}>
                  <h2 className="text-lg font-bold font-amulya">
                    {car?.car?.year} {car?.car?.makeName} {car?.car?.modelName}
                  </h2>
                  <p className="text-xs font-synonym">
                    {car?.car?.exteriorColor}, {car?.car?.engine}
                  </p>
                  <p className="text-xs font-synonym">
                    {car?.car?.interiorColor}, {car?.car?.location}
                  </p>
                </div>

                <div className="flex items-center justify-between w-full">
                  {/* Стрілки каруселі машин */}
                  {idx === 0 && (
                    <div className="bg-neutral-800 flex text-[14px] rounded-md overflow-hidden font-synonym outline outline-1 outline-white">
                      <button className="px-1 py-1 hover:bg-black/80 transition border-r border-white" onClick={prevCars}>
                        <ChevronLeft size={20} />
                      </button>
                      <button className="px-1 py-1 hover:bg-black/80 transition" onClick={nextCars}>
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
<div className="flex gap-3">
                  <div className="flex items-center gap-2 bg-neutral-800 border border-[#8ebf0b] px-3 py-1.5 rounded-lg text-xs font-medium font-synonym">
                    <DollarSign className="w-4 h-4 text-[#8ebf0b]" />
                    {car?.currentPrice}
                  </div>

                  <AuctionTimer startTime={car?.startTime} endTime={car?.endTime} className="rounded-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* Side images */}
            <div className="flex flex-col">
              <div
                className={`self-stretch p-4 inline-flex flex-col justify-center items-center border-white border ${
                  idx === 1 ? "border-r-2" : "border-l-2"
                }`}
              >
                <div className="justify-start text-black dark:text-white text-lg font-bold font-amulya leading-tight">
                  Newly Added
                </div>
              </div>

              <div className={`${idx === 1 ? "border-r-2" : "border-l-2"} border border-white overflow-hidden relative`}>
                <img src={car?.car?.exteriorImage2} alt="featured" className="w-[210px] h-30 object-cover" />
              </div>
              <div className={`${idx === 1 ? "border-r-2" : "border-l-2"} border border-white overflow-hidden relative`}>
                <img src={car?.car?.exteriorImage1} alt="featured" className="w-[210px] h-30 object-cover" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CarCard;
