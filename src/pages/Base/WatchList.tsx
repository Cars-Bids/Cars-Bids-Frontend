import React, { useState, useEffect } from "react";
import {
  useGetFilteredWishlistsQuery,
  useGetSavedSearchesQuery,
  useDeleteSavedSearchMutation,
  useDeleteWishlistByIdMutation,
} from "@/features/api/endpoints/Wishlist";
import Sidebar from "@/components/Main/SidebarProfile";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { AuctionWishlistDto, SavedSearchDto, WishlistFilteredDto } from "@/features/types/Wishlist";

interface StatusTagProps {
  type: "inspected" | "no-reserve";
  text: string;
}

function StatusTag({ type, text }: StatusTagProps) {
  const bgColor = type === "inspected" ? "dark:bg-white bg-black" : "bg-[#5CA1FF]";
  const textColor = type === "inspected" ? "dark:text-black text-white" : "text-white";
  return (
    <div className={`inline-flex px-1.5 py-0.5 justify-center items-center gap-3 rounded-lg ${bgColor}`}>
      <div className={`${textColor} text-xs font-bold leading-[140%]`}>{text}</div>
    </div>
  );
}

const parseDate = (dateString?: string | Date): Date | null => {
  if (!dateString) return null;
  const d = new Date(dateString);
  return isNaN(d.getTime()) ? null : d;
};

