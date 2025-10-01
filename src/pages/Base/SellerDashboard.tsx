import { useEffect, useState } from "react";
import { ChevronRight, Clock as ClockIcon, CircleDollarSign, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom"; // Added Link import
import { useSelector } from "react-redux";
import Sidebar from "@/components/Main/SidebarProfile";
import {
    useGetInReviewCarsQuery,
    useGetAuctionCommentsQuery,
    useGetEndedAuctionsQuery,
    useGetActiveAuctionsQuery,
} from "@/features/api/endpoints/Profile";
import type { RootState } from "@/app/store";
import type { UserCommentDto } from "@/features/types/Profile";
import type { ProfileInReviewCarDto } from "@/features/types/Car";
import type { AuctionDto } from "@/features/types/Auction";
import { AuctionStatus, DrivetrainType, TransmissionType } from "@/features/types/enums";

type TabType = "in-progress" | "live-auctions" | "comments" | "past-listings";

export default function SellerDashboard() {

    const currentLang = useSelector((state: RootState) => state.lang.current);
    const [activeTab, setActiveTab] = useState<TabType>("in-progress");
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
        data: commentsData,
        isLoading: isCommentsLoading,
        error: commentsError,
    } = useGetAuctionCommentsQuery({ pageNumber: pagination["comments"], pageSize });

    const {
        data: endedAuctionsData,
        isLoading: isEndedAuctionsLoading,
        error: endedAuctionsError,
    } = useGetEndedAuctionsQuery({ pageNumber: pagination["past-listings"], pageSize });

    const {
        data: activeAuctionsData,
        isLoading: isActiveAuctionsLoading,
        error: activeAuctionsError,
    } = useGetActiveAuctionsQuery({ pageNumber: pagination["live-auctions"], pageSize });

    const handlePageChange = (tab: TabType, page: number) => {
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

    const mapActiveAuctionToListing = (auction: AuctionDto) => {
        const drivetrain =
            auction.car.drivetrain === DrivetrainType.FWD
                ? "FWD"
                : auction.car.drivetrain === DrivetrainType.RWD
                    ? "RWD"
                    : "AWD";

        const transmission =
            auction.car.transmissionType === TransmissionType.Automatic
                ? "Automatic"
                : "Manual";

        const endTime = new Date(auction.endTime);
        const now = new Date();
        const timeDiff = endTime.getTime() - now.getTime();
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        const timeLeft = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

        const tags = auction.status === AuctionStatus.Active
            ? ["Active"]
            : [];
        const tagColors = auction.status === AuctionStatus.Active
            ? ["bg-blue-500 text-black dark:text-white"]
            : [];

        return {
            id: auction.id,
            image:
                auction.car.mainImageUrl ||
                "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
            year: auction.car.year.toString(),
            make: auction.car.make,
            model: auction.car.model,
            description: `${auction.car.engine ?? "Unknown"}, ${drivetrain}, ${transmission}`,
            fuelType: auction.car.engine?.includes("Electric") ? "Electro" : "Gasoline",
            transmission,
            mileage: `${auction.car.mileage} km`,
            timeLeft,
            currentBid: auction.currentPrice ? `$${auction.currentPrice.toLocaleString()}` : "No Bids",
            tags,
            tagColors,
        };
    };

    const mapCarToListing = (car: ProfileInReviewCarDto) => {
        let statusLabel = "Unknown";
        let statusColor = "bg-gray-500 text-black dark:text-white";
        let statusMessage = "";
        let tags: string[] = [];
        let tagColors: string[] = [];
        let publishDate = null;

        if (car.auction && car.auction.status.toString() === "pending") {
            statusLabel = "Will be published on";
            publishDate = car.auction.startTime
                ? new Date(car.auction.startTime).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' })
                : "...";
            statusColor = "bg-blue-500 text-black";
            tags = ["Waiting to start"];
            tagColors = ["bg-[#5CA1FF] text-black"];
            statusMessage = "No additional information needed.";
        }
        else if (car.auction && car.auction.status.toString() === "new") {
            statusLabel = "Will be published on";
            publishDate = car.auction.startTime
                ? new Date(car.auction.startTime).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' })
                : "...";
            statusColor = "bg-yellow-500 text-black";
            tags = ["In progress"];
            tagColors = ["bg-[#C3F73A] text-black"];
            statusMessage = "Additional information is still needed.";
        }
        else if (car.auction && car.auction.status.toString() === "approved") {
            statusLabel = "Will be published on";
            publishDate = car.auction.startTime
                ? new Date(car.auction.startTime).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' })
                : "...";
            statusColor = "bg-yellow-500 text-black";
            tags = ["Waiting your accept"];
            tagColors = ["bg-[#5CA1FF] text-black"];
            statusMessage = "No additional information needed.";
        }
        else if (car && car.status.toString() === "inPending") {
            statusLabel = "Will be published on";
            publishDate = "...";
            statusColor = "bg-yellow-500 text-black";
            tags = ["Waiting"];
            tagColors = ["bg-yellow-500 text-black"];
            statusMessage = "Additional information is still needed.";
        }
        else {
            const statusMap: Record<number, { label: string; color: string }> = {
                0: { label: "Pending", color: "bg-yellow-500 text-black" },
                1: { label: "Canceled", color: "bg-red-500 text-black dark:text-white" },
                2: { label: "In Review", color: "bg-blue-500 text-black dark:text-white" },
                3: { label: "Approved", color: "bg-green-500 text-black dark:text-white" },
            };
            const mappedStatus = statusMap[car.status] || { label: "Unknown", color: "bg-gray-500 text-black dark:text-white" };
            statusLabel = mappedStatus.label;
            statusColor = mappedStatus.color;
            tags = [statusLabel];
            tagColors = [statusColor];
        }

        return {
            id: car.id,
            image:
                car.otherImage ||
                "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
            year: car.year.toString(),
            make: car.make,
            model: car.model,
            transmission:
                car.transmissionType === TransmissionType.Automatic
                    ? "Automatic"
                    : "Manual",
            mileage: `${car.mileage} km`,
            status: statusLabel,
            publishDate,
            statusColor,
            statusMessage,
            tags,
            tagColors,
            drivetrain:
                car.drivetrain === DrivetrainType.FWD
                    ? "FWD"
                    : car.drivetrain === DrivetrainType.RWD
                        ? "RWD"
                        : "AWD",
            hasAuction: !!car.auction,
            hasChat: !!car.chatId,
            auctionId: car.auction?.id,
            chatId: car.chatId,
        };
    };

    const mapCommentToUI = (comment: UserCommentDto) => ({
        id: comment.id,
        carId: comment.carId,
        auctionId: comment.auctionId,
        image: comment.mainImage || "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
        year: comment.year ? comment.year.toString() : "N/A",
        make: comment.make,
        model: comment.model,
        username: comment.userName,
        comment: comment.text,
    });

        const calculateTimeLeft = (endTime: string | Date) => {
        const end = new Date(endTime);
        const now = new Date();
        const diff = end.getTime() - now.getTime();
        if (diff <= 0) return "00:00:00";
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };


    const [liveAuctionsWithTime, setLiveAuctionsWithTime] = useState(() =>
        activeAuctionsData?.items.map(auction => ({
            ...auction,
            timeLeft: calculateTimeLeft(auction.endTime),
        })) || []
    );

    useEffect(() => {
        if (!activeAuctionsData?.items) return;

        const interval = setInterval(() => {
            setLiveAuctionsWithTime(activeAuctionsData.items.map(auction => ({
                ...auction,
                timeLeft: calculateTimeLeft(auction.endTime),
            })));
        }, 1000);

        return () => clearInterval(interval);
    }, [activeAuctionsData]);

    const mapAuctionToListing = (auction: AuctionDto) => {
        const drivetrain =
            auction.car.drivetrain === DrivetrainType.FWD
                ? "FWD"
                : auction.car.drivetrain === DrivetrainType.RWD
                    ? "RWD"
                    : "AWD";

        const transmission =
            auction.car.transmissionType === TransmissionType.Automatic
                ? "Automatic"
                : "Manual";

        const status =
            auction.status.toString() === "sold"
                ? { tags: ["Sold"], tagColors: ["bg-green-500 text-white"] }
                : auction.status.toString() === "notSold"
                    ? { tags: ["Not Sold"], tagColors: ["bg-red-500 text-white"] }
                    : auction.status.toString() === "cancelled"
                        ? { tags: ["Cancelled"], tagColors: ["bg-yellow-500 text-black"] }
                        : { tags: ["Active"], tagColors: ["bg-blue-500 text-white"] };

        return {
            id: auction.id,
            image:
                auction.car.mainImageUrl ||
                "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
            year: auction.car.year.toString(),
            make: auction.car.make.toString(),
            model: auction.car.model.toString(),
            description: `${auction.car.engine ?? "Unknown"}, ${drivetrain}, ${transmission}`,
            fuelType: auction.car.engine?.includes("Electric") ? "Electro" : "Gasoline",
            transmission,
            mileage: `${auction.car.mileage} km`,
            soldFor: auction.currentPrice
                ? `$${auction.currentPrice.toLocaleString()}`
                : "Not Sold",
            ...status,
        };
    };

    return (
        <div className="min-h-screen bg-steria-dark text-black dark:text-white">
            <div className="max-w-[1440px] mx-auto py-8">
                <div className="flex flex-col lg:flex-row">
                    <Sidebar />
                    <div className="flex-1 max-w-[1072px]">
                        <div className="bg-steria-dark-card rounded-xl p-3">
                            <h1 className="text-2xl font-bold text-black dark:text-white mb-6">Dashboard</h1>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                                <div
                                    className={`flex flex-col items-center p-4 rounded-xl bg-[#DEDEDE] dark:bg-[#212121] cursor-pointer transition-all ${activeTab === "in-progress" ? "border-2 border-[#2F2F2F] dark:border-[#D0D0D0]" : ""}`}
                                    onClick={() => setActiveTab("in-progress")}
                                >
                                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.8333 3.72168V7.42501C31.8816 8.41501 37.5833 15.73 36.5933 23.7783C35.75 30.4517 30.5066 35.75 23.8333 36.5383V40.205C33.9166 39.1967 41.25 30.25 40.2416 20.1667C39.4166 11.4583 32.505 4.58335 23.8333 3.72168ZM20.1666 3.77668C16.5916 4.12501 13.1816 5.50001 10.395 7.81001L13.0166 10.5233C15.07 8.87335 17.545 7.81001 20.1666 7.44335V3.77668ZM7.80997 10.395C5.51911 13.1777 4.10864 16.5794 3.7583 20.1667H7.42497C7.7733 17.5633 8.79997 15.0883 10.4316 13.0167L7.80997 10.395ZM3.77663 23.8333C4.1433 27.4267 5.55497 30.8183 7.8283 33.605L10.4316 30.9833C8.81251 28.911 7.78037 26.4415 7.4433 23.8333H3.77663ZM13.0166 33.6783L10.395 36.19C13.1724 38.5044 16.5721 39.9459 20.1666 40.3333V36.6667C17.5585 36.3296 15.0889 35.2975 13.0166 33.6783ZM30.8366 27.8483L23.3016 20.3133C24.0533 18.4067 23.6316 16.17 22.055 14.6117C20.405 12.9433 17.93 12.6133 15.9316 13.53L19.4883 17.0867L17.0133 19.58L13.365 16.005C12.375 18.0033 12.8333 20.4783 14.4466 22.1467C16.0233 23.7233 18.26 24.1267 20.1666 23.3933L27.7016 30.91C28.0316 31.2583 28.5266 31.2583 28.8566 30.91L30.7633 29.0217C31.1666 28.6917 31.1666 28.105 30.8366 27.8483Z" className="fill-black dark:fill-white" />
                                    </svg>
                                    <span className="text-black dark:text-white text-sm">In Progress</span>
                                </div>
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
                                    className={`flex flex-col items-center p-4 rounded-xl bg-[#DEDEDE] dark:bg-[#212121] cursor-pointer transition-all ${activeTab === "comments" ? "border-2 border-[#2F2F2F] dark:border-[#D0D0D0]" : ""}`}
                                    onClick={() => setActiveTab("comments")}
                                >
                                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.5003 40.3333C16.0141 40.3333 15.5478 40.1402 15.204 39.7964C14.8601 39.4525 14.667 38.9862 14.667 38.5V33H7.33366C6.3612 33 5.42857 32.6137 4.74093 31.926C4.0533 31.2384 3.66699 30.3058 3.66699 29.3333V7.33332C3.66699 6.36086 4.0533 5.42823 4.74093 4.7406C5.42857 4.05296 6.3612 3.66666 7.33366 3.66666H36.667C37.6395 3.66666 38.5721 4.05296 39.2597 4.7406C39.9473 5.42823 40.3337 6.36086 40.3337 7.33332V29.3333C40.3337 30.3058 39.9473 31.2384 39.2597 31.926C38.5721 32.6137 37.6395 33 36.667 33H25.4837L18.7003 39.8017C18.3337 40.15 17.8753 40.3333 17.417 40.3333H16.5003ZM18.3337 29.3333V34.98L23.9803 29.3333H36.667V7.33332H7.33366V29.3333H18.3337Z" className="fill-black dark:fill-white" />
                                    </svg>
                                    <span className="text-black dark:text-white text-sm">Comments</span>
                                </div>
                                <div
                                    className={`flex flex-col items-center p-4 rounded-xl bg-[#DEDEDE] dark:bg-[#212121] cursor-pointer transition-all ${activeTab === "past-listings" ? "border-2 border-[#2F2F2F] dark:border-[#D0D0D0]" : ""}`}
                                    onClick={() => setActiveTab("past-listings")}
                                >
                                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M33 40.3333H11V29.3333L18.3333 22L11 14.6667V3.66666H33V14.6667L25.6667 22L33 29.3333M14.6667 13.75L22 21.0833L29.3333 13.75V7.33332H14.6667M22 22.9167L14.6667 30.25V36.6667H29.3333V30.25M25.6667 33H18.3333V31.5333L22 27.8667L25.6667 31.5333V33Z" className="fill-black dark:fill-white" />
                                    </svg>
                                    <span className="text-black dark:text-white text-sm">Past Listings</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-steria-dark-card rounded-xl mx-3 p-3 bg-[#DEDEDE] dark:bg-[#212121]">
                            {activeTab === "in-progress" && (
                                <div className="space-y-3">
                                    {isInReviewLoading ? (
                                        <p className="text-black dark:text-white">Loading...</p>
                                    ) : inReviewError ? (
                                        <p className="text-red-400">Error loading vehicles during inspection</p>
                                    ) : inReviewCarsData?.items.length === 0 ? (
                                        <p className="text-black dark:text-white">No data available :)</p>
                                    ) : (
                                        <>
                                            {inReviewCarsData?.items.map((car, index) => {
                                                const mappedCar = mapCarToListing(car);
                                                return (
                                                    <div key={car.id}>
                                                        <div className="flex flex-col lg:flex-row gap-6 p-2">
                                                            <img
                                                                src={mappedCar.image}
                                                                alt={`${mappedCar.year} ${mappedCar.make} ${mappedCar.model}`}
                                                                className="w-full lg:w-[190px] h-32 object-cover rounded-md flex-shrink-0"
                                                            />
                                                            <div className="flex-1 flex flex-col lg:flex-row justify-between gap-[4.92%]">
                                                                <div className="py-2 lg:basis-[37.63%] lg:max-w-[37.63%] flex-shrink-0 flex-grow-0">
                                                                    <h3 className="text-lg font-bold text-black dark:text-white mb-3">
                                                                        {mappedCar.year} {mappedCar.make} {mappedCar.model}
                                                                    </h3>
                                                                </div>
                                                                <div className="py-2 basis-[21.28%] flex-shrink-0 flex-grow-0">
                                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                                        <span className="px-3 py-2 dark:bg-[#2C2C2C] bg-[#D3D3D3] border border-[#2F2F2F] dark:border-[#D0D0D0] rounded-lg text-xs text-black dark:text-white">
                                                                            {mappedCar.transmission}
                                                                        </span>
                                                                        <span className="px-3 py-2 dark:bg-[#2C2C2C] bg-[#D3D3D3] border border-[#2F2F2F] dark:border-[#D0D0D0] rounded-lg text-xs text-black dark:text-white">
                                                                            {mappedCar.mileage}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-2 flex-shrink-0 flex-grow-0">
                                                                        {mappedCar.tags.map((tag, tagIndex) => (
                                                                            <span
                                                                                key={tagIndex}
                                                                                className={`px-2 py-1 rounded-lg text-xs font-bold ${mappedCar.tagColors[tagIndex]}`}
                                                                            >
                                                                                {tag}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="py-2 basis-[31.25%] flex-shrink-0 justify-between flex-grow-0 lg:text-right">
                                                                    <h4 className={`text-lg font-bold mb-3 `}>
                                                                        {mappedCar.status} {mappedCar.publishDate ? mappedCar.publishDate : ''}
                                                                    </h4>
                                                                    <p
                                                                        className={`text-sm mb-6 ${mappedCar.statusMessage
                                                                            ? mappedCar.statusMessage === "No additional information needed."
                                                                                ? "text-[#8EBF0B]"
                                                                                : "text-[14px]"
                                                                            : "hidden"
                                                                            }`}
                                                                    >
                                                                        {mappedCar.statusMessage}
                                                                    </p>
                                                                    <div className="flex items-center gap-4 lg:justify-end">
                                                                        {mappedCar.hasChat && (
                                                                            <Link
                                                                                to={mappedCar.chatId ? `/${currentLang}/chat/${mappedCar.chatId}` : '#'}
                                                                                className="flex items-center gap-1 text-black dark:text-white hover:text-gray-200 transition-colors"
                                                                            >
                                                                                <span>Open chat</span>
                                                                                <ChevronRight className="w-4 h-4 text-black dark:text-white" />
                                                                            </Link>
                                                                        )}
                                                                        {mappedCar.hasAuction && (
                                                                            <Link
                                                                                to={mappedCar.auctionId ? `/${currentLang}/auction-approval/${mappedCar.auctionId}` : '#'}
                                                                                className="flex items-center gap-1 text-black dark:text-white hover:text-gray-200 transition-colors"
                                                                            >
                                                                                <span>See details</span>
                                                                                <ChevronRight className="w-4 h-4 text-black dark:text-white" />
                                                                            </Link>
                                                                        )}
                                                                        {(!mappedCar.hasAuction || !mappedCar.hasChat) && (
                                                                            <span className="text-black dark:text-white">Pending</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {index < (inReviewCarsData?.items.length ?? 0) - 1 && (
                                                            <div className="w-full h-px bg-black dark:bg-white my-3"></div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                            <Pagination tab="in-progress" totalItems={inReviewCarsData?.totalCount || 0} />
                                        </>
                                    )}
                                </div>
                            )}

                            {activeTab === "live-auctions" && (
                                <div className="space-y-3">
                                    {isActiveAuctionsLoading ? (
                                        <p className="text-black dark:text-white">Loading...</p>
                                    ) : activeAuctionsError ? (
                                        <p className="text-red-400">Error loading active auctions</p>
                                    ) : activeAuctionsData?.items.length === 0 ? (
                                        <p className="text-black dark:text-white">No data available :)</p>
                                    ) : (
                                        <>
                                            {liveAuctionsWithTime.map((auction, index) => {
                                                const mappedAuction = mapActiveAuctionToListing(auction);
                                                return (
                                                    <div key={auction.id}>
                                                        <div className="flex flex-col lg:flex-row gap-6 p-2">
                                                            <img
                                                                src={mappedAuction.image}
                                                                alt={`${mappedAuction.year} ${mappedAuction.make} ${mappedAuction.model}`}
                                                                className="w-full lg:w-[190px] h-32 object-cover rounded-md flex-shrink-0"
                                                            />
                                                            <div className="flex-1 flex flex-col lg:flex-row justify-between gap-[4.92%]">
                                                                <div className="py-2 lg:basis-[37.63%] flex-shrink-0 flex-grow-0 lg:max-w-[37.63%]">
                                                                    <h3 className="text-lg font-bold text-black dark:text-white mb-3">
                                                                        {mappedAuction.year} {mappedAuction.make} {mappedAuction.model}
                                                                    </h3>
                                                                    <p className="text-sm text-black dark:text-white mb-3 line-clamp-2 max-w-full">
                                                                        {mappedAuction.description}
                                                                    </p>
                                                                </div>
                                                                <div className="py-2 basis-[21.28%] flex-shrink-0 flex-grow-0">
                                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                                        <span className="px-3 py-2 dark:bg-[#2C2C2C] bg-[#D3D3D3] border border-[#2F2F2F] dark:border-[#D0D0D0] rounded-lg text-xs text-black dark:text-white">
                                                                            {mappedAuction.fuelType}
                                                                        </span>
                                                                        <span className="px-3 py-2 dark:bg-[#2C2C2C] bg-[#D3D3D3] border border-[#2F2F2F] dark:border-[#D0D0D0] rounded-lg text-xs text-black dark:text-white">
                                                                            {mappedAuction.transmission}
                                                                        </span>
                                                                        <span className="px-3 py-2 dark:bg-[#2C2C2C] bg-[#D3D3D3] border border-[#2F2F2F] dark:border-[#D0D0D0] rounded-lg text-xs text-black dark:text-white">
                                                                            {mappedAuction.mileage}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {mappedAuction.tags.map((tag, tagIndex) => (
                                                                            <span
                                                                                key={tagIndex}
                                                                                className={`px-2 py-1 rounded-lg text-xs font-bold ${mappedAuction.tagColors[tagIndex]}`}
                                                                            >
                                                                                {tag}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="py-2 basis-[31.25%] flex-shrink-0 flex-grow-0 lg:text-right">
                                                                    <div className="space-y-6">
                                                                        <div className="flex flex-row justify-between items-center">
                                                                            <span className="text-black dark:text-white font-bold">Time left</span>
                                                                            <div className="flex items-center justify-end min-[1300px]:justify-between w-[40%]">
                                                                                <ClockIcon className="hidden min-[1300px]:block w-5 h-5 text-[#EF2929]" />
                                                                                <span className="text-black dark:text-white font-bold text-right">{mappedAuction.timeLeft}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex flex-row justify-between items-center">
                                                                            <span className="text-black dark:text-white font-bold">Current bid</span>
                                                                            <div className="flex items-center justify-end min-[1300px]:justify-between w-[40%]">
                                                                                <CircleDollarSign className="hidden min-[1300px]:block w-5 h-5 text-[#C3F73A]" />
                                                                                <span className="text-black dark:text-white font-bold">{mappedAuction.currentBid}</span>
                                                                            </div>
                                                                        </div>
                                                                        <Link
                                                                            to={auction.id ? `/${currentLang}/auction/${auction.id}` : '#'}
                                                                            className="flex items-center gap-1 lg:justify-end text-black dark:text-white hover:text-gray-200 transition-colors cursor-pointer"
                                                                        >
                                                                            <span>See details</span>
                                                                            <ChevronRight className="w-4 h-4 text-black dark:text-white" />
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {index < (activeAuctionsData?.items.length ?? 0) - 1 && (
                                                            <div className="w-full h-px bg-black dark:bg-white my-3"></div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                            <Pagination tab="live-auctions" totalItems={activeAuctionsData?.totalCount || 0} />
                                        </>
                                    )}
                                </div>
                            )}

                            {activeTab === "comments" && (
                                <div className="space-y-3">
                                    {isCommentsLoading ? (
                                        <p className="text-black dark:text-white">Loading...</p>
                                    ) : commentsError ? (
                                        <p className="text-red-400">Error loading comments</p>
                                    ) : commentsData?.items.length === 0 ? (
                                        <p className="text-black dark:text-white">No data available :)</p>
                                    ) : (
                                        <>
                                            {commentsData?.items.map((comment, index) => {
                                                const mappedComment = mapCommentToUI(comment);
                                                return (
                                                    <div key={comment.id}>
                                                        <div className="flex flex-col lg:flex-row gap-6 p-2">
                                                            <img
                                                                src={mappedComment.image}
                                                                alt={`${mappedComment.year} ${mappedComment.make} ${mappedComment.model}`}
                                                                className="w-full lg:w-[190px] h-32 object-cover rounded-md flex-shrink-0"
                                                            />
                                                            <div className="flex-1 flex flex-col lg:flex-row justify-between">
                                                                <div className="py-2 lg:basis-[80%] lg:max-w-[80%] flex-shrink-0 flex-grow-0">
                                                                    <h3 className="text-lg text-black dark:text-white mb-3 w-full flex items-center gap-2">
                                                                        <div className="font-bold">
                                                                            {mappedComment.year} {mappedComment.make} {mappedComment.model}
                                                                        </div>{" "}
                                                                        <div className="w-[1.5px] h-[22px] bg-black dark:bg-white"></div> {mappedComment.username}
                                                                    </h3>
                                                                    <p className="text-sm text-black dark:text-white mb-3 line-clamp-4 max-w-full">
                                                                        {mappedComment.comment}
                                                                    </p>
                                                                </div>
                                                                <div className="py-2 basis-[20%] flex-shrink-0 flex-grow-0 lg:text-right flex items-center">
                                                                    <Link
                                                                        to={mappedComment.auctionId ? `/${currentLang}/auction/${mappedComment.auctionId}` : '#'}
                                                                        className="flex items-center gap-1 lg:justify-end w-full text-black dark:text-white hover:text-gray-200 transition-colors cursor-pointer"
                                                                    >
                                                                        <span>See comment</span>
                                                                        <ChevronRight className="w-4 h-4 text-black dark:text-white" />
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {index < (commentsData?.items.length ?? 0) - 1 && (
                                                            <div className="w-full h-px bg-black dark:bg-white my-3"></div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                            <Pagination tab="comments" totalItems={commentsData?.totalCount || 0} />
                                        </>
                                    )}
                                </div>
                            )}

                            {activeTab === "past-listings" && (
                                <div className="space-y-3">
                                    {isEndedAuctionsLoading ? (
                                        <p className="text-black dark:text-white">Loading...</p>
                                    ) : endedAuctionsError ? (
                                        <p className="text-red-400">Error loading completed auctions</p>
                                    ) : endedAuctionsData?.items.length === 0 ? (
                                        <p className="text-black dark:text-white">No data available</p>
                                    ) : (
                                        <>
                                            {endedAuctionsData?.items.map((auction, index) => {
                                                const mappedAuction = mapAuctionToListing(auction);
                                                return (
                                                    <div key={auction.id}>
                                                        <div className="flex flex-col lg:flex-row gap-6 p-2">
                                                            <img
                                                                src={mappedAuction.image}
                                                                alt={`${mappedAuction.year} ${mappedAuction.make} ${mappedAuction.model}`}
                                                                className="w-full lg:w-[190px] h-32 object-cover rounded-md flex-shrink-0"
                                                            />
                                                            <div className="flex-1 flex flex-col lg:flex-row justify-between gap-[4.92%]">
                                                                <div className="py-2 lg:basis-[37.63%] lg:max-w-[37.63%] flex-shrink-0 flex-grow-0">
                                                                    <h3 className="text-lg font-bold text-black dark:text-white mb-3">
                                                                        {mappedAuction.year} {mappedAuction.make} {mappedAuction.model}
                                                                    </h3>
                                                                    <p className="text-sm text-black dark:text-white mb-3 line-clamp-2 max-w-full">
                                                                        {mappedAuction.description}
                                                                    </p>
                                                                </div>
                                                                <div className="py-2 basis-[21.28%] flex-shrink-0 flex-grow-0">
                                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                                        <span className="px-3 py-2 dark:bg-[#2C2C2C] bg-[#D3D3D3] border border-[#2F2F2F] dark:border-[#D0D0D0] rounded-lg text-xs text-black dark:text-white">
                                                                            {mappedAuction.fuelType}
                                                                        </span>
                                                                        <span className="px-3 py-2 dark:bg-[#2C2C2C] bg-[#D3D3D3] border border-[#2F2F2F] dark:border-[#D0D0D0] rounded-lg text-xs text-black dark:text-white">
                                                                            {mappedAuction.transmission}
                                                                        </span>
                                                                        <span className="px-3 py-2 dark:bg-[#2C2C2C] bg-[#D3D3D3] border border-[#2F2F2F] dark:border-[#D0D0D0] rounded-lg text-xs text-black dark:text-white">
                                                                            {mappedAuction.mileage}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex flex-wrap gap-2">
                                                                        {mappedAuction.tags.map((tag, tagIndex) => (
                                                                            <span
                                                                                key={tagIndex}
                                                                                className={`px-2 py-1 rounded-lg text-xs font-bold ${mappedAuction.tagColors[tagIndex]}`}
                                                                            >
                                                                                {tag}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                                <div className="py-2 basis-[31.25%] flex-shrink-0 flex-grow-0 lg:text-right flex flex-col h-full">
                                                                    <div className="space-y-6 flex flex-col flex-grow">
                                                                        <div className="flex flex-row justify-between items-center">
                                                                            <span className="text-black dark:text-white font-bold">Sold for</span>
                                                                            <div className="flex items-center justify-end w-[40%]">
                                                                                <span className="text-black dark:text-white font-bold text-right">{mappedAuction.soldFor}</span>
                                                                            </div>
                                                                        </div>
                                                                        <Link
                                                                            to={auction.id ? `/${currentLang}/auction/${auction.id}` : '#'}
                                                                            className="flex items-center gap-1 lg:justify-end mt-auto text-black dark:text-white hover:text-gray-200 transition-colors cursor-pointer"
                                                                        >
                                                                            <span>See details</span>
                                                                            <ChevronRight className="w-4 h-4 text-black dark:text-white" />
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {index < (endedAuctionsData?.items.length ?? 0) - 1 && (
                                                            <div className="w-full h-px bg-black dark:bg-white my-3"></div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                            <Pagination tab="past-listings" totalItems={endedAuctionsData?.totalCount || 0} />
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}