import { type CarDto } from "@/features/types/Car";

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
  id: number;
  car: CarDto
  sellerId: number;
  startPrice: number;
  currentPrice: number;
  currentBidder?: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  approvedAt?: string;
  status: number;
}