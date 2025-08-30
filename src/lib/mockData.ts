export type Photo = { id: string; src: string; alt?: string };
export type Spec = { label: string; value: string };
export type LotSection = { title: string; bullets?: string[]; body?: string };
export type QA = { id: string; author: string; isSeller?: boolean; question: string; time: Date; answer: string; };
export type Comment = { id: string; author: string; text: string; time: Date };

export type Lot = {
  id: string;
  title: string;
  subtitle?: string;
  currentBidUSD: number;
  highBidder?: string;
  seller: string;
  endsAt: Date;
  stats: { bids: number; views: number; watchers: number };
  photos: Photo[];
  specs: Spec[];
  about?: string;
  sections: LotSection[];
  qa: QA[];
  comments: Comment[];
  otherAuctions: Array<{ id: string; title: string; subtitle?: string; price: number; thumb: string; meta?: string }>;
};

export const lots: Lot[] = [
{
  id: "1",
  title: "2013 BMW M3 Coupe",
  subtitle: "Supercharged V8, 45,800 miles, 6-speed manual",
  currentBidUSD: 12000,
  highBidder: "BMW_lover",
  seller: "Porsche_lover",
  endsAt: new Date(Date.now() + 72 * 3600000),
  stats: { bids: 3, views: 6457, watchers: 83 },
  photos: [
    { id: "p0", src: "https://cdn1.riastatic.com/photosnew/auto/photo/bmw_m6__602359456hd.webp", alt: "Photo 1" },
    { id: "p1", src: "https://cdn2.riastatic.com/photosnew/auto/photo/bmw_m6__602359462hd.webp", alt: "Photo 2" },
    { id: "p2", src: "https://cdn0.riastatic.com/photosnew/auto/photo/bmw_m6__602359470hd.webp", alt: "Photo 3" },
    { id: "p3", src: "https://cdn4.riastatic.com/photosnew/auto/photo/bmw_m6__602359479hd.webp", alt: "Photo 4" },
    { id: "p4", src: "https://cdn4.riastatic.com/photosnew/auto/photo/bmw_m6__602359484hd.webp", alt: "Photo 5" },
    { id: "p5", src: "https://cdn4.riastatic.com/photosnew/auto/photo/bmw_m6__602359499hd.webp", alt: "Photo 6" },
    { id: "p6", src: "https://cdn3.riastatic.com/photosnew/auto/photo/bmw_m6__602359498hd.webp", alt: "Photo 7" },
    { id: "p7", src: "https://cdn4.riastatic.com/photosnew/auto/photo/bmw_m6__602359494hd.webp", alt: "Photo 8" },
  ],
  about: "The E92 BMW M3 stands out as the only M3 offered with a V8, delivering a distinctive character. This example features a 6‑speed manual and desirable options.",
  specs: [
    { label: "Brand", value: "BMW" },
    { label: "Model", value: "E92 M3" },
    { label: "Mileage", value: "45,800" },
    { label: "VIN", value: "WBSKG9C55DP123456" },
    { label: "Title Status", value: "Clean (WA)" },
    { label: "Location", value: "Portland, OR" },
    { label: "Engine", value: "4.0L Supercharged V8" },
    { label: "Drivetrain", value: "RWD" },
    { label: "Transmission", value: "Manual (6‑speed)" },
    { label: "Body Style", value: "Coupe" },
    { label: "Exterior", value: "Melbourne Red" },
    { label: "Interior", value: "Black" }
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
    { id: "q1", author: "M3Enthusiast", question: "Any clutch or rod bearing service?", time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), answer: "Yeeeesss!!!!" },
    { id: "q2", author: "Seller", isSeller: true, question: "Rod bearings replaced at 42k with documentation.", time: new Date(Date.now() - 2 * 60 * 60 * 1000), answer: "Yeeeesss!!!!" },
  ],
  comments: [
    { id: "c1", author: "Porsche_lover", text: "Love this spec!", time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    { id: "c2", author: "WildSti", text: "Do you have the original cats?", time: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  ],
  otherAuctions: [
    { id: "a1", title: "1986 Volkswagen Type 3", subtitle: "Supercharged V8, 45,800 miles, 6-speed manual", price: 3100, thumb: "https://cdn1.riastatic.com/photosnew/auto/photo/bmw_m6__602359456hd.webp", meta: "Ends in 3d • 24 bids" },
    { id: "a2", title: "1977 Datsun Fairlady Z", subtitle: "Supercharged V8, 45,800 miles, 6-speed manual", price: 12600, thumb: "https://cdn1.riastatic.com/photosnew/auto/photo/bmw_m6__602359456hd.webp", meta: "Ends in 1d • 12 bids" },
    { id: "a3", title: "2009 Mini Cooper S", subtitle: "Supercharged V8, 45,800 miles, 6-speed manual", price: 6900, thumb: "https://cdn1.riastatic.com/photosnew/auto/photo/bmw_m6__602359456hd.webp", meta: "Ends in 5h • 8 bids" },
  ],
}
];