const formatTimeToEnd = (endTime?: string | Date): string => {
  const end = parseDate(endTime);
  if (!end) return "N/A";

  const now = new Date();
  const diffMs = end.getTime() - now.getTime();

  if (diffMs <= 0) return "Ended";

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

interface AuctionCarCardProps {
  carName: string;
  carDescription: string;
  carImage: string;
  location: string;
  endTime?: string | Date;
  currentBid?: number;
  showInspected?: boolean;
  showNoReserve?: boolean;
  showStar?: boolean;
  onRemove?: () => void;
}

function AuctionCarCard({
  carName,
  carDescription,
  carImage,
  location,
  endTime,
  currentBid,
  showInspected = false,
  showNoReserve = false,
  showStar = true,
  onRemove,
}: AuctionCarCardProps) {
  return (
    <div className="flex min-[550px]:flex-row flex-col w-full items-start gap-1 bg-steria-dark-card rounded-lg p-2">
      <div className="relative min-[550px]:w-[239px] w-full">
        <img
          src={carImage}
          alt={carName}
          className="w-full h-[159px] flex-shrink-0 rounded object-cover"
        />
        {showStar && (
          <div className="absolute top-2 left-2 cursor-pointer" onClick={onRemove}>
            <svg
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="#FFD700"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.68335 1.53009C7.71257 1.47107 7.7577 1.42138 7.81365 1.38664C7.86961 1.3519 7.93416 1.3335 8.00002 1.3335C8.06588 1.3335 8.13043 1.3519 8.18639 1.38664C8.24234 1.42138 8.28747 1.47107 8.31669 1.53009L9.85669 4.64942C9.958 4.85484 10.1077 5.03255 10.293 5.16727C10.4782 5.30198 10.6934 5.38966 10.92 5.42276L14.364 5.92676C14.4293 5.93621 14.4906 5.96374 14.541 6.00622C14.5914 6.04871 14.629 6.10446 14.6494 6.16716C14.6698 6.22987 14.6722 6.29703 14.6564 6.36105C14.6406 6.42507 14.6072 6.48339 14.56 6.52942L12.0694 8.95476C11.905 9.11473 11.782 9.3123 11.711 9.53043C11.64 9.74856 11.6232 9.98068 11.662 10.2068L12.25 13.6334C12.2615 13.6987 12.2545 13.7658 12.2297 13.8272C12.2049 13.8886 12.1633 13.9418 12.1097 13.9808C12.0561 14.0197 11.9927 14.0428 11.9266 14.0474C11.8605 14.052 11.7945 14.0379 11.736 14.0068L8.65735 12.3881C8.45453 12.2815 8.22883 12.2258 7.99969 12.2258C7.77055 12.2258 7.54484 12.2815 7.34202 12.3881L4.26402 14.0068C4.20557 14.0377 4.13962 14.0516 4.07365 14.0469C4.00769 14.0422 3.94437 14.0191 3.89088 13.9802C3.8374 13.9413 3.79591 13.8882 3.77112 13.8269C3.74634 13.7656 3.73926 13.6986 3.75069 13.6334L4.33802 10.2074C4.37693 9.98124 4.36018 9.74899 4.28921 9.53074C4.21824 9.31248 4.09519 9.11479 3.93069 8.95476L1.44002 6.53009C1.39242 6.48411 1.35868 6.42569 1.34266 6.36147C1.32664 6.29726 1.32898 6.22984 1.34941 6.16689C1.36983 6.10393 1.40753 6.04799 1.4582 6.00541C1.50888 5.96284 1.57049 5.93536 1.63602 5.92609L5.07935 5.42276C5.30623 5.38987 5.5217 5.30228 5.70718 5.16756C5.89266 5.03283 6.04258 4.85501 6.14402 4.64942L7.68335 1.53009Z"
                stroke="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {endTime && (
          <div className="absolute bottom-2 left-2">
            <div className="dark:bg-[#2c2c2c] bg-[#D3D3D3] rounded-md outline-1 outline-offset-[-1px] dark:outline-[#d0d0d0] outline-[#2F2F2F] inline-flex justify-start items-center gap-[3px] overflow-hidden">
              <div className="pl-2.5 pr-1.5 py-1.5 flex justify-center items-center gap-2">
                <div className="justify-start text-black dark:text-white text-[10px] font-medium leading-[10px]">
                  {formatTimeToEnd(endTime)}
                </div>
              </div>
              <div className="px-2.5 py-1.5 border-l dark:border-white border-black flex justify-start items-center gap-2">
                <div className="justify-start text-black dark:text-white text-[10px] font-medium leading-[10px]">
                  {currentBid ? `$${currentBid.toLocaleString()}` : "No bids"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 px-2 h-full">
        <div className="flex flex-col items-start gap-2">
          <div className="text-black dark:text-white font-bold text-lg leading-[110%]">
            {carName}
          </div>
          <div className="text-black dark:text-white text-sm font-normal leading-normal">
            {carDescription}
          </div>
        </div>
        <div className="flex items-center gap-2 my-auto">
          {showInspected && <StatusTag type="inspected" text="Inspected" />}
          {showNoReserve && <StatusTag type="no-reserve" text="No Reserve" />}
        </div>
        <div className="mt-auto">
          <div className="text-black dark:text-white text-sm font-normal leading-normal">
            {location}
          </div>
        </div>
      </div>
    </div>
  );
}

interface SavedSearchItemProps {
  searchTerm: string;
  totalMatchingAuctions: number;
  carName: string;
  carDescription: string;
  carImage: string;
  location: string;
  endTime?: string | Date;
  currentBid?: number;
  showInspected?: boolean;
  showNoReserve?: boolean;
  onDelete: () => void;
}

function SavedSearchItem({
  searchTerm,
  totalMatchingAuctions,
  carName,
  carDescription,
  carImage,
  location,
  endTime,
  currentBid,
  showInspected,
  showNoReserve,
  onDelete,
}: SavedSearchItemProps) {
  const moreCount = Math.max(0, totalMatchingAuctions - 1);
  return (
    <div className="flex w-full max-w-[518px] flex-col items-start gap-3">
      <div className="flex w-full px-3 justify-between items-center">
        <div className="text-black dark:text-white font-bold text-base leading-normal underline">
          {searchTerm}
        </div>
        <div className="flex items-center gap-5">
          <div className="flex px-3 py-1 justify-center items-center gap-2.5 rounded-md bg-[#CE2023]">
            <div className="text-black dark:text-white text-xs font-medium leading-[140%]">
              +{moreCount} more {searchTerm}
            </div>
          </div>
          <button
            onClick={onDelete}
            className="cursor-pointer text-black dark:text-white text-xs font-medium leading-[140%]"
          >
            Delete
          </button>
        </div>
      </div>
      <AuctionCarCard
        carName={carName}
        carDescription={carDescription}
        carImage={carImage}
        location={location}
        endTime={endTime}
        currentBid={currentBid}
        showInspected={showInspected}
        showNoReserve={showNoReserve}
        showStar={false}
      />
    </div>
  );
}

export default function Watchlist() {
  const [filters, setFilters] = useState({
    endingSoon: false,
    newCars: false,
    inspected: false,
  });

  const [pagination, setPagination] = useState({
    auctions: 1,
    savedSearches: 1,
  });

  const pageSize = 10;

  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((prev) => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const { data: wishlists, isLoading: isLoadingWishlists } = useGetFilteredWishlistsQuery({
    pageNumber: pagination.auctions,
    pageSize,
    ...filters,
  });

  const { data: savedSearches, isLoading: isLoadingSearches } = useGetSavedSearchesQuery({
    pageNumber: pagination.savedSearches,
    pageSize,
  });

  const [deleteSavedSearch] = useDeleteSavedSearchMutation();
  const [deleteWishlist] = useDeleteWishlistByIdMutation();

  const handleFilterChange = (filter: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
    setPagination((prev) => ({ ...prev, auctions: 1 }));
  };

  const handlePageChange = (section: "auctions" | "savedSearches", page: number) => {
    setPagination((prev) => ({
      ...prev,
      [section]: page,
    }));
  };

  const Pagination = ({ section, totalItems }: { section: "auctions" | "savedSearches"; totalItems: number }) => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const currentPage = pagination[section];

    return (
      <div className="flex justify-center items-center gap-2 mt-4 w-full">
        <button
          onClick={() => handlePageChange(section, currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 dark:bg-[#2C2C2C] bg-[#D3D3D3] rounded-lg disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5 text-black dark:text-white" />
        </button>
        <span className="text-black dark:text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(section, currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 dark:bg-[#2C2C2C] bg-[#D3D3D3] rounded-lg disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5 text-black dark:text-white" />
        </button>
      </div>
    );
  };

  if (isLoadingWishlists || isLoadingSearches) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-steria-dark text-black dark:text-white">
      <div className="max-w-[1440px] mx-auto py-8">
        <div className="flex flex-col min-[1024px]:flex-row">
          <div className="min-[1024px]:sticky min-[1024px]:top-8">
            <Sidebar />
          </div>
          <div className="flex-1 max-w-[1072px]">
            <div className="bg-steria-dark-card rounded-xl p-3">
              <h1 className="text-2xl font-bold text-black dark:text-white mb-6">Watchlist</h1>
            </div>
            <div className="bg-steria-dark-card rounded-xl mx-3 p-3">
              <div className="flex flex-col items-start gap-7 self-stretch">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-4">
                  <div className="text-black dark:text-white font-bold text-lg leading-[110%] text-center sm:text-left">
                    Auctions
                  </div>
                  <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-5 w-full sm:pl-[40px]">
                    <button
                      onClick={() => handleFilterChange("endingSoon")}
                      className={`text-black dark:text-white text-base leading-normal text-center w-full sm:w-auto ${filters.endingSoon ? "font-bold" : "font-normal"
                        }`}
                    >
                      Ending soon
                    </button>
                    <button
                      onClick={() => handleFilterChange("newCars")}
                      className={`text-black dark:text-white text-base leading-normal text-center w-full sm:w-auto ${filters.newCars ? "font-bold" : "font-normal"
                        }`}
                    >
                      New cars
                    </button>
                    <button
                      onClick={() => handleFilterChange("inspected")}
                      className={`text-black dark:text-white text-base leading-normal text-center w-full sm:w-auto ${filters.inspected ? "font-bold" : "font-normal"
                        }`}
                    >
                      Inspected
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 min-[1300px]:grid-cols-2 gap-3 w-full">
                  {wishlists?.items.length === 0 ? (
                    <p className="text-black dark:text-white">No data available :(</p>
                  ) : (
                    wishlists?.items.map((wishlist: WishlistFilteredDto) => (
                      <AuctionCarCard
                        key={wishlist.id}
                        carName={`${wishlist.auction.car.year} ${wishlist.auction.car.make} ${wishlist.auction.car.model}`}
                        carDescription={`${wishlist.auction.car.description}`}
                        carImage={wishlist.auction.car.mainImageUrl || "https://via.placeholder.com/478x159"}
                        location={wishlist.auction.car.location || "Unknown Location"}
                        endTime={wishlist.auction.endTime}
                        currentBid={wishlist.auction.currentPrice}
                        showInspected={wishlist.auction.isInspected}
                        showStar={true}
                        onRemove={() => deleteWishlist({ id: wishlist.id })}
                      />
                    ))
                  )}
                </div>
                {(wishlists?.totalCount ?? 0) > 0 && (
                  <Pagination section="auctions" totalItems={wishlists?.totalCount ?? 0} />
                )}
              </div>

              <div className="flex flex-col items-start gap-7 self-stretch mt-6">
                <div className="flex items-center gap-15 self-stretch">
                  <div className="text-black dark:text-white font-bold text-lg leading-[110%]">
                    Saved Searches
                  </div>
                </div>
                <div className="grid grid-cols-1 min-[1300px]:grid-cols-2 gap-3 w-full">
                  {savedSearches?.items.length === 0 ? (
                    <p className="text-black dark:text-white">No data available :(</p>
                  ) : (
                    savedSearches?.items.map((search: SavedSearchDto) => (
                      <SavedSearchItem
                        key={search.id}
                        searchTerm={search.makeName || "Unknown Make"}
                        totalMatchingAuctions={search.totalMatchingAuctions || 0}
                        carName={
                          search.firstAuction
                            ? `${search.firstAuction.year} ${search.firstAuction.makeName} ${search.firstAuction.modelName}`
                            : "No Auction"
                        }
                        carDescription={
                          search.firstAuction
                            ? `${search.firstAuction.engine}, ${search.firstAuction.numberOfGears}-speed ${search.firstAuction.transmission}`
                            : "No description available"
                        }
                        carImage={
                          search.firstAuction?.mainImage || "https://via.placeholder.com/478x159"
                        }
                        location={search.firstAuction?.location || "Unknown Location"}
                        endTime={search.firstAuction?.endTime}
                        currentBid={search.firstAuction?.currentPrice}
                        showInspected={search.firstAuction?.isInspected || false}
                        onDelete={() => deleteSavedSearch({ id: search.id })}
                      />
                    ))
                  )}
                </div>
                {(savedSearches?.totalCount ?? 0) > 0 && (
                  <Pagination section="savedSearches" totalItems={savedSearches?.totalCount ?? 0} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}