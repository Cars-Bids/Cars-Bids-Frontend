
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