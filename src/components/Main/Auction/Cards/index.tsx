import { Clock, DollarSign } from "lucide-react";

interface AuctionCards{
    Labels: Array<string>;
    
}

export const AuctionCards = () =>{
  return (
    <div className="w-[770px] rounded-xl border border-gray-400 bg-white dark:bg-[#2C2C2C] text-white flex overflow-hidden shadow-lg">
      {/* Ліва частина (фото) */}
      <div className="relative w-96 h-64">
    
        <img
          src="https://placehold.co/210x140"
          alt="2022 Porsche 911 Turbo S Coupe"
          className="w-full h-full object-cover"
        />

<div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/10">
        {/* Верхній бейдж */}
        <div className="absolute top-3 right-3 bg-neutral-200/60 text-black text-xs font-medium px-2 py-1 rounded-lg">
          Featured
        </div>

        {/* Нижній блок (таймер + ціна) */}
        <div className="absolute bottom-3 left-0 w-full px-3 flex justify-between">
          <div className="flex items-center gap-2 bg-red-600/80 px-3 py-1.5 rounded-lg text-xs font-medium font-synonym">
            <Clock className="w-4 h-4" />
            03:48:12
          </div>
          <div className="flex items-center gap-2 bg-green-600/80 px-3 py-1.5 rounded-lg text-xs font-medium font-synonym">
            <DollarSign className="w-4 h-4" />
            115,000
          </div>
        </div>
        </div>
      </div>

      {/* Права частина (опис) */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-black dark:text-white text-lg font-bold font-amulya">2022 Porsche 911 Turbo S Coupe</h3>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-1 font-amulya">
            580-hp Twin-Turbo Flat-6, Bordeaux White Interior, Unmodified, and
            additional info.
          </p>
        </div>

        {/* Теги */}
        <div className="flex gap-2 mt-2">
          <span className="bg-white border border-gray-400  dark:border-none text-black text-xs font-bold px-2 py-0.5 rounded-lg font-synonym">
            Inspected
          </span>
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-lg font-synonym">
            No Reserve
          </span>
        </div>

        {/* Локація */}
        <div className="text-sm text-gray-400 mt-2 font-amulya">Duxbury, MA 02332</div>

        {/* Характеристики */}
        <div className="flex gap-2 mt-3 flex-wrap">
          {["Gasoline", "Automatic", "30 000 km"].map((item) => (
            <span
              key={item}
              className="px-3 py-1 bg-white dark:bg-[#2C2C2C] border border-gray-400 rounded-lg text-xs dark:text-white text-black font-synonym"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

