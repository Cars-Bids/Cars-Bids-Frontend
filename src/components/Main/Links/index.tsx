import { Link, type LinkProps } from "react-router-dom";
import { useSelector } from "react-redux";
import {type  RootState } from "@/app/store";

export function Links({ to, ...props }: LinkProps) {
    
  const currentLang = useSelector((state: RootState) => state.lang.current);
  const href = `/${currentLang.toLowerCase()}${to}`;
  return <Link to={href} {...props} />;
}
