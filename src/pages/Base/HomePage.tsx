// import Loader from "@/components/Main/Preloader";
import CarCard from "@/components/Main/PhotoPrew";
import { Settings2 } from "lucide-react";
const HomePage = () => {
  return (
  
  

  <section className="w-full px-6 py-16 flex flex-col lg:flex-row items-center justify-center gap-12  mx-auto">
    <div className="flex flex-col items-center justify-center  ">
 <div className="self-stretch inline-flex justify-center items-start gap-5 pb-10">     
<CarCard
  title="2013 Porsche Panamera S"
  lable="Featured cars"
  subtitle="2 Owners, V8 Power, Yachting Blue"
  description="Metallic, California-Owned"
  image="https://placehold.co/680x350"
  featured={["https://placehold.co/210x140", "https://placehold.co/210x140"]}
  price="$135,000"
  time="03:48:12"
/>
<CarCard
  title="2013 Porsche Panamera S"
  lable="Newly added"
  subtitle="2 Owners, V8 Power, Yachting Blue"
  description="Metallic, California-Owned"
  image="https://placehold.co/680x350"
  featured={["https://placehold.co/210x140", "https://placehold.co/210x140"]}
  price="$135,000"
  time="03:48:12"
  variant="mirror"
/>
</div>
<div className="w-full grid grid-cols-3 items-center gap-5">
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
    <div className="text-black dark:text-white text-base font-normal font-synonym">
      No reserve
    </div>
  </div>

  {/* Right side (icons / buttons) */}
    <div className="flex justify-end  gap-5 text-black dark:text-white">
    <Settings2 />
   
  </div>
</div>

      {/* <div className="flex flex-col items-center justify-center">
        <Loader />
        <h1 className="text-2xl font-bold mt-4 dark:text-white">Welcome to the <span className="text-red-500 dark:text-red-600">Home Page</span></h1>
        <p className="text-gray-600 dark:text-gray-200">This is a placeholder for your content.</p>
        </div> */}

    
  
      </div>

    </section>
  );
};

export default HomePage;

