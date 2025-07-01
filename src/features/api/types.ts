
// types.ts
export interface Style {
    id: number;
    styleName: string;
};
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
export interface Model{
    id: number;
    makeId: number;
    name: string;
}
export interface CreateModel {
  makeId: number;
  name: string;
}
export interface RegisterData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  image: File | null; 
}
export interface LoginRequest {
  username: string;
  password: string;
}
export interface AuthResponse {
  AccessToken: string;
  RefreshToken: string;
}
export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;

}
export interface RefreshTokenRequest {
  refreshToken: string;
}
export interface Profile {
  id: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
  createdAt: string; 
}
export interface ProfileUpdateRequest {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePictureUrl: string;
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