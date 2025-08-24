export type Photo = { id: string; src: string; alt?: string };
export type Spec = { label: string; value: string };
export type LotSection = { title: string; bullets?: string[]; body?: string };
export type QA = { id: string; author: string; isSeller?: boolean; text: string; time: string };
export type Comment = { id: string; author: string; text: string; time: string };

export type Lot = {
  id: string;
  title: string;
  subtitle?: string;
  currentBidUSD: number;
  highBidder?: string;
  seller: string;
  endsAtISO: string;
  stats: { bids: number; views: number; watchers: number };
  hero: string;
  photos: Photo[];
  specsLeft: Spec[];
  specsRight: Spec[];
  about?: string;
  sections: LotSection[];
  qa: QA[];
  comments: Comment[];
  otherAuctions: Array<{ id: string; title: string; price?: string; thumb: string; meta?: string }>;
};

export const lots: Lot[] = [
{
  id: "1",
  title: "2013 BMW M3 Coupe",
  subtitle: "Supercharged V8, 45,800 miles, 6-speed manual",
  currentBidUSD: 12000,
  highBidder: "BMW_lover",
  seller: "Porsche_lover",
  endsAtISO: new Date(Date.now() + 72 * 3600000).toISOString(),
  stats: { bids: 3, views: 6457, watchers: 83 },
  hero: "https://images.unsplash.com/photo-1549921296-3a6b8d53d84f?q=80&w=1920&auto=format&fit=crop",
  photos: Array.from({ length: 8 }).map((_, i) => ({ id: `p${i}`, src: `https://picsum.photos/seed/m3-${i}/400/300` })),
  about: "The E92 BMW M3 stands out as the only M3 offered with a V8, delivering a distinctive character. This example features a 6‑speed manual and desirable options.",
  specsLeft: [
    { label: "Brand", value: "BMW" },
    { label: "Model", value: "E92 M3" },
    { label: "Mileage", value: "45,800" },
    { label: "VIN", value: "WBSKG9C55DP123456" },
    { label: "Title Status", value: "Clean (WA)" },
    { label: "Location", value: "Portland, OR" },
  ],
  specsRight: [
    { label: "Engine", value: "4.0L Supercharged V8" },
    { label: "Drivetrain", value: "RWD" },
    { label: "Transmission", value: "Manual (6‑speed)" },
    { label: "Body Style", value: "Coupe" },
    { label: "Exterior", value: "Melbourne Red" },
    { label: "Interior", value: "Black" },
  ],
  sections: [
    { title: "Highlights", bullets: ["Well‑kept E92 M3 in Melbourne Red over black interior", "Desirable 6‑speed manual gearbox", "Clean Carfax, documented service history"] },
    { title: "Recent Service History", bullets: ["Oil & filter, brake fluid, and differential service", "New tires and alignment", "Spark plugs and ignition coils replaced"] },
    { title: "Equipment", bullets: ["Premium Package", "Carbon roof", "Navigation", "Park Distance Control"] },
    { title: "Known Flaws", bullets: ["Small chips on front bumper", "Minor wheel rash"] },
    { title: "Modifications", bullets: ["Aftermarket exhaust", "Upgraded wheels"] },
    { title: "Ownership History", body: "Current owner since 2023; approximately 800 miles added." },
  ],
  qa: [
    { id: "q1", author: "M3Enthusiast", text: "Any clutch or rod bearing service?", time: "2h ago" },
    { id: "q2", author: "Seller", isSeller: true, text: "Rod bearings replaced at 42k with documentation.", time: "1h ago" },
  ],
  comments: [
    { id: "c1", author: "Porsche_lover", text: "Love this spec!", time: "30m ago" },
    { id: "c2", author: "WildSti", text: "Do you have the original cats?", time: "10m ago" },
  ],
  otherAuctions: [
    { id: "a1", title: "1986 Volkswagen Type 3", price: "$3,100", thumb: "https://picsum.photos/seed/oth1/400/300", meta: "Ends in 3d • 24 bids" },
    { id: "a2", title: "1977 Datsun Fairlady Z", price: "$12,600", thumb: "https://picsum.photos/seed/oth2/400/300", meta: "Ends in 1d • 12 bids" },
    { id: "a3", title: "2009 Mini Cooper S", price: "$6,900", thumb: "https://picsum.photos/seed/oth3/400/300", meta: "Ends in 5h • 8 bids" },
  ],
},

  {
    id: "2",
    title: "2015 BMW M77 Coupe",
    subtitle: "Supercharged V8, 45,800 miles, 6-speed manual",
    currentBidUSD: 12000,
    highBidder: "BMW_lover",
    seller: "Porsche_lover",
    endsAtISO: new Date(Date.now() + 72 * 3600000).toISOString(),
    stats: { bids: 3, views: 6457, watchers: 83 },
    hero: "https://images.unsplash.com/photo-1549921296-3a6b8d53d84f?q=80&w=1920&auto=format&fit=crop",
    photos: Array.from({ length: 8 }).map((_, i) => ({ id: `p${i}`, src: `https://picsum.photos/seed/m3-${i}/400/300` })),
    about: "The E92 BMW M3 stands out as the only M3 offered with a V8, delivering a distinctive character. This example features a 6‑speed manual and desirable options.",
    specsLeft: [
      { label: "Brand", value: "BMW" },
      { label: "Model", value: "E92 M3" },
      { label: "Mileage", value: "45,800" },
      { label: "VIN", value: "WBSKG9C55DP123456" },
      { label: "Title Status", value: "Clean (WA)" },
      { label: "Location", value: "Portland, OR" },
    ],
    specsRight: [
      { label: "Engine", value: "4.0L Supercharged V8" },
      { label: "Drivetrain", value: "RWD" },
      { label: "Transmission", value: "Manual (6‑speed)" },
      { label: "Body Style", value: "Coupe" },
      { label: "Exterior", value: "Melbourne Red" },
      { label: "Interior", value: "Black" },
    ],
    sections: [
      { title: "Highlights", bullets: ["Well‑kept E92 M3 in Melbourne Red over black interior", "Desirable 6‑speed manual gearbox", "Clean Carfax, documented service history"] },
      { title: "Recent Service History", bullets: ["Oil & filter, brake fluid, and differential service", "New tires and alignment", "Spark plugs and ignition coils replaced"] },
      { title: "Equipment", bullets: ["Premium Package", "Carbon roof", "Navigation", "Park Distance Control"] },
      { title: "Known Flaws", bullets: ["Small chips on front bumper", "Minor wheel rash"] },
      { title: "Modifications", bullets: ["Aftermarket exhaust", "Upgraded wheels"] },
      { title: "Ownership History", body: "Current owner since 2023; approximately 800 miles added." },
    ],
    qa: [
      { id: "q1", author: "M3Enthusiast", text: "Any clutch or rod bearing service?", time: "2h ago" },
      { id: "q2", author: "Seller", isSeller: true, text: "Rod bearings replaced at 42k with documentation.", time: "1h ago" },
    ],
    comments: [
      { id: "c1", author: "Porsche_lover", text: "Love this spec!", time: "30m ago" },
      { id: "c2", author: "WildSti", text: "Do you have the original cats?", time: "10m ago" },
    ],
    otherAuctions: [
      { id: "a1", title: "1986 Volkswagen Type 3", price: "$3,100", thumb: "https://picsum.photos/seed/oth1/400/300", meta: "Ends in 3d • 24 bids" },
      { id: "a2", title: "1977 Datsun Fairlady Z", price: "$12,600", thumb: "https://picsum.photos/seed/oth2/400/300", meta: "Ends in 1d • 12 bids" },
      { id: "a3", title: "2009 Mini Cooper S", price: "$6,900", thumb: "https://picsum.photos/seed/oth3/400/300", meta: "Ends in 5h • 8 bids" },
    ],
  }


];
