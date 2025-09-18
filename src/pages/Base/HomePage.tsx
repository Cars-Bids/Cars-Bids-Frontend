import Loader from "@/components/Main/Preloader";
import CarCard from "@/components/Main/PhotoPrew";

import { AuctionCards } from "@/components/Main/Auction/Cards";
import { SettingsMenu } from "@/components/Main/Auction/Menu";

import { useGetAuctionsQuery, useGetActionActiveQuery } from "@/features/api/endpoints/Auction";



const HomePage = () => {
     const { data: body, isLoading } = useGetAuctionsQuery({ PageNumber: 1, PageSize: 10 },  { refetchOnFocus: true,
         refetchOnReconnect: true, });

     const {data: img} = useGetActionActiveQuery({ count: 3 },  { refetchOnFocus: true})
console.log(img)  ;



  return (
    <section className="w-full px-6 py-16 flex flex-col lg:flex-row items-center justify-center gap-12  mx-auto">
      <div className="flex flex-col items-center justify-center  ">
        <div className="self-stretch inline-flex justify-center items-start gap-5 pb-10">
            {

                img?.map((img) =>(
                    <>
                   <CarCard key={img.id} data={img}/>
                    <CarCard key={img.id} data={img} variant={"mirror"}/>
                    </>
                    ))

          }
        </div>
        <div className="w-full  px-6 grid grid-cols-3 items-center gap-5">
          {/* Title */}
          <div className="text-black dark:text-white text-2xl font-bold font-amulya">
            Auctions
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-5">
            <div className="text-black dark:text-white text-base font-medium font-amulya">
              Ending soon
            </div>
            <div className="text-black dark:text-white text-base font-normal font-synonym">
              New cars
            </div>
            <div className="text-black dark:text-white text-base font-normal font-synonym">
              Inspected
            </div>

          </div>

          <SettingsMenu />
        </div>
        <div className="flex justify-center items-center grid  grid-cols-2 gap-5 m-4 ">
         {body?.items?.map((auction) => (
          <AuctionCards key={auction.id} data={auction} />
        ))}
        </div>
        {isLoading && <Loader />}
      </div>
    </section>
  );
};

export default HomePage;
