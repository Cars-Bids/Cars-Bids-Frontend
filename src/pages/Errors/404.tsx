import { useState, useEffect } from "react";
import "./CarLoader.css";

import { Link } from "react-router-dom";
interface CarLoaderProps {
  isLoading?: boolean;
}

export default function NotFound404({ isLoading = true }: CarLoaderProps) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  if (!isLoading) return null;

  return (
<section className="w-full  py-16 flex flex-col lg:flex-row items-center justify-center  min-h-screen  ">
      <div className="flex lg:flex-row flex-col items-center justify-center w-full">
        <svg
          className="w-[90%] h-[420px] max-w-[650px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 80 90"
        >
          {/* Ліхтар */}
          {/* Стовп */}
          <rect
            x="73"
            y="10"
            width="2"
            height="53.2"
            rx="1"
            className=" fill-red-500 "
          />

          {/* Горизонтальна частина ліхтаря зверху, заокруглена */}
          <rect
            x="65"
            y="10"
            width="10"
            height="2"
            rx="1"
            className=" fill-red-500 "
          />

          {/* Світловий промінь */}
          <polygon
            x={"74"}
            y={"10"}
            points="70,12 90,63 50,63"
            fill="rgba(189, 114, 114, 0.3)"
            className="lamp-light-beam animate-lamp"
            transform="translate(-2,0)"
          />

          <g className="car animate-car  animate-crash">
            <path
              className="fill-red-600 dark:fill-red-500"
              d="M73.1,53.47V46.4a4.9,4.9,0,0,0-4.9-4.89H56.45l-7.59-9.25a4.08,4.08,0,0,0-3.22-1.59H22.83a4.12,4.12,0,0,0-3.66,2.22v0L15,41.51H11.18a3.94,3.94,0,0,0-3.94,3.94v7.8A2,2,0,0,0,6.15,55v1.81a2,2,0,0,0,2,2H71.87a2,2,0,0,0,2-2V55A2,2,0,0,0,73.1,53.47Zm-65,3.78a.42.42,0,0,1-.42-.42V55a.42.42,0,0,1,.42-.42H20.69v.71H17.06l-2,0c-.65,0-1.3,0-1.95.05a.55.55,0,0,0,0,1.09c.65,0,1.3,0,1.95.05l2,0H21c1.31,0,2.61,0,3.92-.07s2.61-.13,3.91-.28a.27.27,0,0,0,0-.53c-1.3-.15-2.61-.23-3.91-.28-.88,0-1.76,0-2.64-.05V54.6H55.44v.72q-1.26,0-2.52.06c-1.05,0-2.09.13-3.14.28a.27.27,0,0,0-.22.23.26.26,0,0,0,.22.3c1,.15,2.09.23,3.14.28s2.09.05,3.13.07h5.68c1,0,2.09,0,3.13-.07S67,56.34,68,56.19a.27.27,0,0,0,.22-.23.25.25,0,0,0-.22-.3c-1-.15-2.09-.23-3.14-.28s-2.09-.05-3.13-.07H57v-.7H71.87a.42.42,0,0,1,.42.42v1.81a.42.42,0,0,1-.42.42Zm3-14.19h9.51V53H8.8V51.28h2.77a.78.78,0,0,0,.78-.78v-5a.77.77,0,0,0-.78-.77H8.91A2.38,2.38,0,0,1,11.18,43.06ZM22.83,32.23H45.64a2.53,2.53,0,0,1,2,1l0,0,6.79,8.27h-1.8l-6.3-7.64a1.39,1.39,0,0,0-1.1-.54H22.83a1.49,1.49,0,0,0-1.3.79l0,.06-3.14,7.33H16.74l3.82-7.91A2.56,2.56,0,0,1,22.83,32.23Zm15.44,9.28V34.89h6.89l5.47,6.62Zm-1.56,0H25.05V34.89H36.71Zm-13.21,0H20.06l2.83-6.62h.61Zm-1.25,1.55H36.71V53H22.25Zm16,0h15l.93,1.68L55.44,47V53H38.27Zm32.94,3h-2a.47.47,0,0,1-.47-.46V43.43A3,3,0,0,1,71.21,46Zm-2.6,1.87h2.93V53H57V46.78a.79.79,0,0,0-.1-.37l-1.84-3.35H66.9V46.2A1.71,1.71,0,0,0,68.61,47.91ZM10.79,49.72h-2v-.59h1a.39.39,0,0,0,.39-.39V47.26a.38.38,0,0,0-.39-.38h-1v-.6h2Z"
            />
            <path
              className="fill-red-600 dark:fill-red-500"
              d="M42.67,44.37H40.25a.78.78,0,0,0,0,1.56h2.42a.78.78,0,0,0,0-1.56Z"
            />
            <path
              className="fill-red-600 dark:fill-red-500"
              d="M28.83,37.49c.33.39.68.77,1,1.13a13.8,13.8,0,0,0,1.13,1,8.81,8.81,0,0,0,1.27.9.15.15,0,0,0,.13,0,.14.14,0,0,0,.06-.18,10.84,10.84,0,0,0-.9-1.28c-.33-.39-.67-.77-1-1.13s-.74-.7-1.14-1a8.81,8.81,0,0,0-1.27-.9A.15.15,0,0,0,28,36a.13.13,0,0,0,0,.19A9.61,9.61,0,0,0,28.83,37.49Z"
            />
            <path
              className="fill-red-600 dark:fill-red-500"
              d="M27.85,39.62a6.17,6.17,0,0,0,.48.54,4.2,4.2,0,0,0,.54.48,3,3,0,0,0,.63.38h.07a.09.09,0,0,0,.05-.12,3.38,3.38,0,0,0-.38-.64c-.15-.19-.31-.37-.47-.54a4.13,4.13,0,0,0-.55-.47,2.64,2.64,0,0,0-.63-.38s-.05,0-.07,0a.09.09,0,0,0-.05.12A3.3,3.3,0,0,0,27.85,39.62Z"
            />
            <path
              className="fill-red-600 dark:fill-red-500"
              d="M31.15,36.32a6.17,6.17,0,0,0,.48.54,4.78,4.78,0,0,0,.54.47,3.33,3.33,0,0,0,.63.39h.08a.11.11,0,0,0,0-.13,2.85,2.85,0,0,0-.38-.63,6.06,6.06,0,0,0-.47-.54,4.78,4.78,0,0,0-.54-.47,3.42,3.42,0,0,0-.64-.39.09.09,0,0,0-.07,0,.1.1,0,0,0-.05.13A3.64,3.64,0,0,0,31.15,36.32Z"
            />
            <path
              className="fill-red-600 dark:fill-red-500"
              d="M43.86,39.2a13.82,13.82,0,0,0-1-1.14c-.37-.36-.75-.7-1.15-1a8,8,0,0,0-1.3-.87.19.19,0,0,0-.15,0,.17.17,0,0,0-.06.22,8.13,8.13,0,0,0,.86,1.3,12.32,12.32,0,0,0,1,1.14,13.94,13.94,0,0,0,1.14,1,7.92,7.92,0,0,0,1.3.86.16.16,0,0,0,.15,0,.16.16,0,0,0,.07-.21A8.51,8.51,0,0,0,43.86,39.2Z"
            />
            <path
              className="fill-red-600 dark:fill-red-500"
              d="M44,36.14a3.25,3.25,0,0,0-.82-.45h-.1a.16.16,0,0,0-.09.18,4,4,0,0,0,.45.82A5.22,5.22,0,0,0,44.71,38a4,4,0,0,0,.82.45.17.17,0,0,0,.1,0,.15.15,0,0,0,.08-.19,3.57,3.57,0,0,0-.44-.82,5.43,5.43,0,0,0-.59-.68A5.35,5.35,0,0,0,44,36.14Z"
            />
            <path
              className="fill-red-600 dark:fill-red-500"
              d="M31.22,55.61H29.78a.32.32,0,0,0,0,.63h1.44a.32.32,0,0,0,0-.63Z"
            />
            <path
              className="fill-red-600 dark:fill-red-500"
              d="M70.42,55.61H69a.32.32,0,0,0,0,.63h1.44a.32.32,0,0,0,0-.63Z"
            />
            <path
              className="fill-red-600 dark:fill-red-500"
              d="M48.8,55.61H47.36a.32.32,0,0,0,0,.63H48.8a.32.32,0,0,0,0-.63Z"
            />
          </g>
          <g className="wheel back-wheel fly-wheel ">
            <circle
              className="fill-red-600 dark:fill-red-500"
              cx="18"
              cy="56"
              r="6.75"
            />
            <circle
              className="wheel-details fill-white dark:fill-[#2c2c2c]"
              cx="18"
              cy="56"
              r="3.12"
            />
            <circle
              className="fill-red-600 dark:fill-red-500"
              cx="18"
              cy="56"
              r="1.85"
            />
            <path
              className="wheel-details fill-white dark:fill-[#2c2c2c]"
              d="M18.05,51.11a4.39,4.39,0,0,1,2,.26l.47.21.45.25.41.31.39.34a4.92,4.92,0,0,1,1.1,1.71,4.42,4.42,0,0,1,.27,2,.15.15,0,0,1-.16.13.16.16,0,0,1-.13-.13h0a5.73,5.73,0,0,0-.49-1.79,5.05,5.05,0,0,0-1-1.48,5.33,5.33,0,0,0-1.49-1,5.86,5.86,0,0,0-1.78-.48h0a.15.15,0,0,1-.13-.16A.14.14,0,0,1,18.05,51.11Z"
            />
          </g>
          <g className="wheel front-wheel fly-wheel-2  ">
            <circle
              className="fill-red-600 dark:fill-red-500"
              cx="59"
              cy="56"
              r="6.75"
            />
            <circle
              className="wheel-details fill-white dark:fill-[#2c2c2c]"
              cx="59"
              cy="56"
              r="3.12"
            />
            <circle
              className="fill-red-600 dark:fill-red-500"
              cx="59"
              cy="56"
              r="1.85"
            />
            <path
              className="wheel-details fill-white dark:fill-[#2c2c2c]"
              d="M59.27,51.11a4.39,4.39,0,0,1,2,.26l.47.21.44.25.42.31.38.34a5,5,0,0,1,1.11,1.71,4.56,4.56,0,0,1,.26,2,.14.14,0,0,1-.16.13.16.16,0,0,1-.13-.13h0a5.71,5.71,0,0,0-.48-1.79,5.28,5.28,0,0,0-1-1.48,5.14,5.14,0,0,0-1.48-1,6,6,0,0,0-1.78-.48h0a.14.14,0,0,1-.12-.16A.13.13,0,0,1,59.27,51.11Z"
            />
          </g>

          <line
            className="line line-floor stroke-red-600 dark:stroke-red-500 animate-line-floor"
            x1="110.5"
            y1="62.43"
            x2="-30.5"
            y2="62.43"
          />
       
           
   
 
  <path
    className="cloud fill-red-600 dark:fill-red-500 animate-cloud translate-y-[-10px] scale-90 "
    style={{animationDuration: "16s" }}
    d="M71,26.15a3.37,3.37,0,0,0-3.29-2.65,2.11,2.11,0,0,0-.36,0,5,5,0,0,0-9.73,1.32,3.75,3.75,0,0,0-.82-.09,3.83,3.83,0,0,0-.08,7.65H70.87A3.13,3.13,0,0,0,71,26.15Z"
  />
  {/* Хмара 3 */}
  <path

    className="cloud fill-red-600 dark:fill-red-500 animate-cloud translate-y-[7px] scale-85 "
    style={{  animationDuration: "8s" }}
    d="M71,26.15a3.37,3.37,0,0,0-3.29-2.65,2.11,2.11,0,0,0-.36,0,5,5,0,0,0-9.73,1.32,3.75,3.75,0,0,0-.82-.09,3.83,3.83,0,0,0-.08,7.65H70.87A3.13,3.13,0,0,0,71,26.15Z"
  />
        </svg>
    <div className="w-[90%] text-black  lg:w-96 flex flex-col items-center lg:items-end text-center lg:text-right h-[420px]">
  <div className="text-[15vw] lg:text-9xl font-bold dark:text-white mb-8">404</div>
  <div className="text-[5vw] lg:text-2xl font-bold dark:text-white mb-4">Oops, Car broke down 🚗💥!</div>
  <div className="text-[3vw] lg:text-sm dark:text-white mb-4">READY TO GET BACK ON TRACK?</div>
  <div className="w-full flex justify-center lg:justify-end mt-4 text-white">
  <Link to={"/"} className="rounded-md px-4 py-2 font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-transparent hover:to-transparent hover:text-red-500 border border-transparent hover:border-red-500 transition-all duration-200">
    Back to main page
  </Link>
</div>
</div>


      </div>
    </section>
  );
}
