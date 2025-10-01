import { useState } from "react";
import Loader from "@/components/Main/Preloader";
import CarCard from "@/components/Main/PhotoPrew";
import { AuctionCards } from "@/components/Main/Auction/Cards";
import { SettingsMenu } from "@/components/Main/Auction/Menu";
import {
  useGetAuctionFilteredQuery,
  useGetActionActiveQuery,
} from "@/features/api/endpoints/Auction";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState<"ending" | "new" | "inspected">("ending");
  const [filters, setFilters] = useState<{
    mileage?: string;
    transmission?: string;
    bodyType?: string;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: body, isLoading } = useGetAuctionFilteredQuery(
    {
      PageNumber: currentPage,
      PageSize: pageSize,
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
    { count: 10 },
    { refetchOnFocus: true }
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const Pagination = ({ totalItems }: { totalItems: number }) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    return (
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 dark:bg-[#2C2C2C] bg-[#D3D3D3] rounded-lg disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5 text-black dark:text-white" />
        </button>
        <span className="text-black dark:text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 dark:bg-[#2C2C2C] bg-[#D3D3D3] rounded-lg disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5 text-black dark:text-white" />
        </button>
      </div>
    );
  };

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
              onClick={() => {
                setActiveTab("ending");
                setCurrentPage(1); // Reset page when switching tabs
              }}
              className={`cursor-pointer ${
                activeTab === "ending"
                  ? "text-black dark:text-white font-medium font-amulya"
                  : "text-black dark:text-white font-normal font-synonym"
              }`}
            >
              Ending soon
            </div>
            <div
              onClick={() => {
                setActiveTab("new");
                setCurrentPage(1); // Reset page when switching tabs
              }}
              className={`cursor-pointer ${
                activeTab === "new"
                  ? "text-black dark:text-white font-medium font-amulya"
                  : "text-black dark:text-white font-normal font-synonym"
              }`}
            >
              New cars
            </div>
            <div
              onClick={() => {
                setActiveTab("inspected");
                setCurrentPage(1); // Reset page when switching tabs
              }}
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
        {!isLoading && body?.items?.length > 0 && (
          <Pagination totalItems={body?.totalCount || 0} />
        )}
      </div>
    </section>
  );
};

export default HomePage;