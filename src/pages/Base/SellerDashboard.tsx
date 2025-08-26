import { useState } from "react";
import { Wrench, Car, MessageCircle, Clock, ChevronRight, Clock as ClockIcon, CircleDollarSign } from "lucide-react";
import Sidebar from "@/components/Main/SidebarProfile";

const carListingsInProgress = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
        year: "2022",
        make: "Porsche",
        model: "911 Turbo S Coupe",
        description: "580-hp Twin-Turbo Flat-6, Bordeaux White Interior, Unmodified",
        fuelType: "Gasoline",
        transmission: "Automatic",
        mileage: "30 000 km",
        status: "Will be published on ...",
        statusColor: "text-white",
        statusMessage: "Additional information is still needed.",
        tags: ["Inspected", "No Reserve"],
        tagColors: ["bg-white text-[#121212]", "bg-[#5CA1FF] text-white"],
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
        year: "1999",
        make: "BMW",
        model: "Z3 M Roadster",
        description: "23,700 Miles, 5-Speed Manual, Evergreen, Unmodified",
        fuelType: "Gasoline",
        transmission: "Manual",
        mileage: "23 700 km",
        status: "Will be published on 16.08",
        statusColor: "text-white",
        statusMessage: "No additional information needed",
        messageColor: "text-[#C3F73A]",
        tags: ["Inspected"],
        tagColors: ["bg-white text-[#121212]"],
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
        year: "2009",
        make: "Mini",
        model: "Cooper S",
        description: "6-Speed Manual, Turbo 4-Cylinder, Florida-Owned, Mostly Unmodified",
        fuelType: "Gasoline",
        transmission: "Manual",
        mileage: "94 500 km",
        status: "Will be published on 16.08",
        statusColor: "text-white",
        statusMessage: "No additional information needed",
        messageColor: "text-[#C3F73A]",
        tags: ["Inspected"],
        tagColors: ["bg-white text-[#121212]"],
    },
];

const liveAuctions = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
        year: "2022",
        make: "Rivian",
        model: "R1T Launch Edition",
        description: "Quad-Motor AWD, Large Battery Pack, Off-Road Upgrade",
        fuelType: "Electro",
        transmission: "Automatic",
        mileage: "30 000 km",
        timeLeft: "168:00:00",
        currentBid: "$557,000",
        tags: ["Inspected", "No Reserve"],
        tagColors: ["bg-white text-[#121212]", "bg-[#5CA1FF] text-white"],
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
        year: "2008",
        make: "Cadillac",
        model: "Escalade EXT",
        description: "6.2-Liter V8, AWD, Recent Service, California-Owned",
        fuelType: "Gasoline",
        transmission: "Automatic",
        mileage: "158 700 km",
        timeLeft: "32:16:43",
        currentBid: "$2,200",
        tags: ["No Reserve"],
        tagColors: ["bg-[#5CA1FF] text-white"],
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
        year: "2021",
        make: "Porsche",
        model: "718 Boxster",
        description: "6,400 Miles, 6-Speed Manual, 300-hp Turbo Flat-4, Unmodified",
        fuelType: "Gasoline",
        transmission: "Manual",
        mileage: "6 400 km",
        timeLeft: "29:03:48",
        currentBid: "$28,000",
        tags: [],
        tagColors: [],
    },
];

const comments = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
        year: "2022",
        make: "Rivian",
        model: "R1T Launch Edition",
        username: "Teledatageek",
        comment: "I mean almost $55K with buyers premium. Given the mileage and year - seems like that would have been a fair price given listings that are out there right now on various sites. I paid a premium for Compass Yellow (but unusual color...) and would have paid a premium for Launch Green (and the green interior).",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
        year: "2022",
        make: "Rivian",
        model: "R1T Launch Edition",
        username: "supermoo",
        comment: "Wow, $52k and not met. Seller needs to look at the market.",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
        year: "2022",
        make: "Rivian",
        model: "R1T Launch Edition",
        username: "rayid",
        comment: "Coming up to the last hour of the bidding! Just to reiterate, this will be an amazing value for whoever that ends up owning it as the Gen 2 Quad is priced at over 120K with minor improvements! These are hella fun to drive! And just so happens, Rivian just released a new software update which will utilize Google Maps as the navigation system for all R1 models, so they continue getting better with time!",
    },
];

