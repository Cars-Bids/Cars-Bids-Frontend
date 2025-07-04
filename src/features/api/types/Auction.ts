
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


