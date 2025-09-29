import type {CarImageDto} from "@/features/types/Car.ts";

export interface UpdateCarCommand {
    id: number;
    modelId: number;
    mileage: number;
    year: number;
    vin: string;
    location: string;
    exteriorColor: string;
    interiorColor: string;
    engine: string;
    drivetrainId: number | null;
    transmissionId: number | null;
    bodyStyleId: number | null;
    speeds: number;
    highlights: string;
    serviceHistory: string;
    equipment: string;
    flaws: string;
    modifications: string;
    otherItems: string;
    ownershipHistory: string;
    sellerNotes: string;
    videoLinks: string;
    auctionId: number;
    startPrice: string;
    startTime: Date | null;
    endTime: Date | null;
    isInspected: boolean;
    about: string;
}

export interface ManagingAuctionPageDto {
    carId: number;
    carModelId: number;
    carBrandId: number;
    carMileage?: number;
    carYear?: number;
    carVin?: string;
    carLocation?: string;
    carExteriorColor?: string;
    carInteriorColor?: string;
    carEngine?: string;
    carDriveTrainId?: number;
    carTransmissionId?: number;
    carBodyStyleId?: number;
    carSpeeds?: number;
    carHighlights?: string;
    carServiceHistory?: string;
    carEquipment?: string;
    carFlaws?: string;
    carModifications?: string;
    carOtherItems?: string;
    carOwnershipHistory?: string;
    carSellerNotes?: string;
    carVideoLinks?: string;
    carAbout?: string;

    carMainPhotoUrl?: string;
    carInteriorPhotoUrls: CarImageDto[] | null;
    carExteriorPhotoUrls: CarImageDto[] | null;
    carOtherPhotoUrls: CarImageDto[] | null;

    auctionId: number;
    startTime?: string;
    endTime?: string;
    isInspected: boolean;
    startPrice?: number;
    sellerUsername: string;
}