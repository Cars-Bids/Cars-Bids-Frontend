import { useState, useRef } from "react";
import { EditBioModal, CropPhotoModal } from "@/components/Main/Modal";
import { useGetProfileQuery } from "@/features/api/endpoints/Profile";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
const carListings = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80",
    year: "1991",
    make: "Nissan",
    model: "Skyline GT-R",
    price: "$85,000",
    status: "ENDED",
    endDate: "Aug 15, 2025",
    description:
      "Extremely Modified Garage Queen. Dyno Verified. Capable 4 Speed Sequential Race",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80",
    year: "2022",
    make: "Porsche",
    model: "911 Turbo S",
    price: "$315,000",
    status: "ENDED",
    endDate: "Aug 18, 2025",
    description:
      "White Interior, Unmodified, and well maintained. No accidents",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80",
    year: "2013",
    make: "Porsche",
    model: "Panamera S",
    price: "$85,000",
    status: "ENDED",
    endDate: "Aug 20, 2025",
    description: "2 Owners V8 Porsche Vehicle Fully Serviced, California Owned",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80",
    year: "1999",
    make: "BMW",
    model: "Z3 M Roadster",
    price: "$52,500",
    status: "ENDED",
    endDate: "Aug 18, 2025",
    description: "6 Speed Manual. 3.2L Engine. Unmodified",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80",
    year: "2008",
    make: "Cadillac",
    model: "Escalade EXT",
    price: "$85,000",
    status: "ENDED",
    endDate: "Aug 16, 2025",
    description:
      "US Spec AWD Escalade Service Completed. Unmodified. California Owned",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80",
    year: "2009",
    make: "Mini",
    model: "Cooper S",
    price: "$18,000",
    status: "ENDED",
    endDate: "Aug 18, 2025",
    description:
      "6 Speed Manual. Stock Suspension. Factory Owner. Mostly Unmodified",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80",
    year: "1964",
    make: "Ford",
    model: "Galaxie 500 Convertible",
    price: "$46,000",
    status: "ENDED",
    endDate: "Aug 18, 2025",
    description: "California Blue Plates. Rare Vintage. Maintenance Updates",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80",
    year: "2021",
    make: "Porsche",
    model: "718 Boxster",
    price: "$89,000",
    status: "ENDED",
    endDate: "Aug 15, 2025",
    description:
      "6600 Miles. 6 Speed Manual. 350 hp. Pristine Final & Unmodified",
  },
];

const comments = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80",
    title: "1991 Nissan Skyline GT-R",
    date: "Jul 19, 2023 7:52 PM",
    comment:
      "Do you have a picture of what not exactly have access to some sections. Wasn't able to view some areas.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80",
    title: "2015 Jaguar F-Type R Coupe",
    date: "Jul 19, 2023 7:52 PM",
    comment:
      "Do you have a picture of what not exactly have access to some sections. Wasn't able to view some areas.",
  },
];

