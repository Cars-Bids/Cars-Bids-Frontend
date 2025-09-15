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