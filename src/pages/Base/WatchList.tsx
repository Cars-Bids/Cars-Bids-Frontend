import Sidebar from "@/components/Main/SidebarProfile";

interface StatusTagProps {
  type: 'inspected' | 'no-reserve';
  text: string;
}

function StatusTag({ type, text }: StatusTagProps) {
  const bgColor = type === 'inspected' ? 'dark:bg-white bg-black' : 'bg-[#5CA1FF]';
  const textColor = type === 'inspected' ? 'dark:text-black text-white' : 'text-white';
  return (
    <div className={`inline-flex px-1.5 py-0.5 justify-center items-center gap-3 rounded-lg ${bgColor}`}>
      <div className={`${textColor} text-xs font-bold leading-[140%]`}>
        {text}
      </div>
    </div>
  );
}

interface AuctionCarCardProps {
  carName: string;
  carDescription: string;
  carImage: string;
  location: string;
  showInspected?: boolean;
  showNoReserve?: boolean;
}

function AuctionCarCard({
  carName,
  carDescription,
  carImage,
  location,
  showInspected = false,
  showNoReserve = false,
}: AuctionCarCardProps) {
  return (
    <div className="flex min-[550px]:flex-row flex-col w-full items-start gap-1 bg-steria-dark-card rounded-lg p-2">
      <div className="relative min-[550px]:w-[239px] w-full">
        <img
          src={carImage}
          alt={carName}
          className="w-full h-[159px] flex-shrink-0 rounded object-cover"
        />
        <div className="absolute top-2 left-2">
          <svg
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.68335 1.53009C7.71257 1.47107 7.7577 1.42138 7.81365 1.38664C7.86961 1.3519 7.93416 1.3335 8.00002 1.3335C8.06588 1.3335 8.13043 1.3519 8.18639 1.38664C8.24234 1.42138 8.28747 1.47107 8.31669 1.53009L9.85669 4.64942C9.958 4.85484 10.1077 5.03255 10.293 5.16727C10.4782 5.30198 10.6934 5.38966 10.92 5.42276L14.364 5.92676C14.4293 5.93621 14.4906 5.96374 14.541 6.00622C14.5914 6.04871 14.629 6.10446 14.6494 6.16716C14.6698 6.22987 14.6722 6.29703 14.6564 6.36105C14.6406 6.42507 14.6072 6.48339 14.56 6.52942L12.0694 8.95476C11.905 9.11473 11.782 9.3123 11.711 9.53043C11.64 9.74856 11.6232 9.98068 11.662 10.2068L12.25 13.6334C12.2615 13.6987 12.2545 13.7658 12.2297 13.8272C12.2049 13.8886 12.1633 13.9418 12.1097 13.9808C12.0561 14.0197 11.9927 14.0428 11.9266 14.0474C11.8605 14.052 11.7945 14.0379 11.736 14.0068L8.65735 12.3881C8.45453 12.2815 8.22883 12.2258 7.99969 12.2258C7.77055 12.2258 7.54484 12.2815 7.34202 12.3881L4.26402 14.0068C4.20557 14.0377 4.13962 14.0516 4.07365 14.0469C4.00769 14.0422 3.94437 14.0191 3.89088 13.9802C3.8374 13.9413 3.79591 13.8882 3.77112 13.8269C3.74634 13.7656 3.73926 13.6986 3.75069 13.6334L4.33802 10.2074C4.37693 9.98124 4.36018 9.74899 4.28921 9.53074C4.21824 9.31248 4.09519 9.11479 3.93069 8.95476L1.44002 6.53009C1.39242 6.48411 1.35868 6.42569 1.34266 6.36147C1.32664 6.29726 1.32898 6.22984 1.34941 6.16689C1.36983 6.10393 1.40753 6.04799 1.4582 6.00541C1.50888 5.96284 1.57049 5.93536 1.63602 5.92609L5.07935 5.42276C5.30623 5.38987 5.5217 5.30228 5.70718 5.16756C5.89266 5.03283 6.04258 4.85501 6.14402 4.64942L7.68335 1.53009Z"
              stroke="#2C2C2C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.68335 1.53009C7.71257 1.47107 7.7577 1.42138 7.81365 1.38664C7.86961 1.3519 7.93416 1.3335 8.00002 1.3335C8.06588 1.3335 8.13043 1.3519 8.18639 1.38664C8.24234 1.42138 8.28747 1.47107 8.31669 1.53009L9.85669 4.64942C9.958 4.85484 10.1077 5.03255 10.293 5.16727C10.4782 5.30198 10.6934 5.38966 10.92 5.42276L14.364 5.92676C14.4293 5.93621 14.4906 5.96374 14.541 6.00622C14.5914 6.04871 14.629 6.10446 14.6494 6.16716C14.6698 6.22987 14.6722 6.29703 14.6564 6.36105C14.6406 6.42507 14.6072 6.48339 14.56 6.52942L12.0694 8.95476C11.905 9.11473 11.782 9.3123 11.711 9.53043C11.64 9.74856 11.6232 9.98068 11.662 10.2068L12.25 13.6334C12.2615 13.6987 12.2545 13.7658 12.2297 13.8272C12.2049 13.8886 12.1633 13.9418 12.1097 13.9808C12.0561 14.0197 11.9927 14.0428 11.9266 14.0474C11.8605 14.052 11.7945 14.0379 11.736 14.0068L8.65735 12.3881C8.45453 12.2815 8.22883 12.2258 7.99969 12.2258C7.77055 12.2258 7.54484 12.2815 7.34202 12.3881L4.26402 14.0068C4.20557 14.0377 4.13962 14.0516 4.07365 14.0469C4.00769 14.0422 3.94437 14.0191 3.89088 13.9802C3.8374 13.9413 3.79591 13.8882 3.77112 13.8269C3.74634 13.7656 3.73926 13.6986 3.75069 13.6334L4.33802 10.2074C4.37693 9.98124 4.36018 9.74899 4.28921 9.53074C4.21824 9.31248 4.09519 9.11479 3.93069 8.95476L1.44002 6.53009C1.39242 6.48411 1.35868 6.42569 1.34266 6.36147C1.32664 6.29726 1.32898 6.22984 1.34941 6.16689C1.36983 6.10393 1.40753 6.04799 1.4582 6.00541C1.50888 5.96284 1.57049 5.93536 1.63602 5.92609L5.07935 5.42276C5.30623 5.38987 5.5217 5.30228 5.70718 5.16756C5.89266 5.03283 6.04258 4.85501 6.14402 4.64942L7.68335 1.53009Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="absolute bottom-2 left-2">
          <div className="dark:bg-[#2c2c2c] bg-[#D3D3D3] rounded-md outline-1 outline-offset-[-1px] dark:outline-[#d0d0d0] outline-[#2F2F2F] inline-flex justify-start items-center gap-[3px] overflow-hidden">
            <div className="pl-2.5 pr-1.5 py-1.5 flex justify-center items-center gap-2">
              <div className="justify-start text-black dark:text-white text-[10px] font-medium leading-[10px]">
                12:18:03
              </div>
            </div>
            <div className="px-2.5 py-1.5 border-l dark:border-white border-black flex justify-start items-center gap-2">
              <div className="justify-start text-black dark:text-white text-[10px] font-medium leading-[10px]">
                $25,250
              </div>
            </div>
          </div>
        </div>
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
  moreCount: number;
  carImage: string;
  carName: string;
  carDescription: string;
  location: string;
  showInspected?: boolean;
  showNoReserve?: boolean;
}

function SavedSearchItem({
  searchTerm,
  moreCount,
  carImage,
  carName,
  carDescription,
  location,
  showInspected,
  showNoReserve,
}: SavedSearchItemProps) {
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
          <svg
            className="w-5 h-5"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.1824 2.16669H9.81569C9.37366 2.16669 8.94974 2.34228 8.63718 2.65484C8.32462 2.9674 8.14903 3.39133 8.14903 3.83335V3.98335C8.14873 4.27562 8.07157 4.56268 7.92531 4.81572C7.77904 5.06876 7.56881 5.27888 7.31569 5.42502L6.95736 5.63335C6.70399 5.77963 6.41659 5.85665 6.12403 5.85665C5.83146 5.85665 5.54406 5.77963 5.29069 5.63335L5.16569 5.56669C4.78325 5.34607 4.32889 5.28622 3.90236 5.40028C3.47583 5.51433 3.11198 5.79297 2.89069 6.17502L2.70736 6.49169C2.48674 6.87413 2.42689 7.32849 2.54095 7.75502C2.655 8.18155 2.93364 8.54539 3.31569 8.76669L3.44069 8.85002C3.69259 8.99545 3.90204 9.20426 4.04823 9.45571C4.19443 9.70717 4.27227 9.9925 4.27403 10.2834V10.7084C4.27519 11.002 4.19873 11.2908 4.05239 11.5454C3.90606 11.8001 3.69503 12.0115 3.44069 12.1584L3.31569 12.2334C2.93364 12.4546 2.655 12.8185 2.54095 13.245C2.42689 13.6716 2.48674 14.1259 2.70736 14.5084L2.89069 14.825C3.11198 15.2071 3.47583 15.4857 3.90236 15.5998C4.32889 15.7138 4.78325 15.654 5.16569 15.4334L5.29069 15.3667C5.54406 15.2204 5.83146 15.1434 6.12403 15.1434C6.41659 15.1434 6.70399 15.2204 6.95736 15.3667L7.31569 15.575C7.56881 15.7212 7.77904 15.9313 7.92531 16.1843C8.07157 16.4374 8.14873 16.7244 8.14903 17.0167V17.1667C8.14903 17.6087 8.32462 18.0326 8.63718 18.3452C8.94974 18.6578 9.37366 18.8334 9.81569 18.8334H10.1824C10.6244 18.8334 11.0483 18.6578 11.3609 18.3452C11.6734 18.0326 11.849 17.6087 11.849 17.1667V17.0167C11.8493 16.7244 11.9265 16.4374 12.0727 16.1843C12.219 15.9313 12.4292 15.7212 12.6824 15.575L13.0407 15.3667C13.2941 15.2204 13.5815 15.1434 13.874 15.1434C14.1666 15.1434 14.454 15.2204 14.7074 15.3667L14.8324 15.4334C15.2148 15.654 15.6692 15.7138 16.0957 15.5998C16.5222 15.4857 16.8861 15.2071 17.1074 14.825L17.2907 14.5C17.5113 14.1176 17.5712 13.6632 17.4571 13.2367C17.343 12.8102 17.0644 12.4463 16.6824 12.225L16.5574 12.1584C16.303 12.0115 16.092 11.8001 15.9457 11.5454C15.7993 11.2908 15.7229 11.002 15.724 10.7084V10.2917C15.7229 9.998 15.7993 9.70923 15.9457 9.4546C16.092 9.19997 16.303 8.98853 16.5574 8.84169L16.6824 8.76669C17.0644 8.54539 17.343 8.18155 17.4571 7.75502C17.5712 7.32849 17.5113 6.87413 17.2907 6.49169L17.1074 6.17502C16.8861 5.79297 16.5222 5.51433 16.0957 5.40028C15.6692 5.28622 15.2148 5.34607 14.8324 5.56669L14.7074 5.63335C14.454 5.77963 14.1666 5.85665 13.874 5.85665C13.5815 5.85665 13.2941 5.77963 13.0407 5.63335L12.6824 5.42502C12.4292 5.27888 12.219 5.06876 12.0727 4.81572C11.9265 4.56268 11.8493 4.27562 11.849 3.98335V3.83335C11.849 3.39133 11.6734 2.9674 11.3609 2.65484C11.0483 2.34228 10.6244 2.16669 10.1824 2.16669Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 13C11.3807 13 12.5 11.8807 12.5 10.5C12.5 9.11929 11.3807 8 10 8C8.61929 8 7.5 9.11929 7.5 10.5C7.5 11.8807 8.61929 13 10 13Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <AuctionCarCard
        carName={carName}
        carDescription={carDescription}
        carImage={carImage}
        location={location}
        showInspected={showInspected}
        showNoReserve={showNoReserve}
      />
    </div>
  );
}

