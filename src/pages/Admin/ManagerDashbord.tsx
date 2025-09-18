import { useState } from "react";
import { ChevronRight, Clock as ClockIcon, CircleDollarSign, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import Sidebar from "@/components/Main/SidebarProfile";
import {
    useGetInReviewCarsQuery,
    useGetAuctionCommentsQuery,
    useGetEndedAuctionsQuery,
    useGetActiveAuctionsQuery,
} from "@/features/api/endpoints/Profile";
import type { UserCommentDto } from "@/features/types/Profile";
import type { ProfileInReviewCarDto } from "@/features/types/Car";
import type { AuctionDto } from "@/features/types/Auction";
import { AuctionStatus, DrivetrainType, TransmissionType } from "@/features/types/enums";

type TabType = "in-progress" | "live-auctions" | "comments" | "past-listings";


export default function ManagerDashboard() {
    const [activeTab, setActiveTab] = useState("in-progress");
    const [pagination, setPagination] = useState({
        "in-progress": 1,
        "live-auctions": 1,
        "comments": 1,
        "past-listings": 1,
    });

    const pageSize = 3;

    const {
        data: inReviewCarsData,
        isLoading: isInReviewLoading,
        error: inReviewError,
    } = useGetInReviewCarsQuery({ pageNumber: pagination["in-progress"], pageSize });



    const {
        data: activeAuctionsData,
        isLoading: isActiveAuctionsLoading,
        error: activeAuctionsError,
    } = useGetActiveAuctionsQuery({ pageNumber: pagination["live-auctions"], pageSize });

    const handlePageChange = (tab: string, page: number) => {
        setPagination((prev) => ({
            ...prev,
            [tab]: page,
        }));
    };

    const Pagination = ({ tab, totalItems }: { tab: TabType; totalItems: number }) => {
        const totalPages = Math.ceil(totalItems / pageSize);
        const currentPage = pagination[tab];

        return (
            <div className="flex justify-center items-center gap-2 mt-4">
                <button
                    onClick={() => handlePageChange(tab, currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 dark:bg-[#2C2C2C] bg-[#D3D3D3] rounded-lg disabled:opacity-50"
                >
                    <ChevronLeft className="w-5 h-5 text-black dark:text-white" />
                </button>
                <span className="text-black dark:text-white">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(tab, currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 dark:bg-[#2C2C2C] bg-[#D3D3D3] rounded-lg disabled:opacity-50"
                >
                    <ChevronRightIcon className="w-5 h-5 text-black dark:text-white" />
                </button>
            </div>
        );
    };







    return (
        <div className="min-h-screen bg-steria-dark text-black dark:text-white">
            <div className="max-w-[1440px] mx-auto py-8">
                <div className="flex flex-col justify-center items-center lg:flex-row">

                    <div className="flex-1 max-w-[1072px]">
                        <div className="bg-steria-dark-card rounded-xl p-3">
                            <h1 className="text-2xl font-bold text-black dark:text-white mb-6">Dashboard</h1>
                            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 mb-6">
                                <div
                                    className={`flex flex-col items-center p-4 rounded-xl bg-[#DEDEDE] dark:bg-[#212121] cursor-pointer transition-all ${activeTab === "live-auctions" ? "border-2 border-[#2F2F2F] dark:border-[#D0D0D0]" : ""}`}
                                    onClick={() => setActiveTab("live-auctions")}
                                >
                                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M34.8332 31.1667H38.4998C39.5998 31.1667 40.3332 30.4333 40.3332 29.3333V23.8333C40.3332 22.1833 39.0498 20.7167 37.5832 20.35C34.2832 19.4333 29.3332 18.3333 29.3332 18.3333C29.3332 18.3333 26.9498 15.7667 25.2998 14.1167C24.3832 13.3833 23.2832 12.8333 21.9998 12.8333H9.1665C8.0665 12.8333 7.14984 13.5667 6.59984 14.4833L4.03317 19.8C3.7904 20.5081 3.6665 21.2515 3.6665 22V29.3333C3.6665 30.4333 4.39984 31.1667 5.49984 31.1667H9.1665" stroke="black" className="stroke-black dark:stroke-white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.8332 34.8333C14.8582 34.8333 16.4998 33.1917 16.4998 31.1667C16.4998 29.1416 14.8582 27.5 12.8332 27.5C10.8081 27.5 9.1665 29.1416 9.1665 31.1667C9.1665 33.1917 10.8081 34.8333 12.8332 34.8333Z" stroke="black" className="stroke-black dark:stroke-white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M16.5 31.1667H27.5" stroke="black" className="stroke-black dark:stroke-white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M31.1667 34.8333C33.1917 34.8333 34.8333 33.1917 34.8333 31.1667C34.8333 29.1416 33.1917 27.5 31.1667 27.5C29.1416 27.5 27.5 29.1416 27.5 31.1667C27.5 33.1917 29.1416 34.8333 31.1667 34.8333Z" stroke="black" className="stroke-black dark:stroke-white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <span className="text-black dark:text-white text-sm">Live Auctions</span>
                                </div>
                                <div
                                    className={`flex flex-col items-center p-4 rounded-xl bg-[#DEDEDE] dark:bg-[#212121] cursor-pointer transition-all ${activeTab === "in-progress" ? "border-2 border-[#2F2F2F] dark:border-[#D0D0D0]" : ""}`}
                                    onClick={() => setActiveTab("in-progress")}
                                >
                                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.8333 3.72168V7.42501C31.8816 8.41501 37.5833 15.73 36.5933 23.7783C35.75 30.4517 30.5066 35.75 23.8333 36.5383V40.205C33.9166 39.1967 41.25 30.25 40.2416 20.1667C39.4166 11.4583 32.505 4.58335 23.8333 3.72168ZM20.1666 3.77668C16.5916 4.12501 13.1816 5.50001 10.395 7.81001L13.0166 10.5233C15.07 8.87335 17.545 7.81001 20.1666 7.44335V3.77668ZM7.80997 10.395C5.51911 13.1777 4.10864 16.5794 3.7583 20.1667H7.42497C7.7733 17.5633 8.79997 15.0883 10.4316 13.0167L7.80997 10.395ZM3.77663 23.8333C4.1433 27.4267 5.55497 30.8183 7.8283 33.605L10.4316 30.9833C8.81251 28.911 7.78037 26.4415 7.4433 23.8333H3.77663ZM13.0166 33.6783L10.395 36.19C13.1724 38.5044 16.5721 39.9459 20.1666 40.3333V36.6667C17.5585 36.3296 15.0889 35.2975 13.0166 33.6783ZM30.8366 27.8483L23.3016 20.3133C24.0533 18.4067 23.6316 16.17 22.055 14.6117C20.405 12.9433 17.93 12.6133 15.9316 13.53L19.4883 17.0867L17.0133 19.58L13.365 16.005C12.375 18.0033 12.8333 20.4783 14.4466 22.1467C16.0233 23.7233 18.26 24.1267 20.1666 23.3933L27.7016 30.91C28.0316 31.2583 28.5266 31.2583 28.8566 30.91L30.7633 29.0217C31.1666 28.6917 31.1666 28.105 30.8366 27.8483Z" className="fill-black dark:fill-white" />
                                    </svg>
                                    <span className="text-black dark:text-white text-sm">In Progress</span>
                                </div>


                            </div>
                        </div>

                        <div className="bg-steria-dark-card rounded-xl mx-3 p-3 bg-[#DEDEDE] dark:bg-[#212121]">
                            {activeTab === "in-progress" && (
                                <div className="space-y-3">

                                            <Pagination tab="in-progress" totalItems={inReviewCarsData?.totalCount || 0} />


                                </div>
                            )}

                            {activeTab === "live-auctions" && (
                                <div className="space-y-3">

                                            <Pagination tab="live-auctions" totalItems={activeAuctionsData?.totalCount || 0} />

                                </div>
                            )}


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}