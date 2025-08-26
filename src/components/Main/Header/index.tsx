import { useState, useEffect, useRef } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, User, Bell, Sun, Moon } from "lucide-react";
import { AuthPopup } from "../Modal";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { setActiveItem } from "@/features/api/Slices/navSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "@/features/api/Slices/authSlice";
import { clearTokens } from "@/features/api/Auth/authService";
import {
  setStep,
  setResetTokeAndEmail,
} from "@/features/api/Slices/authModalSlice";

import { apiSlice } from "@/features/api/Slices/apiSlice";
import { useGetProfileQuery } from "@/features/api/endpoints/Profile";
import LangMenu from "@/components/MenuLang";

import { Links } from "@/components/Main/Links";
export default function Navbar() {
  {
    /*UseState */
  }
  const [search, setSearch] = useState("");

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLangOpen, setisLangOpen] = useState(false);

  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  {
    /*Ref`s*/
  }
  const profileRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const langTriggerRef = useRef<HTMLDivElement>(null);

  {
    /*Redux */
  }
  const dispatch = useDispatch<AppDispatch>();
  const activeItem = useSelector((state: RootState) => state.navbar.activeItem);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuth);
 
  {
    /*Routes */
  }
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  {
    /*RTK Queue */
  }
  const { data: profile } = useGetProfileQuery(undefined, {
    skip: !isAuthenticated,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  {
    /*Handlers*/
  }
  const handleLogout = () => {
    console.log("Logout clicked");
    dispatch(logout());
    dispatch(apiSlice.util.resetApiState());
    clearTokens();
    navigate("/");
  };
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  const handleLinkClick = (link: string) => {
    dispatch(setActiveItem(link));
    setIsSheetOpen(false);
  };

  {
    /*UseEffects */
  }
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const mail = params.get("mail");

    if (token && mail) {
      dispatch(setResetTokeAndEmail({ email: mail, token: token }));
      dispatch(setStep("resetMail"));
      setIsLoginOpen(true);
    }
  }, [location.search, dispatch]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isSheetOpen &&
        sheetRef.current &&
        !sheetRef.current.contains(event.target as Node)
      ) {
        setIsSheetOpen(false);
      }

      const profileRefs = [profileRef, triggerRef];
      if (
        isProfileOpen &&
        !profileRefs.some((ref) => ref.current?.contains(event.target as Node))
      ) {
        setIsProfileOpen(false);
      }
      const langRefs = [langMenuRef, langTriggerRef];
      if (
        isLangOpen &&
        !langRefs.some((ref) => ref.current?.contains(event.target as Node))
      ) {
        setisLangOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSheetOpen, isProfileOpen, isLangOpen]);

  useEffect(() => {
  const routeToItemMap: { [key: string]: string } = {
    "/": "Auctions",
    "/sell-your-car": "Sell your car",
    "/whats-steria": "What’s Steria?",
    "/leaderboard": "Leaderboard",
  };

  const segments = location.pathname.split("/").slice(2); 
  const pathWithoutLang = "/" + segments.join("/");

  const currentItem = routeToItemMap[pathWithoutLang] || "Auctions";
  console.log(currentItem);
  dispatch(setActiveItem(currentItem));
}, [location.pathname, dispatch]);

  const menuItems = [
    { name: "Auctions", path: "/" },
    { name: "Sell your car", path: "/sell-your-car" },
    { name: "What’s Steria?", path: "#" },
    { name: "Leaderboard", path: "#" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-white to-white dark:from-neutral-900 dark:to-neutral-800 text-white dark:text-gray-200 px-4 py-3 shadow-md backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <svg
            width="1510"
            height="258"
            viewBox="0 0 1510 258"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-28 h-7 sm:w-32 sm:h-8 md:w-36 md:h-9 lg:w-40 lg:h-10"
            preserveAspectRatio="xMidYMid meet"
          >
            <g clipPath="url(#clip0_2_14)">
              <path
                d="M381.622 257.567H319.304L226.556 150.107H84.8291V106.827H296.377C302.63 106.405 308.466 104.927 313.259 102.816C318.262 100.916 323.055 97.9599 327.015 94.1597C327.64 93.7375 328.057 93.1041 328.474 92.4707C332.017 88.8817 334.518 84.8704 335.977 80.648C338.27 74.3144 339.312 68.8253 339.312 62.9139V56.3692C339.312 52.7801 338.27 50.2467 337.853 49.6133C337.228 47.7132 335.977 46.0243 334.518 45.1798C333.268 44.1242 331.392 43.2797 329.933 43.2797H328.266C328.266 43.2797 327.015 43.0686 326.39 43.0686H169.657V0H326.39C336.811 0 345.356 1.90008 352.234 5.48913C359.737 9.50042 365.156 14.1451 369.533 19.6342C373.91 25.5456 377.036 31.6681 378.704 37.7906C380.788 44.1242 381.622 50.2467 381.622 56.158V62.9139C381.622 72.8365 380.371 81.9147 378.079 90.1484L377.662 91.6263C374.744 100.704 371.409 107.883 367.241 113.794C361.822 120.972 357.028 126.039 351.817 130.261C346.19 134.484 340.146 138.495 333.476 141.662C326.39 144.829 320.346 146.729 314.093 147.784C308.257 149.262 302.213 150.107 296.169 150.107H290.125L381.83 257.567H381.622Z"
                fill="#ED2829"
              />
              <path
                d="M237.392 214.498V257.567H64.1939C57.7328 257.567 50.8549 256.3 43.1433 253.978C35.8485 251.867 28.7622 248.066 22.5096 243C16.0485 237.722 10.6295 230.966 6.46108 222.732C2.08422 214.498 0 204.365 0 192.331V56.158C0 50.0355 1.04211 43.913 3.12633 37.7906C4.7937 31.6681 7.92003 25.5456 12.2969 19.6342C16.6737 14.1451 22.0927 9.50042 29.5959 5.48913C36.2654 1.90008 45.0191 0 55.2318 0H127.137V43.0686H53.356C53.356 43.0686 52.3139 43.2797 51.897 43.2797C50.2297 43.2797 48.3539 44.1242 47.3117 44.9687C45.6444 46.0243 44.6023 47.5021 43.977 49.1911C42.9349 51.0911 42.3096 53.8357 42.3096 56.3692V192.331C42.518 199.298 44.3938 204.787 48.1454 208.587C51.897 212.598 57.5244 214.498 64.4023 214.498H237.392Z"
                fill="#DEDEDE"
                className="dark:fill-[#DEDEDE] fill-black"
              />
              <path
                d="M666.744 165.308C666.744 171.642 665.91 177.342 664.451 182.409C662.992 187.476 660.7 191.709 658.199 195.92C655.697 199.932 652.571 203.099 649.028 205.843C645.485 208.588 641.942 210.699 638.19 212.599C634.438 214.499 630.687 215.555 626.727 216.399C622.767 217.244 619.224 217.666 615.889 217.666H493.337V185.576H615.889C621.933 185.576 626.727 183.675 630.062 180.086C633.396 176.497 635.064 171.642 635.064 165.519C635.064 162.563 634.647 159.819 633.813 157.285C632.979 154.752 631.729 152.641 630.062 150.952C628.394 149.263 626.31 147.785 624.017 146.729C621.725 145.674 619.015 145.252 616.097 145.252H543.15C537.939 145.252 532.929 144.407 526.476 142.507C520.432 140.607 515.013 137.651 510.011 133.64C505.008 129.629 500.632 124.14 497.297 117.384C493.962 110.628 492.295 102.605 492.295 92.8937C492.295 83.1822 493.962 75.1596 497.297 68.4037C500.632 61.6479 505.008 56.3699 510.011 52.1475C515.013 47.925 520.64 44.9694 526.476 43.0693C532.312 41.1692 537.939 40.3247 543.15 40.3247H651.321V72.415H543.15C537.105 72.415 532.52 74.3151 528.977 77.9041C525.434 81.4932 523.975 86.5601 523.975 92.6826C523.975 98.8051 525.642 103.661 528.977 107.25C532.312 110.839 537.105 112.528 543.15 112.528H616.514C619.849 112.528 623.601 113.161 627.352 114.006C631.104 114.85 635.064 116.117 638.815 118.017C642.567 119.917 646.11 122.028 649.653 124.984C653.196 127.94 656.114 131.106 658.824 134.907C661.533 138.707 663.618 143.14 665.076 148.207C666.535 153.274 667.369 158.974 667.369 165.308H666.744Z"
                fill="#DEDEDE"
                className="dark:fill-[#DEDEDE] fill-black"
              />
              <path
                d="M849.528 72.415H779.498V217.666H747.818V72.415H677.788V40.3247H849.528V72.415Z"
                fill="#DEDEDE"
                className="dark:fill-[#DEDEDE] fill-black"
              />
              <path
                d="M1031.27 217.666H916.641C912.264 217.666 907.471 216.821 902.26 215.343C897.05 213.865 892.256 211.121 887.879 207.532C883.502 203.943 879.751 199.298 876.833 193.598C873.915 187.898 872.456 180.931 872.456 172.486V56.3697C872.456 54.0474 872.873 51.9361 873.706 50.0361C874.54 48.136 875.582 46.2359 877.041 44.758C878.5 43.2802 880.168 42.2246 882.043 41.3801C883.919 40.5356 886.212 40.1134 888.296 40.1134H1031.27V72.2037H903.928V172.275C903.928 176.497 904.97 179.664 907.262 181.986C909.555 184.309 912.681 185.364 916.85 185.364H1031.06V217.455L1031.27 217.666ZM1016.89 145.04H916.641V112.528H1016.89V145.04Z"
                fill="#DEDEDE"
                className="dark:fill-[#DEDEDE] fill-black"
              />
              <path
                d="M1236.78 99.8605C1236.78 107.25 1235.94 113.794 1234.07 119.495C1232.19 125.195 1229.9 130.262 1226.77 134.695C1223.65 139.129 1220.1 142.929 1216.14 146.096C1212.18 149.263 1208.02 151.796 1203.64 153.907C1199.26 156.019 1194.89 157.496 1190.51 158.341C1186.13 159.185 1181.96 159.608 1178 159.608L1244.28 217.666H1195.09L1128.82 159.608H1105.89V127.517H1177.8C1181.76 127.095 1185.51 126.251 1188.63 124.984C1191.76 123.717 1194.68 121.817 1197.18 119.495C1199.68 117.172 1201.35 114.428 1202.81 111.05C1204.26 107.672 1204.68 104.083 1204.68 99.8605V79.5929C1204.68 77.6928 1204.47 76.4261 1204.06 75.3705C1203.64 74.3149 1203.01 73.6815 1202.39 73.2593C1201.76 72.8371 1200.93 72.6259 1200.1 72.4148C1199.26 72.2037 1198.64 72.4148 1198.01 72.4148H1093.18V217.666H1061.5V56.3697C1061.5 54.0474 1061.91 51.9361 1062.75 50.0361C1063.58 48.136 1064.62 46.2359 1066.08 44.758C1067.54 43.2802 1069.21 42.2246 1071.08 41.3801C1072.96 40.5356 1075.25 40.1134 1077.34 40.1134H1197.8C1204.89 40.1134 1210.93 41.3801 1215.73 43.9136C1220.52 46.447 1224.48 49.8249 1227.61 53.6251C1230.73 57.4253 1232.82 61.8588 1234.28 66.2923C1235.74 70.7259 1236.36 75.1594 1236.36 78.9596V99.4382L1236.78 99.8605Z"
                fill="#DEDEDE"
                className="dark:fill-[#DEDEDE] fill-black"
              />
              <path
                d="M1300.76 217.666H1269.08V40.1134H1300.76V217.455V217.666Z"
                fill="#DEDEDE"
                className="dark:fill-[#DEDEDE] fill-black"
              />
              <path
                d="M1509.6 217.666H1477.92V174.175H1366.21V217.666H1334.53V128.995C1334.53 116.117 1336.82 104.083 1341.19 93.3159C1345.57 82.5488 1351.62 73.0484 1359.54 65.2369C1367.46 57.4255 1376.63 51.303 1387.26 46.8694C1397.89 42.4359 1409.56 40.3247 1422.27 40.3247H1493.76C1496.05 40.3247 1498.14 40.7469 1500.01 41.5914C1501.89 42.4359 1503.76 43.4915 1505.22 44.9694C1506.68 46.4472 1507.72 48.1362 1508.56 50.2474C1509.39 52.3586 1509.81 54.2587 1509.81 56.581V217.666H1509.6ZM1366.21 141.874H1477.92V72.415H1422.06C1422.06 72.415 1418.94 72.415 1415.81 72.8373C1412.68 73.2595 1409.14 73.8929 1404.97 74.9485C1400.8 76.0041 1396.43 77.9041 1392.05 80.2265C1387.67 82.5488 1383.3 85.9267 1379.54 90.1491C1375.79 94.3715 1372.67 99.6495 1370.17 105.983C1367.66 112.317 1366.41 119.917 1366.41 128.995V142.085L1366.21 141.874Z"
                fill="#ED2829"
              />
            </g>
            <defs>
              <clipPath id="clip0_2_14">
                <rect width="1509.6" height="257.567" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {menuItems.map((item) => (
            <Links
              key={item.name}
              to={item.path}
              onClick={() => handleLinkClick(item.name)}
              className={`hover:text-red-400 font-medium text-scaling dark:text-white text-black ${
                activeItem === item.name
                  ? "border-b-2 border-red-400 dark:border-red-400"
                  : ""
              }`}
            >
              {item.name}
            </Links>
          ))}
        </div>

        {/* Search & Sign Up & Theme Toggle */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2 bg-neutral-200 dark:bg-neutral-700 px-3 py-2 rounded-lg shadow-sm">
            <span className="text-gray-400 dark:text-gray-300">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
            </span>
            <Input
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-black dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-300 text-scaling"
              placeholder="Search for car or model"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div
            onClick={toggleTheme}
            className="p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-black dark:text-white rounded-lg transition-all duration-200"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </div>
          {isAuthenticated ? (
            <div className="inline-flex justify-start items-start gap-2 relative profile-trigger">
              <div className="p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-black dark:text-white rounded-lg transition-all duration-200">
                <Bell className="cursor-pointer" />
              </div>
              <div
                className="p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-black dark:text-white rounded-lg transition-all duration-200"
                ref={triggerRef}
              >
                <User
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="cursor-pointer"
                />
              </div>

              <div
                ref={profileRef}
                className={`profile-dropdown absolute top-14 left-0 bg-white dark:bg-neutral-900 rounded-xl px-6 py-5 inline-flex flex-col gap-4  shadow-extra-lg dark:shadow-non z-50  transform transition-all duration-200     ${
                  isProfileOpen
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 hidden"
                } `}
              >
                <Links
                  to={"/profile"}
                  className="self-stretch inline-flex justify-between items-center"
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                >
                  <div className="justify-start text-black dark:text-white font-medium text-base font-synonym hover:text-red-500">
                    Profile
                  </div>
                  <img
                    className="w-7 h-7 rounded-3xl relative"
                    src={
                      profile?.profilePictureUrl ||
                      `https://ui-avatars.com/api/?name=${profile?.username}?background=random`
                    }
                    alt="User Avatar"
                  />
                </Links>

                <div className="w-16 h-7 relative">
                  <div className="left-0 top-0 absolute justify-start text-black dark:text-white font-medium text-base font-synonym cursor-pointer hover:text-red-500 ">
                    Settings
                  </div>
                </div>
                <div className="w-32 h-7 relative">
                  <div className="left-0 top-0 absolute justify-start text-black dark:text-white font-medium text-base font-synonym cursor-pointer hover:text-red-500">
                    Seller dashboard
                  </div>
                </div>
                <div className="w-20 h-7 relative">
                  <div className="left-0 top-0 absolute justify-start text-black dark:text-white font-medium text-base font-synonym cursor-pointer hover:text-red-500">
                    Watchlist
                  </div>
                </div>
                <div onClick={handleLogout} className="w-16 h-7 relative">
                  <div className="left-0 top-0 absolute justify-start text-red-600 font-medium text-base font-synonym cursor-pointer hover:text-red-400">
                    Sign out
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Button
              onClick={() => setIsLoginOpen((prev) => !prev)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-transparent hover:to-transparent hover:text-red-500 hover:border hover:border-red-500 text-white dark:text-gray-200 font-semibold px-4 text-scaling-lg transition-all duration-200 border border-transparent"
            >
              Log In
            </Button>
          )}

          <LangMenu />
          <AuthPopup
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
          />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-3">
          {/* <Button
            onClick={toggleTheme}
            variant="ghost"
            size="icon"
            className="p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-400 rounded-lg transition-all duration-200"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button> */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="p-3 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-lg transition-all duration-200"
                aria-label="Open menu"
              >
                <Menu className="h-8 w-8 dark:text-white text-black" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="text-white bg-neutral-100 dark:bg-neutral-800 dark:text-gray-200 w-80 p-6 transition-transform duration-300 border-none"
              ref={sheetRef}
            >
              <div className="flex flex-col gap-6 mt-6">
                {/* Logo in Mobile Menu */}
                <Link to="/" className="mb-4">
                  <svg
                    width="112"
                    height="28"
                    viewBox="0 0 1510 258"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-32 h-8 sm:w-36 sm:h-9 drop-shadow-md"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g clipPath="url(#clip0_2_14)">
                      <path
                        d="M381.622 257.567H319.304L226.556 150.107H84.8291V106.827H296.377C302.63 106.405 308.466 104.927 313.259 102.816C318.262 100.916 323.055 97.9599 327.015 94.1597C327.64 93.7375 328.057 93.1041 328.474 92.4707C332.017 88.8817 334.518 84.8704 335.977 80.648C338.27 74.3144 339.312 68.8253 339.312 62.9139V56.3692C339.312 52.7801 338.27 50.2467 337.853 49.6133C337.228 47.7132 335.977 46.0243 334.518 45.1798C333.268 44.1242 331.392 43.2797 329.933 43.2797H328.266C328.266 43.2797 327.015 43.0686 326.39 43.0686H169.657V0H326.39C336.811 0 345.356 1.90008 352.234 5.48913C359.737 9.50042 365.156 14.1451 369.533 19.6342C373.91 25.5456 377.036 31.6681 378.704 37.7906C380.788 44.1242 381.622 50.2467 381.622 56.158V62.9139C381.622 72.8365 380.371 81.9147 378.079 90.1484L377.662 91.6263C374.744 100.704 371.409 107.883 367.241 113.794C361.822 120.972 357.028 126.039 351.817 130.261C346.19 134.484 340.146 138.495 333.476 141.662C326.39 144.829 320.346 146.729 314.093 147.784C308.257 149.262 302.213 150.107 296.169 150.107H290.125L381.83 257.567H381.622Z"
                        fill="#ED2829"
                      />
                      <path
                        d="M237.392 214.498V257.567H64.1939C57.7328 257.567 50.8549 256.3 43.1433 253.978C35.8485 251.867 28.7622 248.066 22.5096 243C16.0485 237.722 10.6295 230.966 6.46108 222.732C2.08422 214.498 0 204.365 0 192.331V56.158C0 50.0355 1.04211 43.913 3.12633 37.7906C4.7937 31.6681 7.92003 25.5456 12.2969 19.6342C16.6737 14.1451 22.0927 9.50042 29.5959 5.48913C36.2654 1.90008 45.0191 0 55.2318 0H127.137V43.0686H53.356C53.356 43.0686 52.3139 43.2797 51.897 43.2797C50.2297 43.2797 48.3539 44.1242 47.3117 44.9687C45.6444 46.0243 44.6023 47.5021 43.977 49.1911C42.9349 51.0911 42.3096 53.8357 42.3096 56.3692V192.331C42.518 199.298 44.3938 204.787 48.1454 208.587C51.897 212.598 57.5244 214.498 64.4023 214.498H237.392Z"
                        fill="#DEDEDE"
                        className="dark:fill-[#DEDEDE] fill-black"
                      />
                      <path
                        d="M666.744 165.308C666.744 171.642 665.91 177.342 664.451 182.409C662.992 187.476 660.7 191.709 658.199 195.92C655.697 199.932 652.571 203.099 649.028 205.843C645.485 208.588 641.942 210.699 638.19 212.599C634.438 214.499 630.687 215.555 626.727 216.399C622.767 217.244 619.224 217.666 615.889 217.666H493.337V185.576H615.889C621.933 185.576 626.727 183.675 630.062 180.086C633.396 176.497 635.064 171.642 635.064 165.519C635.064 162.563 634.647 159.819 633.813 157.285C632.979 154.752 631.729 152.641 630.062 150.952C628.394 149.263 626.31 147.785 624.017 146.729C621.725 145.674 619.015 145.252 616.097 145.252H543.15C537.939 145.252 532.929 144.407 526.476 142.507C520.432 140.607 515.013 137.651 510.011 133.64C505.008 129.629 500.632 124.14 497.297 117.384C493.962 110.628 492.295 102.605 492.295 92.8937C492.295 83.1822 493.962 75.1596 497.297 68.4037C500.632 61.6479 505.008 56.3699 510.011 52.1475C515.013 47.925 520.64 44.9694 526.476 43.0693C532.312 41.1692 537.939 40.3247 543.15 40.3247H651.321V72.415H543.15C537.105 72.415 532.52 74.3151 528.977 77.9041C525.434 81.4932 523.975 86.5601 523.975 92.6826C523.975 98.8051 525.642 103.661 528.977 107.25C532.312 110.839 537.105 112.528 543.15 112.528H616.514C619.849 112.528 623.601 113.161 627.352 114.006C631.104 114.85 635.064 116.117 638.815 118.017C642.567 119.917 646.11 122.028 649.653 124.984C653.196 127.94 656.114 131.106 658.824 134.907C661.533 138.707 663.618 143.14 665.076 148.207C666.535 153.274 667.369 158.974 667.369 165.308H666.744Z"
                        fill="#DEDEDE"
                        className="dark:fill-[#DEDEDE] fill-black"
                      />
                      <path
                        d="M849.528 72.415H779.498V217.666H747.818V72.415H677.788V40.3247H849.528V72.415Z"
                        fill="#DEDEDE"
                        className="dark:fill-[#DEDEDE] fill-black"
                      />
                      <path
                        d="M1031.27 217.666H916.641C912.264 217.666 907.471 216.821 902.26 215.343C897.05 213.865 892.256 211.121 887.879 207.532C883.502 203.943 879.751 199.298 876.833 193.598C873.915 187.898 872.456 180.931 872.456 172.486V56.3697C872.456 54.0474 872.873 51.9361 873.706 50.0361C874.54 48.136 875.582 46.2359 877.041 44.758C878.5 43.2802 880.168 42.2246 882.043 41.3801C883.919 40.5356 886.212 40.1134 888.296 40.1134H1031.27V72.2037H903.928V172.275C903.928 176.497 904.97 179.664 907.262 181.986C909.555 184.309 912.681 185.364 916.85 185.364H1031.06V217.455L1031.27 217.666ZM1016.89 145.04H916.641V112.528H1016.89V145.04Z"
                        fill="#DEDEDE"
                        className="dark:fill-[#DEDEDE] fill-black"
                      />
                      <path
                        d="M1236.78 99.8605C1236.78 107.25 1235.94 113.794 1234.07 119.495C1232.19 125.195 1229.9 130.262 1226.77 134.695C1223.65 139.129 1220.1 142.929 1216.14 146.096C1212.18 149.263 1208.02 151.796 1203.64 153.907C1199.26 156.019 1194.89 157.496 1190.51 158.341C1186.13 159.185 1181.96 159.608 1178 159.608L1244.28 217.666H1195.09L1128.82 159.608H1105.89V127.517H1177.8C1181.76 127.095 1185.51 126.251 1188.63 124.984C1191.76 123.717 1194.68 121.817 1197.18 119.495C1199.68 117.172 1201.35 114.428 1202.81 111.05C1204.26 107.672 1204.68 104.083 1204.68 99.8605V79.5929C1204.68 77.6928 1204.47 76.4261 1204.06 75.3705C1203.64 74.3149 1203.01 73.6815 1202.39 73.2593C1201.76 72.8371 1200.93 72.6259 1200.1 72.4148C1199.26 72.2037 1198.64 72.4148 1198.01 72.4148H1093.18V217.666H1061.5V56.3697C1061.5 54.0474 1061.91 51.9361 1062.75 50.0361C1063.58 48.136 1064.62 46.2359 1066.08 44.758C1067.54 43.2802 1069.21 42.2246 1071.08 41.3801C1072.96 40.5356 1075.25 40.1134 1077.34 40.1134H1197.8C1204.89 40.1134 1210.93 41.3801 1215.73 43.9136C1220.52 46.447 1224.48 49.8249 1227.61 53.6251C1230.73 57.4253 1232.82 61.8588 1234.28 66.2923C1235.74 70.7259 1236.36 75.1594 1236.36 78.9596V99.4382L1236.78 99.8605Z"
                        fill="#DEDEDE"
                        className="dark:fill-[#DEDEDE] fill-black"
                      />
                      <path
                        d="M1300.76 217.666H1269.08V40.1134H1300.76V217.455V217.666Z"
                        fill="#DEDEDE"
                        className="dark:fill-[#DEDEDE] fill-black"
                      />
                      <path
                        d="M1509.6 217.666H1477.92V174.175H1366.21V217.666H1334.53V128.995C1334.53 116.117 1336.82 104.083 1341.19 93.3159C1345.57 82.5488 1351.62 73.0484 1359.54 65.2369C1367.46 57.4255 1376.63 51.303 1387.26 46.8694C1397.89 42.4359 1409.56 40.3247 1422.27 40.3247H1493.76C1496.05 40.3247 1498.14 40.7469 1500.01 41.5914C1501.89 42.4359 1503.76 43.4915 1505.22 44.9694C1506.68 46.4472 1507.72 48.1362 1508.56 50.2474C1509.39 52.3586 1509.81 54.2587 1509.81 56.581V217.666H1509.6ZM1366.21 141.874H1477.92V72.415H1422.06C1422.06 72.415 1418.94 72.415 1415.81 72.8373C1412.68 73.2595 1409.14 73.8929 1404.97 74.9485C1400.8 76.0041 1396.43 77.9041 1392.05 80.2265C1387.67 82.5488 1383.3 85.9267 1379.54 90.1491C1375.79 94.3715 1372.67 99.6495 1370.17 105.983C1367.66 112.317 1366.41 119.917 1366.41 128.995V142.085L1366.21 141.874Z"
                        fill="#ED2829"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2_14">
                        <rect width="1509.6" height="257.567" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => handleLinkClick(item.name)}
                    className={`hover:text-red-400 font-medium py-2 border-b border-neutral-700 text-center sm:text-left text-black dark:text-white text-scaling ${
                      activeItem === item.name
                        ? "border-b-2 border-red-400 dark:border-red-400"
                        : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="mt-6">
                  <div className="flex items-center gap-2 bg-neutral-200 dark:bg-neutral-700 px-3 py-2 rounded-lg">
                    <span className="text-gray-400 dark:text-gray-300">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                        />
                      </svg>
                    </span>
                    <Input
                      className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 text-white dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-300 text-scaling"
                      placeholder="Search for car or model"
                      value={search}
                      tabIndex={-1}
                      autoFocus={false}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setIsLoginOpen(true)}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-transparent text-white dark:text-white hover:to-transparent hover:text-red-500 hover:border hover:border-red-500 dark:text-gray-200 font-semibold px-4 text-scaling-lg transition-all duration-200 border border-transparent"
                >
                  SignUp
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
