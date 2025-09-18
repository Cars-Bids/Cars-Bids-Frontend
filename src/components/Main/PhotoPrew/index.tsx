import { ChevronLeft, ChevronRight } from "lucide-react";
interface CarCardProps {
  title: string;
  description: string;
  subtitle: string;
  lable: string;
  image: string;
  featured: string[];
  price: string;
  startTime: string;
  endTime: string;
  variant?: "default" | "mirror";
}

export const CarCard = ({
  title,
  description,
  subtitle,
  image,
  featured,
  price,
  lable,
  variant = "default",
}: CarCardProps) => {
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
        <img src={image} alt={title} className="h-full  object-cover" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/10 p-4 flex flex-col justify-between">
          {/* Top info */}

          <div className={`${variant== "mirror" ? "text-right" : "text-left"} `}>
            <h2 className="text-lg font-bold font-amulya">{title} </h2>
            <p className="text-xs  font-synonym">{subtitle}</p>
            <p className="text-xs  font-synonym">{description}</p>
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
                <div className="bg-neutral-800 flex text-[14px] rounded-md overflow-hidden font-synonym outline outline-1 outline-white">
                  <div className="px-2 py-1">{time}</div>
                  <div className="px-2 py-1 border-l border-white">{price}</div>
                </div>
              </>
            ) : (
              <>
                <div className="bg-neutral-800 flex text-[14px] rounded-md overflow-hidden font-synonym outline outline-1 outline-white">
                  <div className="px-2 py-1">{time}</div>
                  <div className="px-2 py-1 border-l border-white">{price}</div>
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
            {lable}
          </div>
        </div>

        {featured.map((f, i) => (
          <div
            key={i}
            className={`${variant=="mirror" ? " border-r-2" : "border-l-2"}  border border-white overflow-hidden relative`}
          >
            <img
              src={f}
              alt="featured"
              className="w-[210px] h-31 object-cover "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarCard;
