
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
  bio?: string;
  profilePictureUrl?: string;
  createdAt: string; 
  followersCount: number;
  followingCount: number;
}

export interface ProfileUpdateRequest {
  id: number;
  username: string;
  email: string;
  bio?: string;
  profilePicture?: File;
}

export interface UserBidsAndWinsDto {
  totalBids: number;
  totalWins: number;
}

export interface UserBiddedCarsDto {
  carId: number;
  carName: string;
  bidCount: number;
  lastBidAmount: number;
  bidTime: string;
  mainImage: string;
  engine: string;
  drivetrain: string;
  transmission: string;
  bodyStyle: string;
  exteriorColor: string;
  interiorColor: string;
}

export interface UserCommentDto {
  id: number;
  auctionId: number;
  carId: number;
  carName: string;
  text: string;
  createdAt: string;
  year: number;
  make: string;
  model: string;
  bodyStyle: string;
  mainImage: string;
  userName: string;
}

// export interface CommentDto {
//   id: number;
//   text: string;
//   authorName: string;
//   createdAt: string;
// }

export interface CommentDto {
  id: number;
  auctionId: number;
  userId: number;
  userName: string;
  text: string;
  createdAt: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateUserNotificationSettingDto {
  notificationTypeId: number;
  notificationTypeKey: string;
  sendEmail: boolean;
  sendInSite: boolean;
}