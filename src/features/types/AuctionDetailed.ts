export interface AuctionDetailed {
    auction: AuctionData;
    auctions: OtherAuction[];
    car: CarData;
    images: CarImageData[];
    qa: QAData[];
    comments: CommentData[];
}

export interface AuctionData {
    id: number;
    carId: number;
    seller?: string;
    status: string;
    sellerId: number;
    sellerPhoto?: string;
    currentPrice: number;
    currentBidder?: string;
    currentBidderId?: number;
    currentBidderPhoto?: string;
    startTime?: Date;
    endTime?: Date;
    bidsCount: number;
    viewsCount: number;
    watchersCount: number;
    isWatched: boolean;
    isSeller: boolean;
    isInspected: boolean;
}

export interface OtherAuction {
    id: number;
    mainPhoto?: string;
    currentPrice: number;
    startTime?: Date;
    endTime?: Date;
    isWatched: boolean;
    isInspected: boolean;
    location?: string;
    title: string;
    subtitle: string;
}

export interface CarData {
    id: number;
    year: number;
    model: string;
    brand: string;
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
    about?: string;

    videoLinks: string[];
    highlights: string;
    serviceHistory: string;
    equipment: string;
    flaws: string;
    modifications: string;
    otherItems: string;
    ownershipHistory: string;
    sellerNotes: string;
}

export interface CarImageData {
    id: number;
    imageUrl: string;
    imageCategory: string;
}

export interface QAData {
    id: number;
    question: string;
    answer?: string;
    authorId: number;
    author?: string;
    authorPhoto?: string;
}

export interface CommentData {
    id: number;
    createdAt: Date;
    text: string;
    replyTo?: string;
    authorId: number;
    author?: string;
    authorPhoto?: string;
    bid: number;
    upvotes: number;
}

export interface AddCommentRequest {
    auctionId: number;
    replyId: number | null;
    text: string;
}

export interface UpdateAuctionStatusRequest {
    id: number;
    status: string;
}

export interface AddQuestionRequest {
    auctionId: number;
    questionText: string;
}

export interface AddAnswerRequest {
    auctionId: number;
    questionId: number;
    answerText: string;
}

export interface AddToWishListRequest {
    auctionId: number;
}

export interface RemoveFromWishListRequest {
    auctionId: number;
}