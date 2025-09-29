export interface AuctionWishlistDto {
  id: number;
  car: CarNewDto; 
  sellerId: number;
  startPrice: number;
  currentPrice: number;
  currentBidder?: string;
  startTime: string;
  endTime: string | Date;
  createdAt: string;
  isInspected: boolean;
  approvedAt?: string;
  status: string | number;
  makeName: string;
  modelName: string;
  engine: string; 
  numberOfGears: number;
  transmission: string;
  mainImage: string;
  year: number;
  location: string;
  currentBid?: number;
}

export interface CarNewDto {
  id: number;
  year: number;
  make: string;
  model: string;
  vin: string;
  mileage: number;
  location?: string;
  seller?: string;
  sellerPhoto?: string;
  engine?: string;
  drivetrain?: string;
  transmissionType: string;
  bodyStyle?: string;
  exteriorColor?: string;
  interiorColor?: string;
  titleStatus?: string;
  sellerType?: string;
  title: string;
  subtitle: string;
  videoLinks: string[];
  highlights: string[];
  serviceHistory: string[];
  equipment: string[];
  flaws: string[];
  modifications: string[];
  otherItems: string[];
  ownershipHistory: string[];
  sellerNotes: string[];
  mainImageUrl?: string;
  description?: string;
}

export interface WishlistDto {
  id: number;
  userId: number;
  auctionId: number;
  auction?: AuctionWishlistDto;
}

export interface SavedSearchDto {
  id: number;
  userId: number;
  modelId?: number | null;
  modelName?: string | null;
  makeId: number;
  makeName?: string | null;
  firstAuction?: AuctionWishlistDto | null;
  totalMatchingAuctions: number;
}

export interface WishlistFilteredDto {
  id: number;
  auctionId: number;
  auction: AuctionWishlistDto;
}
