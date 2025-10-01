import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "@/components/Main/Preloader";
import { AuctionCards } from "@/components/Main/Auction/Cards";
import { SettingsMenu } from "@/components/Main/Auction/Menu";
import { useGetAuctionFilteredQuery } from "@/features/api/endpoints/Auction";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetModelsByMakeQuery } from "@/features/api/endpoints/Models";
import { Links } from "@/components/Main/Links";

export const SearchPage = () => {
  const { id } = useParams<{ id: string }>();
  const [makeId, setMakeId] = useState<number | null>(null);

  const [activeTab, setActiveTab] = useState<"ending" | "new" | "inspected">(
    "ending"
  );
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
      ModelSearch: id || "",
      minMileage: filters.mileage?.split("-")[0]
        ? Number(filters.mileage.split("-")[0])
        : 0,
      maxMileage: filters.mileage?.split("-")[1]
        ? Number(filters.mileage.split("-")[1])
        : 1000000000,
      bodyStyle: filters.bodyType || "",
      trasmission: filters.transmission || "",
    },
    { refetchOnFocus: true, refetchOnReconnect: true }
  );

  // Встановлюємо makeId після завантаження body
  useEffect(() => {
    if (body?.makeIds && body.makeIds.length > 0) {
      setMakeId(Number(body.makeIds[0]));
    }
  }, [body]);

  // Виклик запиту тільки якщо makeId не null
  const { data: models } = useGetModelsByMakeQuery(
  makeId,
    { skip: makeId === null, refetchOnFocus: true, refetchOnReconnect: true }
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
        <div className="w-full px-6 grid grid-cols-4 items-center gap-3 my-4">
         <div>  </div>
          <div> </div>
          <div> </div>
          <div className=" w-full px-2 py-2 bg-yellow-400 rounded-md flex justify-center items-right cursor-pointer">
            <div className="justify-start text-graphite- text-base font-medium font-synonym">
              Save Search and Notify Me Later
            </div>
          </div>
         
        </div>
  <div className="px-6 w-full flex dark:text-white text-black  items-center  gap-2 font-bold font-amulya m-4 overflow-x-auto min-w-full">
            {models?.map((model: any) => (
              <Links to={`/search/${model.name}`} className="text-[12px] border-1 border-white  p-2 rounded-md" key={model.id}>{model.name} </Links>
            ))}
          </div>
        <div className="px-6 grid grid-cols-3 items-center gap-5 min-w-full">
          <div className="text-black dark:text-white text-2xl font-bold font-amulya">
            {id} Auctions (
            <span className="text-lg">{body?.totalCount} Results Found</span>)
          </div>
          <div className="flex justify-center items-center gap-5 ">
            {["ending", "new", "inspected"].map((tab) => (
              <div
                key={tab}
                onClick={() => {
                  setActiveTab(tab as "ending" | "new" | "inspected");
                  setCurrentPage(1);
                }}
                className={`cursor-pointer ${
                  activeTab === tab
                    ? "text-black dark:text-white font-medium font-amulya"
                    : "text-black dark:text-white font-normal font-synonym"
                }`}
              >
                {tab === "ending"
                  ? "Ending soon"
                  : tab === "new"
                  ? "New cars"
                  : "Inspected"}
              </div>
            ))}
          </div>
          <SettingsMenu filters={filters} setFilters={setFilters} />
        </div>

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
