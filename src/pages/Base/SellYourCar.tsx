import RewiewsSection from "@/components/Main/Comments";
import {
  CircleDollarSign,
  Clock,
  BadgeCheck,
  ShieldCheck,
  Globe,
  Handshake,
 
} from "lucide-react";

const SellYourCar = () => {
  return (
    <div>
      <section className="w-full px-6 py-16 flex flex-col lg:flex-row items-center justify-center gap-12  mx-auto">
        {/* Ліва частина — текст */}
        <div className="flex flex-col justify-start items-start gap-9 max-w-xl text-center lg:text-left max-w-[1850px]">
          <div className="flex flex-col gap-3">
            <h2 className="text-white text-4xl md:text-5xl font-bold font-amulya leading-tight">
              Your Car Deserves the Spotlight.
            </h2>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {["views", "bids", "money"].map((word, idx) => (
                <div key={idx}>
                  <span className="text-red-600 text-2xl md:text-[26px] font-bold font-amulya">
                    More
                  </span>
                  <span className="text-white text-2xl md:text-[26px] font-bold font-amulya">
                    {" "}
                    {word}.
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Переваги */}
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <CircleDollarSign color="lime" size={30} />
              <p className="text-white text-base font-medium font-synonym">
                <span className="text-lg font-bold">List for free</span> — you
                keep 100% of the sale price
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Clock color="white" size={30} />
              <p className="text-white text-base font-medium font-synonym">
                <span className="text-lg font-bold">Quick start</span> — we get
                your car live in just a few days
              </p>
            </div>
            <div className="flex items-start gap-3">
              <BadgeCheck color="red" size={30} />
              <p className="text-white text-base font-medium font-synonym">
                <span className="text-lg font-bold">Targeted buyers</span> —
                real enthusiasts looking for their next ride
              </p>
            </div>
          </div>

          {/* Кнопка */}
          <button className=" px-7 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-md text-xl md:text-2xl font-bold font-amulya hover:from-transparent hover:to-transparent hover:bg-none hover:text-red-500 hover:border hover:border-red-500 text-white mt-4 transition-all duration-200 border border-transparent">
            Sell now — it’s free
          </button>
        </div>

        {/* Права частина — картинки (приховані на мобільних) */}
        <div className="relative w-full max-w-[880px] aspect-[16/9] flex-shrink-0 hidden sm:block">
          {/* SVG-шари */}
          <img
            src="src/assets/svg/Vector1.svg"
            alt="bg-layer-1"
            className="absolute left-[5%] top-[5%] w-[90%] h-auto max-w-[880px] z-0"
          />
          <img
            src="src/assets/svg/Vector2.svg"
            alt="bg-layer-2"
            className="absolute left-[8%] top-[10%] w-[85%] h-auto max-w-[820px] z-10"
          />

          {/* Машини */}
          <img
            src="src/assets/imgs/Nissan.png"
            alt="car-1"
            className="absolute left-[22%] top-[10%] w-[25%] max-w-[200px] md:w-[28%] md:max-w-[300px] lg:w-[30%] lg:max-w-[350px] z-20"
          />
          <img
            src="src/assets/imgs/Jaguar.png"
            alt="car-2"
            className="absolute left-[55%] top-[10%] w-[50%] max-w-[280px] sm:w-[35%] sm:max-w-[450px] lg:left-[53%] lg:top-[12%] md:w-[40%] md:max-w-[350px] z-20"
          />
          <img
            src="src/assets/imgs/porsche.png"
            alt="car-3"
            className="absolute left-[10%] top-[32%] w-[50%] max-w-[270px] sm:w-[35%] sm:max-w-[450px] md:w-[80%] md:max-w-[450px] z-20"
          />
        </div>
      </section>
      <section className="w-full px-6 py-16  py-12 lg:py-9  flex flex-col items-center justify-center  rounded-xl gap-12  mx-auto">
        <h2 className="w-[80vw] text-3xl sm:text-4xl font-bold text-white mb-6 text-right max-w-[1850px] mx-auto">
          Why choose Steria?
        </h2>

        <div className=" w-[80vw]  flex flex-wrap justify-center  sm:gap-8 lg:gap-9  lg:px-4 p-6 sm:p-8 rounded-xl bg-neutral-900  gap-y-6  mx-6  items-center max-w-[1850px] mx-auto">
          {/* Блок 1 */}
          <div className="flex flex-col items-center gap-4 w-full sm:w-64 md:w-72 p-4 rounded-xl border-2 border-red-500 bg-neutral-900">
            <div className="p-5 bg-black rounded-[74px] flex justify-center items-center">
              <ShieldCheck className="w-16 h-16 sm:w-20 sm:h-20 text-[#5CA1FF]" />
            </div>
            <div className="text-center text-white text-lg sm:text-xl font-bold font-amula leading-tight">
              Expert moderation & listing support
            </div>
          </div>

          {/* Блок 2 */}
          <div className="flex flex-col items-center gap-4 w-full sm:w-64 md:w-72 p-4 rounded-xl border-2 border-red-500 bg-neutral-900">
            <div className="p-5 bg-black rounded-[74px] flex justify-center items-center">
              <Globe className="w-16 h-16 sm:w-20 sm:h-20 text-[#CD1F22]" />
            </div>
            <div className="text-center text-white text-lg sm:text-xl font-bold font-amula leading-tight">
              Thousands of active, daily car shoppers
            </div>
          </div>

          {/* Блок 3 */}
          <div className="flex flex-col items-center gap-4 w-full sm:w-64 md:w-72 p-4 rounded-xl border-2 border-red-500 bg-neutral-900">
            <div className="p-5 bg-black rounded-[74px] flex justify-center items-center">
              <CircleDollarSign className="w-16 h-16 sm:w-20 sm:h-20 text-[#FFB800]" />
            </div>
            <div className="text-center text-white text-lg sm:text-xl font-bold font-amula leading-tight">
              No seller fees — you keep every dollar
            </div>
          </div>

          {/* Блок 4 */}
          <div className="flex flex-col items-center gap-4 w-full sm:w-64 md:w-72 p-4 rounded-xl border-2 border-red-500 bg-neutral-900">
            <div className="p-5 bg-black rounded-[74px] flex justify-center items-center">
              <Handshake className="w-16 h-16 sm:w-20 sm:h-20 text-[#C3F73A]" />
            </div>
            <div className="text-center text-white text-lg sm:text-xl font-bold font-amula leading-tight">
              Trusted by sellers: 4.9/5 average rating
            </div>
          </div>
        </div>
      </section>
      <RewiewsSection />
   <section className="w-full px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 flex flex-col items-center justify-center gap-6 sm:gap-8 rounded-xl  mx-auto">
  <div className="w-[80vw] py-6 sm:py-8 md:py-10 px-4 sm:px-6 md:px-10 rounded-[20px] inline-flex flex-col justify-center items-center gap-6 sm:gap-8 md:gap-9 overflow-hidden bg-[#121212]  max-w-[1850px]">
    <div className="justify-start text-white text-xl sm:text-2xl md:text-3xl font-bold font-amulya">
      How to sell your car
    </div>
    <div className="inline-flex flex-col sm:flex-row justify-center items-start gap-4 sm:gap-6 md:gap-28 w-full">
      <div className="w-full sm:w-48 h-28 relative inline-flex flex-col justify-center items-start gap-2.5">
        <div className="left-[-5px] sm:left-[-57.50px] top-[-20px] sm:top-[-32px] absolute justify-start text-red-600/20 text-6xl sm:text-9xl font-bold font-synonym">
          01
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
          <div className="justify-start text-white text-lg sm:text-xl md:text-2xl font-bold font-amulya">
            Submit your car
          </div>
          <div className="self-stretch justify-start text-white text-sm sm:text-base font-medium font-synonym">
            Fill out a quick form and upload a few photos — we’ll get back to
            you fast.
          </div>
        </div>
      </div>
      <div className="w-full sm:w-48 h-28 relative inline-flex flex-col justify-center items-start gap-2.5">
        <div className="left-[-5px] sm:left-[-61.50px] top-[-20px] sm:top-[-32px] absolute justify-start text-red-600/20 text-6xl sm:text-9xl font-bold font-synonym">
          02
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
          <div className="justify-start text-white text-lg sm:text-xl md:text-2xl font-bold font-amulya">
            We create your listing
          </div>
          <div className="self-stretch justify-start text-white text-sm sm:text-base font-medium font-synonym">
            Our team builds a high-quality, eye-catching listing to draw
            serious buyers.
          </div>
        </div>
      </div>
      <div className="w-full sm:w-48 h-28 relative inline-flex flex-col justify-center items-start gap-2.5">
        <div className="left-[-5px] sm:left-[-64.50px] top-[-20px] sm:top-[-32px] absolute justify-start text-red-600/20 text-6xl sm:text-9xl font-bold font-synonym">
          03
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
          <div className="justify-start text-white text-lg sm:text-xl md:text-2xl font-bold font-amulya">
            Auction goes live
          </div>
          <div className="self-stretch justify-start text-white text-sm sm:text-base font-medium font-synonym">
            Your car gets in front of thousands of active buyers. Watch the
            bids roll in.
          </div>
        </div>
      </div>
      <div className="w-full sm:w-60 h-28 relative inline-flex flex-col justify-center items-start gap-2.5">
        <div className="left-[-5px] sm:left-[-66.50px] top-[-20px] sm:top-[-32px] absolute justify-start text-red-600/20 text-6xl sm:text-9xl font-bold font-synonym">
          04
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-2.5">
          <div className="justify-start text-white text-lg sm:text-xl md:text-2xl font-bold font-amulya">
            You get paid
          </div>
          <div className="self-stretch justify-start text-white text-sm sm:text-base font-medium font-synonym">
            Once sold, we connect you with the buyer and help close the deal —
            no selling fees, no stress.
          </div>
        </div>
      </div>
    </div>
    <div className="px-4 sm:px-6 py-2 sm:py-3 inline-flex justify-center items-center gap-2.5">
      <button className="px-5 sm:px-7 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-md text-base sm:text-xl md:text-2xl font-bold font-amulya hover:from-transparent hover:to-transparent hover:bg-none hover:text-red-500 hover:border hover:border-red-500 text-white mt-4 transition-all duration-200 border border-transparent">
        Get started now
      </button>
    </div>
  </div>
</section>
    </div>
  );
};

export default SellYourCar;
