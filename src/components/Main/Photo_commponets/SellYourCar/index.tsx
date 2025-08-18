// src/components/RecentSales.tsx
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Car {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
}

const cars: Car[] = [
  {
    id: 1,
    title: "1991 Nissan Skyline GT-R",
    description:
      "Extensively Modified for Racing, Dyno-Verified 706whp, 6-Speed Sequential Manual",
    price: "$95,000",
    image: "https://placehold.co/320x176/222/FFF?text=Skyline",
  },
  {
    id: 2,
    title: "2008 Cadillac Escalade EXT",
    description: "6.2-Liter V8, AWD, Recent Service, California-Owned",
    price: "$9,000",
    image: "https://placehold.co/320x176/333/FFF?text=Escalade",
  },
  {
    id: 3,
    title: "2022 Porsche 911 Turbo S Coupe",
    description:
      "580-hp Twin-Turbo Flat-6, Bordeaux White Interior, Unmodified, and additional info.",
    price: "$125,000",
    image: "https://placehold.co/320x176/444/FFF?text=Porsche+911",
  },
  {
    id: 4,
    title: "2022 Rivian R1T Launch Edition",
    description: "Quad-Motor AWD, Large Battery Pack, Off-Road Upgrade",
    price: "$70,000",
    image: "https://placehold.co/320x176/555/FFF?text=Rivian+R1T",
  },
  {
    id: 5,
    title: "1999 BMW Z3 M Roadster",
    description: "23,700 Miles, 5-Speed Manual, Evergreen, Unmodified",
    price: "$30,000",
    image: "https://placehold.co/320x176/666/FFF?text=BMW+Z3+M",
  },
];

export default function RecentSales() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.querySelector(".flex-shrink-0")?.clientWidth || 320; 
      scrollRef.current.scrollBy({
        left: direction === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 py-12 sm:py-16 flex flex-col items-center gap-8 mx-auto">
      <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-4 relative">
        <h4 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold">
          Our recent sales
        </h4>

       

        <div className="relative group">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth px-2 sm:px-0 snap-x snap-mandatory"
            style={{ scrollBehavior: "smooth" }}
          >
            {cars.map((car) => (
              <div
                key={car.id}
                className="flex flex-col gap-2 flex-shrink-0 w-[80%] sm:w-72 md:w-80 snap-center"
              >
                <div className="relative rounded-lg overflow-hidden w-full h-40 sm:h-44">
                  <img
                    src={car.image}
                    alt={car.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute left-1 bottom-1 bg-black/60 text-white text-xs sm:text-sm rounded-md flex overflow-hidden border border-red-600">
                    <span className="px-2 py-1">Sold for</span>
                    <span className="px-2 py-1 border-l border-white">
                      {car.price}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-white text-base sm:text-lg font-bold leading-tight">
                    {car.title}
                  </div>
                  <div className="text-white/80 text-xs sm:text-sm">
                    {car.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

        {canScrollRight && (
  <button
    onClick={() => scroll("right")}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 flex items-center justify-center"
  >
    <ChevronRight className="text-white w-6 h-6" />
  </button>
)}
{canScrollLeft && (
  <button
    onClick={() => scroll("left")}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-300 flex items-center justify-center"
  >
    <ChevronLeft className="text-white w-6 h-6" />
  </button>
)}
        </div>
      </div>
    </section>
  );
}