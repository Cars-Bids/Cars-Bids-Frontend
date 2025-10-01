import type {CarDto} from "@/features/types/Car.ts";
export interface Auction{
  id: number;
  make: string;
  model: string;
  year: number;
  description: string;
  startingPrice: number;
  currentBid: number;
  endTime: Date; // або Date, string
  mileage: number;
  status: string;
  vin: string;
  location: string;
  userId: number;
}


export interface AuctionDto {
  auctionId: number;
  engine: string;
  location: string;
  car: CarDto;
  sellerId: number;
  mileage: number;
  currentBid: number;
  currentBidder?: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  inspected: boolean;
  approvedAt?: string;
  status: number;
  mainImage?: string;
 transmission: string;
 makeName: string;
  modelName: string;
  year: number;
}