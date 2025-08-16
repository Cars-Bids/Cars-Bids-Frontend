import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Car {
  title: string;
  subtitle: string;
  price: string;
  time: string;
  images: string[];
}

const testCars: Car[] = [
  {
    title: "2013 Porsche Panamera S",
    subtitle: "2 Owners, V8 Power, Yachting Blue Metallic",
    price: "$135,000",
    time: "03:48:12",
    images: [
      "https://picsum.photos/id/1011/800/500",
      "https://picsum.photos/id/1012/400/250",
      "https://picsum.photos/id/1013/400/250",
    ],
  },
  {
    title: "1964 Ford Galaxie 500 Convertible",
    subtitle: "428ci V8, Blue Interior, Numbers-Matching",
    price: "$65,000",
    time: "06:48:12",
    images: [
      "https://picsum.photos/id/1015/800/500",
      "https://picsum.photos/id/1016/400/250",
      "https://picsum.photos/id/1018/400/250",
    ],
  },
];

interface FeaturedCarsProps {
  variant?: "left" | "right";
}

export default function FeaturedCars({ variant = "left" }: FeaturedCarsProps) {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? testCars.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === testCars.length - 1 ? 0 : prev + 1));
  };

  const car = testCars[index];

  const LargeImage = (
    <div className="relative overflow-hidden h-full col-span-2">
      <img
        src={car.images[0]}
        alt={car.title}
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
        <h3 className="text-xl font-bold">{car.title}</h3>
        <p className="text-sm pt-1">{car.subtitle}</p>
        <div className="mt-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <span className="bg-black/50 px-3 py-1 rounded">{car.time}</span>
            <span className="bg-black/50 px-3 py-1 rounded">{car.price}</span>
          </div>
          <div className="flex items-center bg-black/50 rounded">
            <button
              onClick={prev}
              className="hover:bg-neutral-700 p-2 rounded-l"
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={next}
              className="hover:bg-neutral-700 p-2 rounded-r"
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const SmallImages = (
    <div className="grid grid-rows-[auto,1fr,1fr] gap-1 h-full col-span-1">
      <div className="bg-neutral-800 p-2">
        <h2 className="text-base font-semibold text-white">
          {variant === "left" ? "Newly added" : "Featured cars"}
        </h2>
      </div>
      {car.images.slice(1).map((img, i) => (
        <div key={i} className="relative overflow-hidden">
          <img
            src={img}
            alt={`${car.title} view ${i + 1}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="rounded-2xl bg-neutral-900 p-2 w-full border">
      <div className="grid grid-cols-3 gap-1 h-full items-stretch">
        {variant === "left" ? (
          <>
            {LargeImage}
            {SmallImages}
          </>
        ) : (
          <>
            {SmallImages}
            {LargeImage}
          </>
        )}
      </div>
    </div>
  );
}