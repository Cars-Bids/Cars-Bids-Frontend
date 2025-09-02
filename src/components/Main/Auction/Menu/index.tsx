import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { ChevronDown, ChevronLeft } from "lucide-react";
import "@/components/Main/Auction/Menu/menu.css"
export const MenuAuction = () => {
  const [Mileage, setMileage] = useState<string | undefined>(undefined);
  const [Transmission, setTransmission] = useState<string | undefined>(undefined);
    const [BodyType, setBodyType] = useState<string | undefined>(undefined);
  return (
    <div className="flex flex-row gap-2">
    <DropdownMenu>
      <DropdownMenuTrigger className="px-3 py-2 rounded-lg outline outline-1 outline-gray text-xs font-medium  text-black dark:text-white flex items-center justify-between gap-2 w-[120px]">
        <span>{Mileage || "Mileage"}</span>
        <ChevronDown className="w-4 h-4  text-black dark:text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white dark:bg-neutral-800  text-black dark:text-white rounded-md shadow-md">
        <DropdownMenuItem onClick={() => setMileage(undefined)}>All</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMileage("0-5000")}>0-5,000 km</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMileage("5000-10000")}>5,000-10,000 km</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setMileage("10000+")}>10,000+ km</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
     <DropdownMenu>
      <DropdownMenuTrigger className="px-3 py-2 rounded-lg outline outline-1 outline-gray text-xs font-medium  text-black dark:text-white flex items-center justify-between gap-2 w-[120px]">
        <span>{Transmission || "Transmission"}</span>
        <ChevronDown className="w-4 h-4  text-black dark:text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white dark:bg-neutral-800  text-black dark:text-white rounded-md shadow-md">
        <DropdownMenuItem onClick={() => setTransmission(undefined)}>All</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTransmission("0-5000")}>0-5,000 km</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTransmission("5000-10000")}>5,000-10,000 km</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTransmission("10000+")}>10,000+ km</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
     <DropdownMenu>
      <DropdownMenuTrigger className="px-3 py-2 rounded-lg outline outline-1 outline-gray text-xs font-medium  text-black dark:text-white flex items-center justify-between gap-2 w-[120px]">
        <span>{BodyType || "Body type"}</span>
        <ChevronDown className="w-4 h-4  text-black dark:text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white dark:bg-neutral-800  text-black dark:text-white rounded-md shadow-md">
        <DropdownMenuItem onClick={() => setBodyType(undefined)}>All</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setBodyType("0-5000")}>0-5,000 km</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setBodyType("5000-10000")}>5,000-10,000 km</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setBodyType("10000+")}>10,000+ km</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
};


import { Settings2 } from "lucide-react";

export const SettingsMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex item-end justify-end">
     
        {open ? (<ChevronLeft onClick={()=> setOpen((prev) => !prev)} className="w-5 h-5  text-black dark:text-white" />) : (<Settings2 onClick={()=> setOpen((prev) => !prev)} className="w-5 h-5 text-black dark:text-white" />)}
        
    

      {/* Випадаюче меню зліва */}
      {open && (
         <div className={`absolute -top-2 right-10    ${open ? 'animate-slide-in-left' : 'animate-slide-out-left'} z-50`}>
          <MenuAuction />
        </div>
      )}
    </div>
  );
};