import { useState } from "react";
import Loader from "@/components/Main/Preloader";
import CarCard from "@/components/Main/PhotoPrew";
import { AuctionCards } from "@/components/Main/Auction/Cards";
import { SettingsMenu } from "@/components/Main/Auction/Menu";
import {
  useGetAuctionFilteredQuery,
  useGetActionActiveQuery,
} from "@/features/api/endpoints/Auction";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<"ending" | "new" | "inspected">(
    "ending"
  );
const [filters, setFilters] = useState<{
  mileage?: string;
  transmission?: string;
  bodyType?: string;
}>({});

 const { data: body, isLoading } = useGetAuctionFilteredQuery(
  {
    PageNumber: 1,
    PageSize: 10,
    sortBy:
      activeTab === "ending"
        ? "EndingSoon"
        : activeTab === "new"
        ? "NewCars"
        : "Inspected",
    ModelSearch: "",
    minMileage: filters.mileage?.split("-")[0] ? Number(filters.mileage.split("-")[0]) : 0,
    maxMileage: filters.mileage?.split("-")[1] ? Number(filters.mileage.split("-")[1]) : 1000000000,
    bodyStyle: filters.bodyType || "",
    trasmission: filters.transmission || "",
  },
  { refetchOnFocus: true, refetchOnReconnect: true }
);



  const { data: img } = useGetActionActiveQuery(
    { count: 2 },
    { refetchOnFocus: true }
  );

  return (
    <section className="w-full px-6 py-16 flex flex-col lg:flex-row items-center justify-center gap-12 mx-auto min-h-[80vh]">
      <div className="flex flex-col items-center justify-center">
        {/* Top preview */}
        <div className="self-stretch inline-flex justify-center items-start gap-5 pb-10">
          {img && img.length > 1 && <CarCard data={img} />}
        </div>

        {/* Tabs */}
        <div className="w-full px-6 grid grid-cols-3 items-center gap-5">
          <div className="text-black dark:text-white text-2xl font-bold font-amulya">
            Auctions
          </div>

          <div className="flex justify-center items-center gap-5">
            <div
              onClick={() => setActiveTab("ending")}
              className={`cursor-pointer ${
                activeTab === "ending"
                  ? "text-black dark:text-white font-medium font-amulya"
                  : "text-black dark:text-white font-normal font-synonym"
              }`}
            >
              Ending soon
            </div>
            <div
              onClick={() => setActiveTab("new")}
              className={`cursor-pointer ${
                activeTab === "new"
                  ? "text-black dark:text-white font-medium font-amulya"
                  : "text-black dark:text-white font-normal font-synonym"
              }`}
            >
              New cars
            </div>
            <div
              onClick={() => setActiveTab("inspected")}
              className={`cursor-pointer ${
                activeTab === "inspected"
                  ? "text-black dark:text-white font-medium font-amulya"
                  : "text-black dark:text-white font-normal font-synonym"
              }`}
            >
              Inspected
            </div>
          </div>

         <SettingsMenu filters={filters} setFilters={setFilters} />
        </div>

        {/* Auction cards */}
        <div className="flex justify-center items-center grid grid-cols-2 gap-5 m-4">
          {body?.items?.map((auction: any) => (
            <AuctionCards key={auction.id} data={auction} />
          ))}
        </div>

        {isLoading && <Loader />}
        
        {!isLoading && body?.items?.length === 0 && (
          <>
          
          <Loader />
          <div className="text-black dark:text-white text-lg font-medium font-synonym">
            No auctions found
          </div>
          </>
        )}
      </div>
    </section>
  );
  console.log(filters);
};

export default HomePage;
