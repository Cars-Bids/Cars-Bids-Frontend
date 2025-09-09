export const TransmissionType = {
  Manual: 0,
  Automatic: 1,
} as const;

export type TransmissionType = (typeof TransmissionType)[keyof typeof TransmissionType];

export const AuctionStatus = {
  Pending: "Pending",
  Active: "Active",
  Finished: "Finished",
} as const;

export type AuctionStatus = (typeof AuctionStatus)[keyof typeof AuctionStatus];

export interface CarPreviewDto {
  description?: string;
  location?: string;
  transmissionType: TransmissionType;
  mileage: number;
  year: number;
  model?: string | null;
  make?: string | null;
  mainImageUrl?: string | null;
}

export interface AuctionDto {
  id: number;
  carId: number;
  sellerId: number;
  isInspected: boolean;
  startPrice: number;
  currentPrice: number;
  currentBidder?: string | null;
  startTime: string;
  endTime: string;
  status: AuctionStatus;
  car: CarPreviewDto;
}

export interface PaginatedAuctions {
  items: AuctionDto[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
