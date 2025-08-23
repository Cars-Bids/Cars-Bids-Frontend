
export interface RegisterData {
  email: string;
  username: string;
  password: string;

}
export interface LoginRequest {
email: string;
  password: string;
}
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
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