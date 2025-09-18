
import FAQSection from "@/components/Main/Accordion";
import {
    CircleDollarSign,

    BadgeCheck,

    Handshake,

} from "lucide-react";
export const AboutPage = () => {
  return (

                 <div>
                 <section className="w-full px-6 py-16 flex flex-col lg:flex-row items-center justify-center gap-12  mx-auto">




      <div className="relative w-full max-w-[880px] aspect-[16/9] flex-shrink-0 hidden sm:block">
          {/* SVG-шари */}
          <img
              src="/assets/svg/Vector%203.svg"
              alt="bg-layer-1"
              className="absolute  left-[3%] lg:left-[5%] top-[5%] w-[90%] h-auto max-w-[880px] z-0"
          />
          <img
              src="/assets/svg/Vector%204.svg"
              alt="bg-layer-2"
              className="absolute left-[10%] lg:left-[15%] top-[15%] w-[85%] h-auto max-w-[650px] z-10"
          />

          {/* Машини */}

          <img
              src="/assets/imgs/Jaguar.png"
              alt="car-2"
              className="absolute left-[20%] top-[10%] w-[50%] max-w-[580px] sm:w-[65%] sm:max-w-[550px] lg:left-[20%] lg:top-[15%] md:w-[70%] md:max-w-[552px] z-20"
          />

      </div>
                     <div className="flex flex-col justify-start items-start gap-9 max-w-lg text-center lg:text-left">
                         <div className="flex flex-row justify-baseline items-center gap-3 md:text-4xl">
                             <div className="flex justify-center mb-2 text-2xl font-bold">
                             <svg
                                 width="58"
                                 height="39"
                                 viewBox="0 0 58 39"
                                 fill="none"
                                 xmlns="http://www.w3.org/2000/svg"
                             >
                                 <path
                                     d="M57.9685 39H48.5024L34.414 22.7287H12.8857V16.1754H45.0199C45.9697 16.1115 46.8561 15.8877 47.5843 15.568C48.3441 15.2803 49.0723 14.8328 49.6738 14.2574C49.7688 14.1934 49.8321 14.0975 49.8954 14.0016C50.4336 13.4582 50.8135 12.8508 51.0352 12.2115C51.3834 11.2525 51.5417 10.4213 51.5417 9.52623V8.53525C51.5417 7.9918 51.3834 7.6082 51.3201 7.51229C51.2251 7.22459 51.0352 6.96885 50.8135 6.84098C50.6236 6.68115 50.3387 6.55328 50.117 6.55328H49.8638C49.8638 6.55328 49.6738 6.52131 49.5788 6.52131H25.7711V0H49.5788C51.1618 0 52.4598 0.287705 53.5046 0.831147C54.6443 1.43852 55.4675 2.1418 56.1323 2.97295C56.7971 3.86803 57.272 4.79508 57.5253 5.72213C57.8419 6.68115 57.9685 7.6082 57.9685 8.50328V9.52623C57.9685 11.0287 57.7786 12.4033 57.4303 13.65L57.367 13.8738C56.9238 15.2484 56.4172 16.3352 55.7841 17.2303C54.9609 18.3172 54.2327 19.0844 53.4413 19.7238C52.5865 20.3631 51.6683 20.9705 50.6553 21.45C49.5788 21.9295 48.6607 22.2172 47.7109 22.377C46.8245 22.6008 45.9064 22.7287 44.9882 22.7287H44.0701L58.0002 39H57.9685Z"
                                     fill="#EC2729"
                                 />
                                 <path
                                     d="M36.0599 32.4787V39H9.75105C8.76962 39 7.72486 38.8082 6.55347 38.4566C5.44539 38.1369 4.36898 37.5615 3.4192 36.7943C2.43776 35.9951 1.61462 34.9721 0.981437 33.7254C0.316593 32.4787 0 30.9443 0 29.1221V8.50328C0 7.57623 0.158296 6.64918 0.474889 5.72213C0.728163 4.79508 1.20305 3.86803 1.8679 2.97295C2.53274 2.1418 3.35588 1.43852 4.49562 0.831147C5.50871 0.287705 6.8384 0 8.38971 0H19.3122V6.52131H8.10477C8.10477 6.52131 7.94648 6.55328 7.88316 6.55328C7.62988 6.55328 7.34495 6.68115 7.18665 6.80902C6.93338 6.96885 6.77508 7.19262 6.68011 7.44836C6.52181 7.73607 6.42683 8.15164 6.42683 8.53525V29.1221C6.45849 30.177 6.74342 31.0082 7.31329 31.5836C7.88316 32.191 8.73796 32.4787 9.78271 32.4787H36.0599Z"
                                     fill="#DEDEDE"
                                     className="dark:fill-[#DEDEDE] fill-black"
                                 />
                             </svg>
                             </div>
                             <h2 className="text-black dark:text-white  text-4xl font-bold font-amulya leading-tight">
                                 Steria Car Auctions
                             </h2>
                         </div>


                         <div className="flex flex-col gap-5">
                             <div className="self-stretch justify-start dark:text-white text-black text-2xl font-bold font-amulya">Turn your dream car into someone else’s dream ride! Whether it’s rare, custom, or just plain awesome — Steria is the place to auction it.</div>
                         </div>

                         {/* Кнопка */}


                     </div>
      </section>
    <section className="w-full px-6 py-16  lg:py-9  flex flex-col items-center justify-center  rounded-xl gap-12  mx-auto">

        <div className=" w-[80vw]  flex flex-wrap justify-between  sm:gap-8 lg:gap-9  lg:px-4 p-6 sm:p-8 rounded-xl  gap-y-6   items-center max-w-[1440px] mx-auto">
            {/* Блок 1 */}
            <div className="flex flex-col items-center gap-4 w-full max-w-96   min-h-80 p-4 rounded-xl border-2 border-red-500 bg-white dark:bg-neutral-900">
                <div className="p-5 bg-black/5 dark:bg-black rounded-[74px] flex justify-center items-center">
                    <CircleDollarSign className="w-16 h-16 sm:w-20 sm:h-20 text-[#FFB800]" />
                </div>
                <div className="text-center text-black dark:text-white text-lg sm:text-2xl font-bold font-amula leading-tight">
                    Low Fees, Full Gains
                </div>
                <div className="text-center text-black dark:text-white text-base font-bold font-amula leading-tight">Sellers list for free and keep 100% of the sale price. Buyers pay only a 5% commission (max $7,500). Simple, fair, and transparent.</div>
            </div>

            {/* Блок 2 */}
            <div className="flex flex-col items-center gap-4 w-full max-w-96  p-4 min-h-80 rounded-xl border-2 border-red-500 bg-white dark:bg-neutral-900">
                <div className="p-5 bg-black/5 dark:bg-black rounded-[74px] flex justify-center items-center">
                    <Handshake className="w-16 h-16 sm:w-20 sm:h-20 text-[#C3F73A]" />
                </div>
                <div className="text-center text-black dark:text-white text-lg sm:text-2xl font-bold font-amula leading-tight">
                    Know Your Car, Buy With Confidence
                </div>
                <div className="text-center text-black dark:text-white text-base font-bold font-amula leading-tight">Every listing comes with a full vehicle history report — no hidden surprises, no extra cost.</div>
            </div>

            {/* Блок 3 */}
            <div className="flex flex-col items-center gap-4 w-full max-w-96  p-4 rounded-xl border-2 border-red-500  min-h-80 bg-white dark:bg-neutral-900">
                <div className="p-5 bg-black/5 dark:bg-black rounded-[74px] flex justify-center items-center">
                    <BadgeCheck className="w-16 h-16 sm:w-20 sm:h-20 text-[#5CA1FF] text-base " />
                </div>
                <div className="text-center text-black dark:text-white text-lg sm:text-2xl font-bold font-amula leading-tight">
                    Fast, Easy, Exciting
                </div>
                <div className="text-center text-black dark:text-white text-base font-bold font-amula leading-tight">Our platform is built to make buying and selling enthusiast cars online smooth, fun, and fast. Your car deserves the spotlight — and we make it shine.</div>
            </div>


        </div>
    </section>
                     <div className="w-full     flex flex-col items-center justify-center   max-w-[1440px]   mx-auto h-0  outline-1 outline-offset-[-1px] outline-red-600"/>



    <section className="w-full px-6 py-16  lg:py-9  flex flex-col items-center justify-center  rounded-xl gap-12  mx-auto">
        <h2 className="w-[80vw] text-3xl sm:text-4xl font-bold text-black dark:text-white mb-6 text-center sm:text-left max-w-[1440px] mx-auto">
            Frequently asked questions
        </h2>
        <FAQSection />


    </section>
</div>



  )
}