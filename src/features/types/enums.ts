export const AuctionStatus = {
  Pending: 0,
  Active: 1,
  Sold: 2,
  NotSold: 3,
  Cancelled: 4,
} as const;
export type AuctionStatus = typeof AuctionStatus[keyof typeof AuctionStatus];

export const CarStatus = {
  InPending: 0,
  Canceled: 1,
  InReview: 2,
  Approved: 3,
} as const;
export type CarStatus = typeof CarStatus[keyof typeof CarStatus];

export const CommentTabEnum = {
  Newest: 0,
  MostUpvoted: 1,
  SellerComments: 2,
  BidHistory: 3,
} as const;
export type CommentTabEnum = typeof CommentTabEnum[keyof typeof CommentTabEnum];

export const DrivetrainType = {
  FWD: 0,
  RWD: 1,
  AWD: 2,
} as const;
export type DrivetrainType = typeof DrivetrainType[keyof typeof DrivetrainType];

export const ImageCategory = {
  Main: 0,
  Exterior: 1,
  Interior: 2,
  Other: 3,
} as const;
export type ImageCategory = typeof ImageCategory[keyof typeof ImageCategory];

export const NotificationSource = {
  Auction: 0,
  AuctionBid: 1,
  AuctionComment: 2,
  Profile: 3,
  Search: 4,
  Community: 5,
  CommunityComment: 6,
  None: 7,
} as const;
export type NotificationSource =
  typeof NotificationSource[keyof typeof NotificationSource];

export const TransmissionType = {
  Automatic: 0,
  Manual: 1,
} as const;
export type TransmissionType =
  typeof TransmissionType[keyof typeof TransmissionType];
