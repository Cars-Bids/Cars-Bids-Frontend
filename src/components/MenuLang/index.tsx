import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { type AppDispatch, type RootState } from "@/app/store";
import { setLang } from "@/features/api/Slices/LangSlice";
import { ChevronDown } from "lucide-react";
import {  useLocation, useNavigate } from "react-router-dom";



export default function LangMenu() {
  const [isLangOpen, setIsLangOpen] = useState(false);

  const langMenuRef = useRef<HTMLDivElement>(null);
  const langTriggerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const currentLang = useSelector((state: RootState) => state.lang.current);

  const navigate = useNavigate();
  const location = useLocation();

  const languages = [
    { short: "EN", full: "English" },
    { short: "UA", full: "Українська" },
    { short: "PL", full: "Polska" },
  ];


  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isLangOpen &&
        !langMenuRef.current?.contains(event.target as Node) &&
        !langTriggerRef.current?.contains(event.target as Node)
      ) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isLangOpen]);



const handleLangSelect = (langShort: string) => {

  dispatch(setLang(langShort));   
  localStorage.setItem("lang", langShort);

  const segments = location.pathname.split("/").slice(2);
  navigate(`/${langShort.toLowerCase()}/${segments.join("/")}`);
};

  return (
    <div className="relative inline-block">
      {/* Кнопка */}
      <div
        className="p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-black dark:text-white rounded-lg transition-all duration-200 cursor-pointer min-w-[80px]"
        ref={langTriggerRef}
        onClick={() => setIsLangOpen((prev) => !prev)}
      >
        <div className="inline-flex items-center gap-1 justify-between">
          <div className="text-gray text-base font-bold font-amulya whitespace-nowrap">
            {currentLang}
          </div>
          <ChevronDown className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
        </div>
      </div>

      {/* Меню */}
      <div
        ref={langMenuRef}
        className={`absolute top-14 left-0 rounded-xl px-6 py-5 flex flex-col gap-3 shadow-extra-lg dark:shadow-none z-50 transform transition-all duration-200
          ${isLangOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"} 
          bg-white dark:bg-neutral-900 min-w-[140px]`}
      >
        {languages.map((lang) => (
          <button
            key={lang.short}
            className="text-left text-black dark:text-white font-medium text-base font-synonym hover:text-red-500 whitespace-nowrap"
            onClick={() => handleLangSelect(lang.short)}
          >
            {lang.short} | {lang.full}
          </button>
        ))}

       
      </div>
    </div>
  );
}
