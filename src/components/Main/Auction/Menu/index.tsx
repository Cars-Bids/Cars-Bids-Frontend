import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { ChevronDown, ChevronLeft } from "lucide-react";
import "@/components/Main/Auction/Menu/menu.css"
import { useGetStylesQuery } from "@/features/api/endpoints/BodyStyle"; // <-- Add the correct import path here

interface MenuAuctionProps {
  filters: {
    mileage?: string;
    transmission?: string;
    bodyType?: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      mileage?: string;
      transmission?: string;
      bodyType?: string;
    }>
  >;
}

export const MenuAuction = ({ filters, setFilters }: MenuAuctionProps) => {

  const {data: bodyStyle} = useGetStylesQuery();
  console.log(bodyStyle);
  return (
    <div className="flex flex-row gap-2">
    <DropdownMenu>
      <DropdownMenuTrigger className="px-3 py-2 rounded-lg outline outline-1 outline-gray text-[11px] font-medium  text-black dark:text-white flex items-center justify-between gap-2 w-[160px]">
        <span>{filters.mileage || "Mileage"}</span>
        <ChevronDown className="w-4 h-4  text-black dark:text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white dark:bg-neutral-800  text-black dark:text-white rounded-md shadow-md">
        <DropdownMenuItem onClick={() => setFilters((f) => ({ ...f, mileage:undefined}))}>All</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilters((f) => ({ ...f, mileage: "0-5000" }))}>0-5,000 km</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilters((f) => ({ ...f, mileage: "5000-10000" }))}>5,000-10,000 km</DropdownMenuItem>
     
      </DropdownMenuContent>
    </DropdownMenu>
     <DropdownMenu>
      <DropdownMenuTrigger className="px-3 py-2 rounded-lg outline outline-1 outline-gray text-[11px] font-medium  text-black dark:text-white flex items-center justify-between gap-2 w-[160px]">
        <span>{filters.transmission || "Transmission"}</span>
        <ChevronDown className="w-4 h-4  text-black dark:text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white dark:bg-neutral-800  text-black dark:text-white rounded-md shadow-md">
        <DropdownMenuItem onClick={() => setFilters((f) => ({ ...f, transmission: undefined }))}>All</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilters((f) => ({ ...f, transmission: "Manual" }))}>Manual</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilters((f) => ({ ...f, transmission: "Automatic" }))}>Automatic</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
     <DropdownMenu>
      <DropdownMenuTrigger className="px-3 py-2 rounded-lg outline outline-1 outline-gray text-[11px] font-medium  text-black dark:text-white flex items-center justify-between gap-2 w-[160px]">
        <span>{filters.bodyType || "Body type"}</span>
        <ChevronDown className="w-4 h-4  text-black dark:text-white" />
      </DropdownMenuTrigger>
    <DropdownMenuContent className="bg-white dark:bg-neutral-800 text-black dark:text-white rounded-md shadow-md">
  <DropdownMenuItem onClick={() => setFilters((f) => ({ ...f, bodyType: undefined }))}>
    All
  </DropdownMenuItem>

  {bodyStyle?.items.map((st: any) => (
    <DropdownMenuItem
      key={st.id}
      onClick={() => setFilters((f) => ({ ...f, bodyType: st.styleName }))}
    >
      {st.styleName}
    </DropdownMenuItem>
  ))}
</DropdownMenuContent>

    </DropdownMenu>
    </div>
  );
};


import { Settings2 } from "lucide-react";

export const SettingsMenu = ({ filters, setFilters }: MenuAuctionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
    <div className="relative flex item-end justify-end z-40">
     
        {open ? (<ChevronLeft onClick={()=> setOpen((prev) => !prev)} className="w-5 h-5  text-black dark:text-white" />) : (<Settings2 onClick={()=> setOpen((prev) => !prev)} className="w-5 h-5 text-black dark:text-white" />)}
        
    

      {/* Випадаюче меню зліва */}
      {open && (
         <div className={`absolute -top-2 right-10    ${open ? 'animate-slide-in-left' : 'animate-slide-out-left'} z-50`}>
          <MenuAuction filters={filters} setFilters={setFilters} />
        </div>
      )}
    </div>
    </div>
  );
};