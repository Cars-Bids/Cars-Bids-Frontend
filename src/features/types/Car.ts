import type { AuctionDto } from "./Auction";

export interface Style {
    id: number;
    styleName: string;
};

export interface Model{
    id: number;
    makeId: number;
    name: string;
}
export interface CreateModel {
  makeId: number;
  name: string;
}

export interface Make{
  id: number;
  name: string;
}
export interface CarIMage{
  id: number;
  CardId: number;
  ImageUrl?: string;
  ImageCategory: number;
  OrderNumber: number;
  UploadedAt: Date;
}
export interface Car{
  id: number;
  Year: number;
  vin?: string;
  Description: string;
  ExteriorColor?: string;
  InteriorColor?: string;
  Mileage: number;
  Location?: string;
  Drivetrain: number;
  Engine?: string;
  TransmissionType: number;
  Speeds: number;
  Status: number;
  CreatedAt: Date;
  AssingId?: number| null;
  OwnerId: number;
  BodyStyleId: number;
  ModelId: number;
  Images: CarIMage[];
}

export interface RequestNewCarCommand {
    userId?: number;
    fullName: string;
    phone: string;
    vin: string;
    brandId: string;
    modelId: string;
    transmissionId: string;
    year: string;
    mileage: string;
    description: string;
    isOnSaleElsewhere: boolean;
    isModified: boolean;
    photos: File[];
}

export interface CarDto {
  id: number;
  name: string;
  year: number;
  mileage: number;
  make: string;
  model: string;
  description: string;
  location: string;
  bodyStyle?: string | null;
  drivetrain: number;
  transmissionType: number;
  exteriorColor: string;
  interiorColor: string;
  engine: string;
  status: number;
  mainImageUrl: string;
}

export interface ProfileInReviewCarDto {
  id: number;
  year: number;
  vin: string;
  exteriorColor: string | null;
  interiorColor: string | null;
  mileage: number;
  location: string | null;
  drivetrain: number;
  engine: string | null;
  transmissionType: number;
  speeds: number;
  status: number;
  createdAt: string;
  managerId: number | null;
  ownerId: number;
  bodyStyle: string | null;
  model: string;
  make: string;
  otherImage: string;
  auction: AuctionDto | null;
  chatId?: number | null;
}


export interface CarImageDto {
  id: number;
  carId: number;
  imageUrl: string;
  imageCategory: string;
  orderNumber: number;
  uploadedAt: string;
}