const pastListings = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
        year: "1977",
        make: "Nissan",
        model: "Fairlady Z",
        description: "Japanese-Market Z, 2.8-Liter L28 6-Cylinder Swap, 5-Speed Manual, U.S. Title",
        fuelType: "Gasoline",
        transmission: "Manual",
        mileage: "62 000 km",
        soldFor: "$8,370",
        tags: ["Inspected"],
        tagColors: ["bg-white text-[#121212]"],
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
        year: "2006",
        make: "Audi",
        model: "S4 Avant",
        description: "6-Speed Manual, 340-hp V8, AWD, Mostly Unmodified",
        fuelType: "Diesel",
        transmission: "Manual",
        mileage: "30 000 km",
        soldFor: "$60,370",
        tags: ["No Reserve"],
        tagColors: ["bg-[#5CA1FF] text-white"],
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80",
        year: "2020",
        make: "Porsche",
        model: "Macan S",
        description: "348-hp Turbo V6, Premium Package Plus, California-Owned",
        fuelType: "Gasoline",
        transmission: "Automatic",
        mileage: "45 500 km",
        soldFor: "$21,750",
        tags: ["Inspected", "No Reserve"],
        tagColors: ["bg-white text-[#121212]", "bg-[#5CA1FF] text-white"],
    },
];