export default function Profile() {
  const [showEditModal, setShowEditModal] = useState(false);

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuth);
  const { data: profile } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(
    profile?.profilePictureUrl ||
      `https://ui-avatars.com/api/?name=${profile?.username}?background=random
`
  );
    const [bio, setBio] = useState(profile?.bio || "") ;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setIsCropModalOpen(true);
    } else {
      alert("Please select a valid image file (e.g., PNG, JPEG).");
    }
  };

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveCroppedImage = (data: {
    imageUrl: string;
    coordinates: { left: number; top: number; width: number; height: number };
  }) => {
    // Use cropperRef.current.getCanvas() in CropPhotoModal to get the cropped image
    setProfileImage(data.imageUrl);
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage); // Clean up temporary URL
      setSelectedImage(null);
    }
    setIsCropModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-steria-dark text-white">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />
      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto py-8">
        {/* Left Sidebar and Main Content */}
        <div className="flex flex-col lg:flex-row">
          {/* Left Sidebar */}
          <div className="flex-shrink-0 p-2 w-full lg:w-auto">
            <div className="bg-[#212121] rounded-xl p-3 lg:max-w-[200px]">
              <nav
                className="
                                    grid grid-cols-2 gap-2
                                    sm:grid-cols-4
                                    lg:flex lg:flex-col lg:space-y-2
                                "
              >
                <a
                  href="#"
                  className="block text-center lg:text-start py-1 text-white bg-steria-dark-card rounded-lg"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block text-center lg:text-start py-1 text-gray-300 hover:text-white hover:bg-steria-dark-card rounded-lg transition-colors"
                >
                  Seller dashboard
                </a>
                <a
                  href="#"
                  className="block text-center lg:text-start py-1 text-gray-300 hover:text-white hover:bg-steria-dark-card rounded-lg transition-colors"
                >
                  Watchlist
                </a>
                <a
                  href="#"
                  className="block text-center lg:text-start py-1 text-gray-300 hover:text-white hover:bg-steria-dark-card rounded-lg transition-colors"
                >
                  Settings
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 max-w-[1072px]">
            {/* Profile Section */}
            <div className="bg-steria-dark-card rounded-xl p-3">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col min-[900px]:flex-row items-center min-[900px]:justify-center min-[1280px]:items-stretch gap-6 w-full">
                  {/* Фото профілю */}
                  <div
                    className="relative w-[200px] h-[200px] rounded-[85px] overflow-hidden group cursor-pointer mx-auto"
                    onClick={handleProfileImageClick}
                  >
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute group-hover:bg-black/50 inset-0 bg-opacity-0 group-hover:bg-opacity-40 transition-all z-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      <svg
                        width="72"
                        height="72"
                        viewBox="0 0 72 72"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M43.5 12H28.5L21 21H12C10.4087 21 8.88258 21.6321 7.75736 22.7574C6.63214 23.8826 6 25.4087 6 27V54C6 55.5913 6.63214 57.1174 7.75736 58.2426C8.88258 59.3679 10.4087 60 12 60H60C61.5913 60 63.1174 59.3679 64.2426 58.2426C65.3679 57.1174 66 55.5913 66 54V27C66 25.4087 65.3679 23.8826 64.2426 22.7574C63.1174 21.6321 61.5913 21 60 21H51L43.5 12Z"
                          stroke="white"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M36 48C40.9706 48 45 43.9706 45 39C45 34.0294 40.9706 30 36 30C31.0294 30 27 34.0294 27 39C27 43.9706 31.0294 48 36 48Z"
                          stroke="white"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Права частина профілю */}
                  <div className="flex-1 flex flex-col gap-4 w-full items-center min-[900px]:items-start">
                    <h1 className="text-2xl font-bold text-white text-center min-[900px]:text-left">
                      {profile?.username}
                    </h1>
                    <div className="flex flex-wrap gap-2 mt-1 justify-center min-[900px]:justify-start">
                      <div className="flex items-center gap-2 shrink-0">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.5 5.41L11.5 17.41L6 11.91L7.41 10.5L11.5 14.58L22.09 4L23.5 5.41Z"
                            fill="white"
                          />
                          <path
                            d="M8.15115 2.29377C8.40754 1.86238 8.94488 1.68769 9.40603 1.88557L11.6052 2.83088C11.8256 2.92545 12.0719 2.93699 12.2986 2.86604L12.3943 2.83088L14.5935 1.88557C15.0547 1.68755 15.5919 1.86245 15.8484 2.29377L17.0701 4.35041C17.3289 4.78586 18.1114 5.11142 18.5 5.5L17.0701 6.73882C17.0701 6.73882 16 6.5 15.3513 5.37287L14.576 4.06916L13.1834 4.6678C12.4276 4.99227 11.5719 4.99231 10.8162 4.6678L9.42263 4.06916L8.64919 5.37092C8.2276 6.08026 7.53244 6.58474 6.72732 6.76545L5.25271 7.09553L5.39138 8.59846C5.467 9.41693 5.20394 10.2307 4.66286 10.8494L3.65798 11.9969L4.65896 13.1375C5.20217 13.7564 5.46783 14.5714 5.39236 15.3914L5.25173 16.9071L6.73415 17.244C7.48586 17.4147 8.14095 17.8684 8.56619 18.5067L8.64822 18.6375L9.4197 19.9354L10.8103 19.3348C11.5203 19.0278 12.3199 19.0083 13.0418 19.2752L13.1853 19.3319L14.5769 19.9295L15.3513 18.6268L15.4334 18.4969C15.8586 17.8585 16.5137 17.405 17.2654 17.2342L18.7468 16.8973L18.6082 15.3924C18.5324 14.5721 18.7972 13.7567 19.3406 13.1375L20.3386 11.9998L19.3406 10.8621L20.8435 9.5428L22.4207 11.3406C22.7518 11.718 22.7519 12.2826 22.4207 12.66L20.8435 14.4569C20.6626 14.6631 20.5743 14.9347 20.5994 15.2078L20.8191 17.5867C20.8653 18.0863 20.5339 18.543 20.0447 18.6541L17.7088 19.1844C17.4415 19.2452 17.2101 19.4136 17.0701 19.6492L15.8484 21.7059L15.7967 21.784C15.5429 22.1328 15.0918 22.2791 14.6814 22.1463L14.5935 22.1141L12.3953 21.1698C12.1427 21.0615 11.8565 21.0617 11.6043 21.1707L9.40701 22.1209L9.32009 22.1541C8.87966 22.298 8.39107 22.119 8.15017 21.7137L6.92947 19.659C6.80689 19.4529 6.61455 19.2985 6.38943 19.2225L6.29079 19.1951L3.95486 18.6639C3.46596 18.5527 3.13462 18.0968 3.18044 17.5975L3.40017 15.2078C3.42212 14.9687 3.35736 14.7308 3.21951 14.5369L3.15603 14.4569L1.5779 12.658C1.24736 12.2812 1.24692 11.718 1.57693 11.3406L3.15701 9.53303C3.31485 9.35254 3.4017 9.12214 3.40408 8.88459L3.40017 8.78303L3.18044 6.4051C3.13432 5.90468 3.46746 5.44784 3.95779 5.33772L6.28884 4.81428C6.52374 4.76158 6.73064 4.62587 6.87283 4.4344L6.93044 4.34944L8.15115 2.29377Z"
                            fill="white"
                          />
                        </svg>
                        <p className="text-[15px] text-white">
                          Registered Bidder
                        </p>
                      </div>

                      <span className="ml-3 inline-block whitespace-nowrap">
                        Joined{" "}
                        {profile?.createdAt
                          ? new Date(profile.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                              }
                            )
                          : null}
                      </span>
                    </div>

                    <p className="text-white mt-2 max-w-[600px] max-[900px]:w-full break-words text-center min-[900px]:text-left">
                      {bio}
                    </p>
                    <div className="flex items-center gap-6 mt-4 max-h-[24px] justify-center min-[900px]:justify-start">
                      <div className="flex items-center gap-2">
                        <div className="text-[17px] font-bold text-white">
                          0
                        </div>
                        <div className="text-sm text-gray-400">Followers</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-[17px] font-bold text-white">
                          0
                        </div>
                        <div className="text-sm text-gray-400">Following</div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden xl:flex flex-[0.15] flex-col">
                    <div className="flex justify-end items-center gap-2">
                      <span className="text-white font-medium">Share</span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 12L14 5V9C7 10 4 15 3 20C5.5 16.5 9 14.9 14 14.9V19L21 12Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="flex-grow"></div>
                    <div className="flex flex-col justify-end">
                      <button
                        onClick={() => setShowEditModal(true)}
                        className="flex items-center justify-end gap-2 py-2 text-white bg-transparent hover:text-gray-200 transition-colors mb-2"
                      >
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 2.5H3.16667C2.72464 2.5 2.30072 2.67559 1.98816 2.98816C1.67559 3.30072 1.5 3.72464 1.5 4.16667V15.8333C1.5 16.2754 1.67559 16.6993 1.98816 17.0118C2.30072 17.3244 2.72464 17.5 3.16667 17.5H14.8333C15.2754 17.5 15.6993 17.3244 16.0118 17.0118C16.3244 16.6993 16.5 15.8333V10"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14.3125 2.18751C14.644 1.85599 15.0937 1.66974 15.5625 1.66974C16.0313 1.66974 16.481 1.85599 16.8125 2.18751C17.144 2.51903 17.3303 2.96866 17.3303 3.43751C17.3303 3.90635 17.144 4.35599 16.8125 4.68751L9.30166 12.1992C9.10379 12.3969 8.85933 12.5416 8.59083 12.62L6.19666 13.32C6.12496 13.3409 6.04895 13.3422 5.97659 13.3236C5.90423 13.3051 5.83819 13.2675 5.78537 13.2146C5.73255 13.1618 5.6949 13.0958 5.67637 13.0234C5.65783 12.9511 5.65908 12.875 5.68 12.8033L6.38 10.4092C6.45877 10.1409 6.60378 9.89672 6.80166 9.69917L14.3125 2.18751Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Edit bio
                      </button>
                      <button className="py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-center">
                        Follow
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex xl:hidden w-full flex-row justify-center gap-4">
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 text-white bg-transparent hover:text-gray-200 transition-colors">
                    <span className="text-white font-medium">Share</span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21 12L14 5V9C7 10 4 15 3 20C5.5 16.5 9 14.9 14 14.9V19L21 12Z"
                        fill="white"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-white bg-transparent hover:text-gray-200 transition-colors"
                  >
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 2.5H3.16667C2.72464 2.5 2.30072 2.67559 1.98816 2.98816C1.67559 3.30072 1.5 3.72464 1.5 4.16667V15.8333C1.5 16.2754 1.67559 16.6993 1.98816 17.0118C2.30072 17.3244 2.72464 17.5 3.16667 17.5H14.8333C15.2754 17.5 15.6993 17.3244 16.0118 17.0118C16.3244 16.6993 16.5 15.8333V10"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.3125 2.18751C14.644 1.85599 15.0937 1.66974 15.5625 1.66974C16.0313 1.66974 16.481 1.85599 16.8125 2.18751C17.144 2.51903 17.3303 2.96866 17.3303 3.43751C17.3303 3.90635 17.144 4.35599 16.8125 4.68751L9.30166 12.1992C9.10379 12.3969 8.85933 12.5416 8.59083 12.62L6.19666 13.32C6.12496 13.3409 6.04895 13.3422 5.97659 13.3236C5.90423 13.3051 5.83819 13.2675 5.78537 13.2146C5.73255 13.1618 5.6949 13.0958 5.67637 13.0234C5.65783 12.9511 5.65908 12.875 5.68 12.8033L6.38 10.4092C6.45877 10.1409 6.60378 9.89672 6.80166 9.69917L14.3125 2.18751Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Edit bio
                  </button>
                  <button className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-center">
                    Follow
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full h-[2px] bg-red-500 mb-6"></div>

            {/* Bid History Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[22px] font-bold text-white">
                  Bid History
                  <span className="ml-[5px] text-gray-400 font-normal text-[15px] inline-block whitespace-normal">
                    (Bids of 1 lot, 2 wins)
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {carListings.map((car) => (
                  <div
                    key={car.id}
                    className="bg-steria-dark-card rounded-xl overflow-hidden hover:bg-opacity-80 transition-all duration-200 border-1 border-custom-[#d0d0d0]"
                  >
                    <div className="relative">
                      <img
                        src={car.image}
                        alt={`${car.year} ${car.make} ${car.model}`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute bottom-3 px-4">
                        <div className="bg-[#2c2c2c] rounded-md outline-1 outline-offset-[-1px] outline-[#d0d0d0] inline-flex justify-start items-center overflow-hidden">
                          <div className="pl-2.5 pr-1.5 py-1.5 flex justify-center items-center gap-2">
                            <div className="justify-start text-white text-[10px] font-medium font-['Amulya_Variable'] leading-[10px]">
                              1 bid to
                            </div>
                          </div>
                          <div className="pl-1.5 pr-2.5 py-1.5 border-l border-white flex justify-start items-center gap-2">
                            <div className="justify-start text-white text-[10px] font-medium font-['Amulya_Variable'] leading-[10px]">
                              {car.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-white text-lg">
                        {car.year} {car.make} {car.model}
                      </h3>
                      <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                        {car.description}
                      </p>
                      <p className="text-gray-500 text-xs mt-3">
                        {car.endDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                  Show more
                </button>
              </div>
            </div>

            <div className="w-full h-[2px] bg-red-500 mb-6"></div>

            {/* Auction Comments Section */}
            <div className="mb-8">
              <h2 className="text-[22px] font-bold text-white">
                Auction Comments
                <span className="ml-[5px] text-gray-400 font-normal text-[15px] inline-block whitespace-normal">
                  (2 comments)
                </span>
              </h2>
              <div className="grid grid-cols-1 min-[518px]:grid-cols-2 gap-6">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex flex-col lg:flex-row gap-4 w-full max-w-[518px] overflow-hidden py-3"
                  >
                    <div className="w-full lg:w-[239px] h-[159px] flex-shrink-0 relative">
                      <img
                        src={comment.image}
                        alt={comment.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/0"></div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between mt-3 lg:mt-0">
                      <h3 className="text-white text-lg font-bold leading-tight">
                        {comment.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {comment.date}
                      </p>
                      <p className="text-gray-300 text-sm mt-3">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <EditBioModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          initialValue={bio}
          onSave={(newBio) => setBio(newBio)}
        />
        <CropPhotoModal
          isOpen={isCropModalOpen}
          onClose={() => {
            if (selectedImage) {
              URL.revokeObjectURL(selectedImage); // Clean up temporary URL
              setSelectedImage(null);
            }
            setIsCropModalOpen(false);
          }}
          initialImage={selectedImage || profileImage}
          onSave={handleSaveCroppedImage}
        />
      </div>
    </div>
  );
}
