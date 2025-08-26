import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLang } from "@/features/api/Slices/LangSlice";

const supportedLangs = ["EN", "UA", "PL"];

export function useLangFromURL() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [lang, setLangState] = useState("EN");
useEffect(() => {
  const firstSegment = location.pathname.split("/")[1].toUpperCase();


  let newLang = localStorage.getItem("lang") ||"EN";

  if (supportedLangs.includes(firstSegment)) {
    newLang = firstSegment;
  } 
  

  setLangState(newLang);
  localStorage.setItem("lang", newLang);
  dispatch(setLang(newLang));
}, [location.pathname, dispatch]);


  return lang;
}
