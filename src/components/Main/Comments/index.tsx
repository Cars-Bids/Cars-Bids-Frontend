import { Star } from "lucide-react";

const RewiewsSection = () => {
  return (
    <section className="w-full px-4 py-12 sm:px-6 sm:py-16 flex flex-col items-center justify-center gap-6 sm:gap-8 rounded-xl  mx-auto" >
      <h2 className="w-[80vw]  text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white mb-4 sm:mb-6 max-w-[1440px] text-center sm:text-left" >
        What sellers are saying
      </h2>
<div className="w-[90vw] inline-flex flex-col justify-start items-start gap-6 sm:gap-6 max-w-[1850px]">

        <div className="self-stretch inline-flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 overflow-hidden px-4">
          <div className="w-full sm:w-80 h-52 relative flex-shrink-0">
            <div className="w-64 sm:w-72 h-40 left-[15px] top-[36px] absolute bg-red-600 rounded-[37.37px] transform -skew-x-12   dark:shadow-none"></div>
           <div className="w-56 sm:w-64 h-36 px-4 py-3 left-[70px] sm:left-[80.08px] top-0 absolute
                bg-white rounded-tl-3xl rounded-tr-3xl rounded-br-3xl 
                inline-flex flex-col justify-between items-start overflow-auto
               shadow-extra-lg dark:shadow-none border border-gray-200 ">
              <div className="self-stretch justify-start text-dark text-sm font-normal font-synonym">
                Some of the most helpful and kind people to work with! Will
                for sure sell with them again.
              </div>
              <div className="inline-flex justify-start items-start gap-2">
                <div className="flex justify-start items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <div className="justify-start text-black text-xs font-medium font-synonym leading-none">
                  5.0
                </div>
              </div>
            </div>
            <img
              className="w-10 sm:w-12 h-10 sm:h-12 left-[24px] sm:left-[32.03px] top-[137.47px] absolute rounded-[133.47px]"
              src="https://placehold.co/52x52"
            />
            <div className="left-[70px] sm:left-[94px] top-[149px] absolute justify-start text-white text-base sm:text-lg font-bold font-amulya leading-tight">
              Smith Jhon
            </div>
            <div className="mt-[4px] left-[70px] sm:left-[94px] top-[167px] absolute justify-start text-gray-500 text-xs font-medium font-synonym leading-none">
              Sept 2024
            </div>
          </div>
          <div className="w-full sm:w-80 h-52 relative flex-shrink-0">
            <div className="w-64 sm:w-72 h-40 left-[15px] top-[36px] absolute bg-red-600 rounded-[37.37px] transform -skew-x-12"></div>
   <div className="w-56 sm:w-64 h-36 px-4 py-3 left-[70px] sm:left-[80.08px] top-0 absolute
                bg-white rounded-tl-3xl rounded-tr-3xl rounded-br-3xl 
                inline-flex flex-col justify-between items-start overflow-auto
               shadow-extra-lg dark:shadow-none border border-gray-200 ">
              <div className="self-stretch justify-start text-dark text-sm font-normal font-synonym">
                Some of the most helpful and kind people to work with! Will
                for sure sell with them again.
              </div>
              <div className="inline-flex justify-start items-start gap-2">
                <div className="flex justify-start items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <div className="justify-start text-black text-xs font-medium font-synonym leading-none">
                  5.0
                </div>
              </div>
            </div>
            <img
              className="w-10 sm:w-12 h-10 sm:h-12 left-[24px] sm:left-[32.03px] top-[137.47px] absolute rounded-[133.47px]"
              src="https://placehold.co/52x52"
            />
            <div className="left-[70px] sm:left-[94px] top-[149px] absolute justify-start text-white text-base sm:text-lg font-bold font-amulya leading-tight">
              Jay C.
            </div>
            <div className="mt-[4px] left-[70px] sm:left-[94px] top-[167px] absolute justify-start text-gray-500 text-xs font-medium font-synonym leading-none">
              July 2024
            </div>
          </div>
          <div className="w-full sm:w-80 h-52 relative flex-shrink-0">
            <div className="w-64 sm:w-72 h-40 left-[15px] top-[36px] absolute bg-red-600 rounded-[37.37px] transform -skew-x-12"></div>
            <div className="w-56 sm:w-64 h-36 px-4 py-3 left-[70px] sm:left-[80.08px] top-0 absolute
                bg-white rounded-tl-3xl rounded-tr-3xl rounded-br-3xl 
                inline-flex flex-col justify-between items-start overflow-auto
               shadow-extra-lg dark:shadow-none border border-gray-200 ">
              <div className="self-stretch justify-start text-dark text-sm font-normal font-synonym">
                This is by far the greatest place to sell your car online.
                I’ve sold 5 cars with them now and am never going back to
                anywhere else!
              </div>
              <div className="inline-flex justify-start items-start gap-2">
                <div className="flex justify-start items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <div className="justify-start text-black text-xs font-medium font-synonym leading-none">
                  5.0
                </div>
              </div>
            </div>
            <img
              className="w-10 sm:w-12 h-10 sm:h-12 left-[24px] sm:left-[32.03px] top-[137.47px] absolute rounded-[133.47px]"
              src="https://placehold.co/52x52"
            />
            <div className="left-[70px] sm:left-[94px] top-[149px] absolute justify-start text-white text-base sm:text-lg font-bold font-amulya leading-tight">
              Andrew D.
            </div>
            <div className="mt-[4px] left-[70px] sm:left-[94px] top-[167px] absolute justify-start text-gray-500 text-xs font-medium font-synonym leading-none">
              June 2024
            </div>
          </div>
          <div className="w-full sm:w-80 h-52 relative flex-shrink-0">
            <div className="w-64 sm:w-72 h-40 left-[15px] top-[36px] absolute bg-red-600 rounded-[37.37px] transform -skew-x-12"></div>
           <div className="w-56 sm:w-64 h-36 px-4 py-3 left-[70px] sm:left-[80.08px] top-0 absolute
                bg-white rounded-tl-3xl rounded-tr-3xl rounded-br-3xl 
                inline-flex flex-col justify-between items-start overflow-auto
               shadow-extra-lg dark:shadow-none border border-gray-200 ">
              <div className="self-stretch justify-start text-dark text-sm font-normal font-synonym">
                Some of the most helpful and kind people to work with! Will
                for sure sell with them again.
              </div>
              <div className="inline-flex justify-start items-start gap-2">
                <div className="flex justify-start items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <div className="justify-start text-black text-xs font-medium font-synonym leading-none">
                  5.0
                </div>
              </div>
            </div>
            <img
              className="w-10 sm:w-12 h-10 sm:h-12 left-[24px] sm:left-[32.03px] top-[137.47px] absolute rounded-[133.47px]"
              src="https://placehold.co/52x52"
            />
            <div className="left-[70px] sm:left-[94px] top-[149px] absolute justify-start text-white text-base sm:text-lg font-bold font-amulya leading-tight">
              Lovedons Auto
            </div>
            <div className="mt-[4px] left-[70px] sm:left-[94px] top-[167px] absolute justify-start text-gray-500 text-xs font-medium font-synonym leading-none">
              Oct 2024
            </div>
          </div>
        </div>
      </div>
    </section>
    
  );
};

export default RewiewsSection;