export default function SellerDashboard() {
    const [activeTab, setActiveTab] = useState("in-progress");

    return (
        <div className="min-h-screen bg-steria-dark text-white">
            <div className="max-w-[1440px] mx-auto py-8">
                <div className="flex flex-col lg:flex-row">
                    <Sidebar />
                    <div className="flex-1 max-w-[1072px]">
                        <div className="bg-steria-dark-card rounded-xl p-3">
                            <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                                <div
                                    className={`flex flex-col items-center p-4 rounded-xl bg-[#212121] cursor-pointer transition-all ${activeTab === "in-progress" ? "border-2 border-[#D0D0D0]" : ""}`}
                                    onClick={() => setActiveTab("in-progress")}
                                >
                                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.8333 3.72168V7.42501C31.8816 8.41501 37.5833 15.73 36.5933 23.7783C35.75 30.4517 30.5066 35.75 23.8333 36.5383V40.205C33.9166 39.1967 41.25 30.25 40.2416 20.1667C39.4166 11.4583 32.505 4.58335 23.8333 3.72168ZM20.1666 3.77668C16.5916 4.12501 13.1816 5.50001 10.395 7.81001L13.0166 10.5233C15.07 8.87335 17.545 7.81001 20.1666 7.44335V3.77668ZM7.80997 10.395C5.51911 13.1777 4.10864 16.5794 3.7583 20.1667H7.42497C7.7733 17.5633 8.79997 15.0883 10.4316 13.0167L7.80997 10.395ZM3.77663 23.8333C4.1433 27.4267 5.55497 30.8183 7.8283 33.605L10.4316 30.9833C8.81251 28.911 7.78037 26.4415 7.4433 23.8333H3.77663ZM13.0166 33.6783L10.395 36.19C13.1724 38.5044 16.5721 39.9459 20.1666 40.3333V36.6667C17.5585 36.3296 15.0889 35.2975 13.0166 33.6783ZM30.8366 27.8483L23.3016 20.3133C24.0533 18.4067 23.6316 16.17 22.055 14.6117C20.405 12.9433 17.93 12.6133 15.9316 13.53L19.4883 17.0867L17.0133 19.58L13.365 16.005C12.375 18.0033 12.8333 20.4783 14.4466 22.1467C16.0233 23.7233 18.26 24.1267 20.1666 23.3933L27.7016 30.91C28.0316 31.2583 28.5266 31.2583 28.8566 30.91L30.7633 29.0217C31.1666 28.6917 31.1666 28.105 30.8366 27.8483Z" fill="white" />
                                    </svg>
                                    <span className="text-white text-sm">In Progress</span>
                                </div>
                                <div
                                    className={`flex flex-col items-center p-4 rounded-xl bg-[#212121] cursor-pointer transition-all ${activeTab === "live-auctions" ? "border-2 border-[#D0D0D0]" : ""}`}
                                    onClick={() => setActiveTab("live-auctions")}
                                >
                                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M34.8332 31.1667H38.4998C39.5998 31.1667 40.3332 30.4333 40.3332 29.3333V23.8333C40.3332 22.1833 39.0498 20.7167 37.5832 20.35C34.2832 19.4333 29.3332 18.3333 29.3332 18.3333C29.3332 18.3333 26.9498 15.7667 25.2998 14.1167C24.3832 13.3833 23.2832 12.8333 21.9998 12.8333H9.1665C8.0665 12.8333 7.14984 13.5667 6.59984 14.4833L4.03317 19.8C3.7904 20.5081 3.6665 21.2515 3.6665 22V29.3333C3.6665 30.4333 4.39984 31.1667 5.49984 31.1667H9.1665" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.8332 34.8333C14.8582 34.8333 16.4998 33.1917 16.4998 31.1667C16.4998 29.1416 14.8582 27.5 12.8332 27.5C10.8081 27.5 9.1665 29.1416 9.1665 31.1667C9.1665 33.1917 10.8081 34.8333 12.8332 34.8333Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M16.5 31.1667H27.5" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M31.1667 34.8333C33.1917 34.8333 34.8333 33.1917 34.8333 31.1667C34.8333 29.1416 33.1917 27.5 31.1667 27.5C29.1416 27.5 27.5 29.1416 27.5 31.1667C27.5 33.1917 29.1416 34.8333 31.1667 34.8333Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    <span className="text-white text-sm">Live Auctions</span>
                                </div>
                                <div
                                    className={`flex flex-col items-center p-4 rounded-xl bg-[#212121] cursor-pointer transition-all ${activeTab === "comments" ? "border-2 border-[#D0D0D0]" : ""}`}
                                    onClick={() => setActiveTab("comments")}
                                >
                                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16.5003 40.3333C16.0141 40.3333 15.5478 40.1402 15.204 39.7964C14.8601 39.4525 14.667 38.9862 14.667 38.5V33H7.33366C6.3612 33 5.42857 32.6137 4.74093 31.926C4.0533 31.2384 3.66699 30.3058 3.66699 29.3333V7.33332C3.66699 6.36086 4.0533 5.42823 4.74093 4.7406C5.42857 4.05296 6.3612 3.66666 7.33366 3.66666H36.667C37.6395 3.66666 38.5721 4.05296 39.2597 4.7406C39.9473 5.42823 40.3337 6.36086 40.3337 7.33332V29.3333C40.3337 30.3058 39.9473 31.2384 39.2597 31.926C38.5721 32.6137 37.6395 33 36.667 33H25.4837L18.7003 39.8017C18.3337 40.15 17.8753 40.3333 17.417 40.3333H16.5003ZM18.3337 29.3333V34.98L23.9803 29.3333H36.667V7.33332H7.33366V29.3333H18.3337Z" fill="white" />
                                    </svg>
                                    <span className="text-white text-sm">Comments</span>
                                </div>
                                <div
                                    className={`flex flex-col items-center p-4 rounded-xl bg-[#212121] cursor-pointer transition-all ${activeTab === "past-listings" ? "border-2 border-[#D0D0D0]" : ""}`}
                                    onClick={() => setActiveTab("past-listings")}
                                >
                                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M33 40.3333H11V29.3333L18.3333 22L11 14.6667V3.66666H33V14.6667L25.6667 22L33 29.3333M14.6667 13.75L22 21.0833L29.3333 13.75V7.33332H14.6667M22 22.9167L14.6667 30.25V36.6667H29.3333V30.25M25.6667 33H18.3333V31.5333L22 27.8667L25.6667 31.5333V33Z" fill="white" />
                                    </svg>
                                    <span className="text-white text-sm">Past Listings</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-steria-dark-card rounded-xl mx-3 p-3 bg-[#212121]">
                            {activeTab === "in-progress" && (
                                <div className="space-y-3">
                                    {carListingsInProgress.map((car, index) => (
                                        <div key={car.id}>
                                            <div className="flex flex-col lg:flex-row gap-6 p-2">
                                                <img
                                                    src={car.image}
                                                    alt={`${car.year} ${car.make} ${car.model}`}
                                                    className="w-full lg:w-[190px] h-32 object-cover rounded-md flex-shrink-0"
                                                />
                                                <div className="flex-1 flex flex-col lg:flex-row justify-between gap-[4.92%]">
                                                    <div className="py-2 lg:basis-[37.63%] lg:max-w-[37.63%] flex-shrink-0 flex-grow-0">
                                                        <h3 className="text-lg font-bold text-white mb-3">
                                                            {car.year} {car.make} {car.model}
                                                        </h3>
                                                        <p className="text-sm text-white mb-3 line-clamp-2 max-w-full">
                                                            {car.description}
                                                        </p>
                                                    </div>
                                                    <div className="py-2 basis-[21.28%] flex-shrink-0 flex-grow-0">
                                                        <div className="flex flex-wrap gap-2 mb-3">
                                                            <span className="px-3 py-2 bg-[#2C2C2C] border border-[#D0D0D0] rounded-lg text-xs text-white">
                                                                {car.fuelType}
                                                            </span>
                                                            <span className="px-3 py-2 bg-[#2C2C2C] border border-[#D0D0D0] rounded-lg text-xs text-white">
                                                                {car.transmission}
                                                            </span>
                                                            <span className="px-3 py-2 bg-[#2C2C2C] border border-[#D0D0D0] rounded-lg text-xs text-white">
                                                                {car.mileage}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2 flex-shrink-0 flex-grow-0">
                                                            {car.tags.map((tag, tagIndex) => (
                                                                <span
                                                                    key={tagIndex}
                                                                    className={`px-2 py-1 rounded-lg text-xs font-bold ${car.tagColors[tagIndex]}`}
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="py-2 basis-[31.25%] flex-shrink-0 flex-grow-0 lg:text-right">
                                                        <h4 className={`text-lg font-bold mb-3 ${car.statusColor}`}>
                                                            {car.status}
                                                        </h4>
                                                        <p className={`text-sm mb-6 ${car.messageColor || "text-red-400"}`}>
                                                            {car.statusMessage}
                                                        </p>
                                                        <div className="flex items-center gap-1 lg:justify-end">
                                                            <span className="text-white">See details</span>
                                                            <ChevronRight className="w-4 h-4 text-white" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {index < carListingsInProgress.length - 1 && (
                                                <div className="w-full h-px bg-white my-3"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === "live-auctions" && (
                                <div className="space-y-3">
                                    {liveAuctions.map((car, index) => (
                                        <div key={car.id}>
                                            <div className="flex flex-col lg:flex-row gap-6 p-2">
                                                <img
                                                    src={car.image}
                                                    alt={`${car.year} ${car.make} ${car.model}`}
                                                    className="w-full lg:w-[190px] h-32 object-cover rounded-md flex-shrink-0"
                                                />
                                                <div className="flex-1 flex flex-col lg:flex-row justify-between gap-[4.92%]">
                                                    <div className="py-2 lg:basis-[37.63%] flex-shrink-0 flex-grow-0 lg:max-w-[37.63%]">
                                                        <h3 className="text-lg font-bold text-white mb-3">
                                                            {car.year} {car.make} ${car.model}
                                                        </h3>
                                                        <p className="text-sm text-white mb-3 line-clamp-2 max-w-full">
                                                            {car.description}
                                                        </p>
                                                    </div>
                                                    <div className="py-2 basis-[21.28%] flex-shrink-0 flex-grow-0">
                                                        <div className="flex flex-wrap gap-2 mb-3">
                                                            <span className="px-3 py-2 bg-[#2C2C2C] border border-[#D0D0D0] rounded-lg text-xs text-white">
                                                                {car.fuelType}
                                                            </span>
                                                            <span className="px-3 py-2 bg-[#2C2C2C] border border-[#D0D0D0] rounded-lg text-xs text-white">
                                                                {car.transmission}
                                                            </span>
                                                            <span className="px-3 py-2 bg-[#2C2C2C] border border-[#D0D0D0] rounded-lg text-xs text-white">
                                                                {car.mileage}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {car.tags.map((tag, tagIndex) => (
                                                                <span
                                                                    key={tagIndex}
                                                                    className={`px-2 py-1 rounded-lg text-xs font-bold ${car.tagColors[tagIndex]}`}
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="py-2 basis-[31.25%] flex-shrink-0 flex-grow-0 lg:text-right">
                                                        <div className="space-y-6">
                                                            <div className="flex flex-row justify-between items-center">
                                                                <span className="text-white font-bold">Time left</span>
                                                                <div className="flex items-center justify-end min-[1300px]:justify-between w-[40%]">
                                                                    <ClockIcon className="hidden min-[1300px]:block w-5 h-5 text-[#EF2929]" />
                                                                    <span className="text-white font-bold text-right">{car.timeLeft}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-row justify-between items-center">
                                                                <span className="text-white font-bold">Current bid</span>
                                                                <div className="flex items-center justify-end min-[1300px]:justify-between w-[40%]">
                                                                    <CircleDollarSign className="hidden min-[1300px]:block w-5 h-5 text-[#C3F73A]" />
                                                                    <span className="text-white font-bold">{car.currentBid}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-1 lg:justify-end">
                                                                <span className="text-white">See details</span>
                                                                <ChevronRight className="w-4 h-4 text-white" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {index < liveAuctions.length - 1 && (
                                                <div className="w-full h-px bg-white my-3"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === "comments" && (
                                <div className="space-y-3">
                                    {comments.map((comment, index) => (
                                        <div key={comment.id}>
                                            <div className="flex flex-col lg:flex-row gap-6 p-2">
                                                <img
                                                    src={comment.image}
                                                    alt={`${comment.year} ${comment.make} ${comment.model}`}
                                                    className="w-full lg:w-[190px] h-32 object-cover rounded-md flex-shrink-0"
                                                />
                                                <div className="flex-1 flex flex-col lg:flex-row justify-between">
                                                    <div className="py-2 lg:basis-[80%] lg:max-w-[80%] flex-shrink-0 flex-grow-0">
                                                        <h3 className="text-lg text-white mb-3 w-full flex items-center gap-2">
                                                            <div className="font-bold">{comment.year} {comment.make} {comment.model}</div> <div className="w-[1.5px] h-[22px] bg-white"></div> {comment.username}
                                                        </h3>
                                                        <p className="text-sm text-white mb-3 line-clamp-4 max-w-full">
                                                            {comment.comment}
                                                        </p>
                                                    </div>
                                                    <div className="py-2 basis-[20%] flex-shrink-0 flex-grow-0 lg:text-right flex items-center">
                                                        <div className="flex items-center gap-1 lg:justify-end w-full">
                                                            <span className="text-white">See comment</span>
                                                            <ChevronRight className="w-4 h-4 text-white" />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            {index < comments.length - 1 && (
                                                <div className="w-full h-px bg-white my-3"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === "past-listings" && (
                                <div className="space-y-3">
                                    {pastListings.map((car, index) => (
                                        <div key={car.id}>
                                            <div className="flex flex-col lg:flex-row gap-6 p-2">
                                                <img
                                                    src={car.image}
                                                    alt={`${car.year} ${car.make} ${car.model}`}
                                                    className="w-full lg:w-[190px] h-32 object-cover rounded-md flex-shrink-0"
                                                />
                                                <div className="flex-1 flex flex-col lg:flex-row justify-between gap-[4.92%]">
                                                    <div className="py-2 lg:basis-[37.63%] lg:max-w-[37.63%] flex-shrink-0 flex-grow-0">
                                                        <h3 className="text-lg font-bold text-white mb-3">
                                                            {car.year} {car.make} {car.model}
                                                        </h3>
                                                        <p className="text-sm text-white mb-3 line-clamp-2 max-w-full">
                                                            {car.description}
                                                        </p>
                                                    </div>
                                                    <div className="py-2 basis-[21.28%] flex-shrink-0 flex-grow-0">
                                                        <div className="flex flex-wrap gap-2 mb-3">
                                                            <span className="px-3 py-2 bg-[#2C2C2C] border border-[#D0D0D0] rounded-lg text-xs text-white">
                                                                {car.fuelType}
                                                            </span>
                                                            <span className="px-3 py-2 bg-[#2C2C2C] border border-[#D0D0D0] rounded-lg text-xs text-white">
                                                                {car.transmission}
                                                            </span>
                                                            <span className="px-3 py-2 bg-[#2C2C2C] border border-[#D0D0D0] rounded-lg text-xs text-white">
                                                                {car.mileage}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {car.tags.map((tag, tagIndex) => (
                                                                <span
                                                                    key={tagIndex}
                                                                    className={`px-2 py-1 rounded-lg text-xs font-bold ${car.tagColors[tagIndex]}`}
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="py-2 basis-[31.25%] flex-shrink-0 flex-grow-0 lg:text-right flex flex-col h-full">
                                                        <div className="space-y-6 flex flex-col flex-grow">
                                                            <div className="flex flex-row justify-between items-center">
                                                                <span className="text-white font-bold">Sold for</span>
                                                                <div className="flex items-center justify-end w-[40%]">
                                                                    <span className="text-white font-bold text-right">{car.soldFor}</span>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-1 lg:justify-end mt-auto">
                                                                <span className="text-white">See details</span>
                                                                <ChevronRight className="w-4 h-4 text-white" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            {index < pastListings.length - 1 && (
                                                <div className="w-full h-px bg-white my-3"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}