export default function Watchlist() {
  const auctionCars = [
    {
      carName: "1991 Nissan Skyline GT-R",
      carDescription:
        "Extensively Modified for Racing, Dyno-Verified 706whp, 6-Speed Sequential Manual",
      carImage:
        "https://api.builder.io/api/v1/image/assets/TEMP/e03bd6c71ebac38cd52cc0acbadfff7a88cab710?width=478",
      location: "Fort Collins, CO 80524",
      showInspected: true,
      showNoReserve: true,
    },
    {
      carName: "2015 Jaguar F-Type R Coupe",
      carDescription: "Supercharged V8, Italian Racing Red, Texas-Owned",
      carImage:
        "https://api.builder.io/api/v1/image/assets/TEMP/934e2244a883fb7dc966e41b15937425d7c9d73c?width=478",
      location: "Austin, TX 78704",
      showInspected: false,
      showNoReserve: true,
    },
    {
      carName: "2022 Porsche 911 Turbo S Coupe",
      carDescription:
        "580-hp Twin-Turbo Flat-6, Bordeaux White Interior, Unmodified, and additional info.",
      carImage:
        "https://api.builder.io/api/v1/image/assets/TEMP/d190d9c2109cab15a1fe1191bd690df130653b70?width=478",
      location: "Duxbury, MA 02332",
      showInspected: true,
      showNoReserve: true,
    },
    {
      carName: "2020 Porsche Macan S",
      carDescription: "348-hp Turbo V6, Premium Package Plus, California-Owned",
      carImage:
        "https://api.builder.io/api/v1/image/assets/TEMP/08416674d8adc3ed153fcc3ce52cf00c6230328f?width=478",
      location: "Rockville, MD 20850",
      showInspected: false,
      showNoReserve: true,
    },
  ];

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
                    <div className="text-black dark:text-white font-semibold text-base leading-normal text-center w-full sm:w-auto">
                      Ending soon
                    </div>
                    <div className="text-black dark:text-white font-normal text-base leading-normal text-center w-full sm:w-auto">
                      New cars
                    </div>
                    <div className="text-black dark:text-white font-normal text-base leading-normal text-center w-full sm:w-auto">
                      Inspected
                    </div>
                    <div className="text-black dark:text-white font-normal text-base leading-normal text-center w-full sm:w-auto">
                      No reserve
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 min-[1300px]:grid-cols-2 gap-3 w-full">
                  {auctionCars.map((car, index) => (
                    <AuctionCarCard key={index} {...car} />
                  ))}
                </div>
              </div>
              {/* Saved Searches Section */}
              {/* Uncomment and update similarly if needed */}
              <div className="flex flex-col items-start gap-7 self-stretch mt-6">
                <div className="flex items-center gap-15 self-stretch">
                  <div className="text-black dark:text-white font-bold text-lg leading-[110%]">
                    Saved Searches
                  </div>
                </div>
                <div className="grid grid-cols-1 min-[1300px]:grid-cols-2 gap-3 w-full">
                  <SavedSearchItem
                    searchTerm="Porsche"
                    moreCount={21}
                    carName="2022 Porsche 911 Turbo S Coupe"
                    carDescription="580-hp Twin-Turbo Flat-6, Bordeaux White Interior, Unmodified, and additional info."
                    carImage="https://api.builder.io/api/v1/image/assets/TEMP/d190d9c2109cab15a1fe1191bd690df130653b70?width=478"
                    location="Duxbury, MA 02332"
                    showInspected={true}
                    showNoReserve={true}
                  />
                  <SavedSearchItem
                    searchTerm="Jaguar F-Type"
                    moreCount={21}
                    carName="2015 Jaguar F-Type R Coupe"
                    carDescription="Supercharged V8, Italian Racing Red, Texas-Owned"
                    carImage="https://api.builder.io/api/v1/image/assets/TEMP/934e2244a883fb7dc966e41b15937425d7c9d73c?width=478"
                    location="Austin, TX 78704"
                    showInspected={false}
                    showNoReserve={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}