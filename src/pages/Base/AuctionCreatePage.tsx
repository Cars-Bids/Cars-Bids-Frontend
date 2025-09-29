import { Formik, Form, Field } from "formik";
import {Camera, Share2, Star, User } from "lucide-react";
import { SimpleInput } from "@/components/ui/simpleInput.tsx";
import { MarkdownInput } from "@/components/ui/MarkdownInput.tsx";
import { InlineAutoComplete } from "@/components/ui/InlineAutoComplete.tsx";
import {ToggleButton} from "@/components/ui/ToggleButton.tsx";
import {DateTimeRangeInput} from "@/components/ui/DateTimeInputField.tsx";
import CarFilesManager from "@/components/Main/Modal/CreateCar/CarFilesManager.tsx";
import {validationUpdateCarCommandSchema} from "@/components/Main/Modal/Validation";
import {useApproveAuctionByManagerMutation, useGetManagingAuctionQuery} from "@/features/api/endpoints/Auction.ts";
import {useParams} from "react-router-dom";
import {useEffect, useMemo, useState } from "react";
import {useGetMakesQuery} from "@/features/api/endpoints/Make.ts";
import {useGetModelsByMakeQuery} from "@/features/api/endpoints/Models.ts";
import {useGetStylesQuery} from "@/features/api/endpoints/BodyStyle.ts";
import type {CarImageDto} from "@/features/types/Car.ts";
import type {UpdateCarCommand} from "@/features/types/UpdateCarCommand.ts";
import {useUpdateCarMutation} from "@/features/api/endpoints/CarEndpoints.ts";

interface FormValues {
    brandId: number;
    modelId: number;
    mileage: string;
    year: string;
    vin: string;
    location: string;
    exteriorColor: string;
    interiorColor: string;
    engine: string;
    drivetrainId: number | null;
    transmissionId: number | null;
    bodyStyleId: number | null;
    speeds: string;
    highlights: string;
    serviceHistory: string;
    equipment: string;
    flaws: string;
    modifications: string;
    otherItems: string;
    ownershipHistory: string;
    sellerNotes: string;
    videoLinks: string;
    startPrice: string;
    startTime: Date | null;
    endTime: Date | null;
    isInspected: boolean;
    about: string;
}

type Option = { id: number; name: string; makeId?: number };

const TRANSMISSION_OPTIONS: Option[] = [
    { id: 0, name: "Automatic" },
    { id: 1, name: "Manual" },
];

const DRIVETRAIN_OPTIONS: Option[] = [
    { id: 0, name: "Front-Wheel Drive (FWD)" },
    { id: 1, name: "Rear-Wheel Drive (RWD)" },
    { id: 2, name: "All-Wheel Drive (AWD)" },
];

const defaultInitialValues: FormValues = {
    brandId: 0,
    modelId: 0,
    mileage: "",
    year: "",
    vin: "",
    location: "",
    exteriorColor: "",
    interiorColor: "",
    engine: "",
    drivetrainId: null,
    transmissionId: null,
    bodyStyleId: null,
    speeds: "",
    highlights: "",
    serviceHistory: "",
    equipment: "",
    flaws: "",
    modifications: "",
    otherItems: "",
    ownershipHistory: "",
    sellerNotes: "",
    videoLinks: "",
    startPrice: "",
    startTime: null,
    endTime: null,
    isInspected: false,
    about: "",
};

interface CarImageForUI {
    id: number;
    url: string;
    orderNumber: number;
}

export function CreateAuctionPage() {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState({
        submitting: false,
    });
    const [isManagerOpen, setIsManagerOpen] = useState(false);
    const [carImages, setCarImages] = useState<{
        mainPhoto: CarImageForUI[];
        interior: CarImageForUI[];
        exterior: CarImageForUI[];
        others: CarImageForUI[];
    }>({
        mainPhoto: [],
        interior: [],
        exterior: [],
        others: []
    });
    const [carVideos, setCarVideos] = useState<string[]>([]);

    // Add state for tracking current form values to control model queries
    const [currentBrandId, setCurrentBrandId] = useState<number>(0);
    const [hasChanges, setHasChanges] = useState<boolean>(false);

    const auctionId = Number(id);

    // Redux queries
    const { data, isLoading, isError } = useGetManagingAuctionQuery(auctionId);
    const { data: brands = [], isLoading: brandsLoading } = useGetMakesQuery();

    // Use currentBrandId for models query, not data?.carBrandId
    const { data: models = [], isLoading: modelsLoading } = useGetModelsByMakeQuery(
        currentBrandId || 0,
        { skip: !currentBrandId }
    );

    const { data: bodyStylesData, isLoading: bodyStylesLoading } = useGetStylesQuery();
    const [updateCar] = useUpdateCarMutation();
    const [approveAuction] = useApproveAuctionByManagerMutation();


    // Map bodyStyles to match Option interface
    const bodyStyles = useMemo(() => {
        if (!bodyStylesData?.items) return [];
        return bodyStylesData.items.map((style: any) => ({
            id: style.id,
            name: style.styleName
        }));
    }, [bodyStylesData]);

    // Convert server data to form format - memoized to prevent unnecessary recalculations
    const initialValues: FormValues = useMemo(() => {
        if (!data) return defaultInitialValues;

        const values = {
            brandId: data.carBrandId || 0,
            modelId: data.carModelId || 0,
            mileage: data.carMileage?.toString() || "",
            year: data.carYear?.toString() || "",
            vin: data.carVin || "",
            location: data.carLocation || "",
            exteriorColor: data.carExteriorColor || "",
            interiorColor: data.carInteriorColor || "",
            engine: data.carEngine || "",
            drivetrainId: data.carDriveTrainId ?? null,
            transmissionId: data.carTransmissionId ?? null,
            bodyStyleId: data.carBodyStyleId ?? null,
            speeds: data.carSpeeds?.toString() || "",
            highlights: data.carHighlights || "",
            serviceHistory: data.carServiceHistory || "",
            equipment: data.carEquipment || "",
            flaws: data.carFlaws || "",
            modifications: data.carModifications || "",
            otherItems: data.carOtherItems || "",
            ownershipHistory: data.carOwnershipHistory || "",
            sellerNotes: data.carSellerNotes || "",
            videoLinks: data.carVideoLinks || "",
            startPrice: data.startPrice?.toString() || "",
            startTime: data.startTime ? new Date(data.startTime) : null,
            endTime: data.endTime ? new Date(data.endTime) : null,
            isInspected: data.isInspected || false,
            about: data.carAbout || "",
        };

        // Set the current brand ID when data loads
        if (data.carBrandId && currentBrandId === 0) {
            setCurrentBrandId(data.carBrandId);
        }

        return values;
    }, [data, currentBrandId]);

    // Convert server images to component format
    useEffect(() => {
        if (data) {
            const convertImages = (images: CarImageDto[] | null) =>
                images ? images.map(img => ({
                    id: img.id,
                    url: img.imageUrl,
                    orderNumber: img.orderNumber
                })) : [];

            // Find main photo from all images or use carMainPhotoUrl
            const mainPhoto = data.carMainPhotoUrl ?
                [{ id: 0, url: data.carMainPhotoUrl, orderNumber: 1 }] :
                [];

            setCarImages({
                mainPhoto: mainPhoto,
                interior: convertImages(data.carInteriorPhotoUrls),
                exterior: convertImages(data.carExteriorPhotoUrls),
                others: convertImages(data.carOtherPhotoUrls)
            });

            // Parse video links (comma-separated string to array)
            const videoArray = data.carVideoLinks ?
                data.carVideoLinks.split(", ").filter(link => link.trim()) :
                [];
            setCarVideos(videoArray);
        }
    }, [data]);

    const handleSubmit = async (values: FormValues) => {
        if (!data) return;

        setLoading(prev => ({ ...prev, submitting: true }));

        try {
            // Convert video array back to comma-separated string
            const videoLinksString = carVideos.join(", ");

            const updateCommand: UpdateCarCommand = {
                id: data.carId,
                modelId: Number(values.modelId),
                mileage: Number(values.mileage),
                year: Number(values.year),
                vin: values.vin,
                location: values.location,
                exteriorColor: values.exteriorColor,
                interiorColor: values.interiorColor,
                engine: values.engine,
                drivetrainId: values.drivetrainId,
                transmissionId: values.transmissionId,
                bodyStyleId: values.bodyStyleId,
                speeds: Number(values.speeds),
                highlights: values.highlights,
                serviceHistory: values.serviceHistory,
                equipment: values.equipment,
                flaws: values.flaws,
                modifications: values.modifications,
                otherItems: values.otherItems,
                ownershipHistory: values.ownershipHistory,
                sellerNotes: values.sellerNotes,
                videoLinks: videoLinksString,
                auctionId: auctionId,
                startPrice: values.startPrice,
                startTime: values.startTime,
                endTime: values.endTime,
                isInspected: values.isInspected,
                about: values.about
            };

            await updateCar(updateCommand).unwrap();
            console.log("Car updated successfully");
        } catch (error) {
            console.error('Error updating car:', error);
        } finally {
            setLoading(prev => ({ ...prev, submitting: false }));
        }
    };

    // Watch for brand changes and handle model clearing
    const [prevBrandId, setPrevBrandId] = useState<number>(0);

    // Get current display values for title
    const getCurrentDisplayValues = (values: FormValues) => {
        const currentBrand = brands.find(b => b.id === values.brandId)?.name || '';
        const currentModel = models.find(m => m.id === values.modelId)?.name || '';
        const year = values.year || data?.carYear || '';
        const mileage = values.mileage || data?.carMileage || '';
        const engine = values.engine || data?.carEngine || '';
        const location = values.location || data?.carLocation || '';
        const drivetrainId = values.drivetrainId || data?.carDriveTrainId || null;
        const transmissionId = values.transmissionId || data?.carTransmissionId || null;
        const bodystyleId = values.bodyStyleId || data?.carBodyStyleId || null;

        return { currentBrand, currentModel, year, mileage, engine, location, drivetrainId, transmissionId, bodystyleId };
    };

    // Check if form values have changed from initial values
    const checkForChanges = (currentValues: FormValues, initialValues: FormValues) => {
        const fieldsToCheck = [
            'brandId', 'modelId', 'mileage', 'year', 'vin', 'location',
            'exteriorColor', 'interiorColor', 'engine', 'drivetrainId',
            'transmissionId', 'bodyStyleId', 'speeds', 'highlights',
            'serviceHistory', 'equipment', 'flaws', 'modifications',
            'otherItems', 'ownershipHistory', 'sellerNotes', 'videoLinks',
            'startPrice', 'isInspected', 'about'
        ];

        for (const field of fieldsToCheck) {
            if (currentValues[field as keyof FormValues] !== initialValues[field as keyof FormValues]) {
                return true;
            }
        }

        // Check date fields separately
        const currentStartTime = currentValues.startTime?.getTime();
        const initialStartTime = initialValues.startTime?.getTime();
        const currentEndTime = currentValues.endTime?.getTime();
        const initialEndTime = initialValues.endTime?.getTime();

        if (currentStartTime !== initialStartTime || currentEndTime !== initialEndTime) {
            return true;
        }

        return false;
    };

    // Show loading state while fetching data
    if (isLoading) {
        return (
            <div className="w-3/4 mx-auto flex justify-center items-center mt-20">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    // Show error state
    if (isError || !data) {
        return (
            <div className="w-3/4 mx-auto flex justify-center items-center mt-20">
                <div className="text-red-500 text-xl">Error loading auction data</div>
            </div>
        );
    }

    return (
        <div className="w-3/4 mx-auto flex flex-col gap-3 justify-between mt-5 mb-9">
            <Formik
                initialValues={initialValues}
                validationSchema={validationUpdateCarCommandSchema}
                onSubmit={handleSubmit}
                enableReinitialize={true}
            >
                {({ values, setFieldValue }) => {
                    const displayValues = getCurrentDisplayValues(values);

                    // Handle brand ID updates for models query
                    useEffect(() => {
                        if (values.brandId && values.brandId !== currentBrandId) {
                            setCurrentBrandId(values.brandId);
                            // Clear model when brand changes (but not on initial load)
                            if (currentBrandId !== 0) {
                                setFieldValue('modelId', 0);
                            }
                        }
                    }, [values.brandId, currentBrandId, setFieldValue]);

                    // Check for changes whenever values change
                    useEffect(() => {
                        const hasFormChanges = checkForChanges(values, initialValues);
                        setHasChanges(hasFormChanges);
                    }, [values]);

                    return (
                        <Form className="flex flex-col gap-3 text-black dark:text-white justify-between">
                            {/* Title + short info */}
                            <div>
                                <div className="flex justify-between">
                                    <p className="font-amulya text-2xl font-bold">
                                        {displayValues.year} {displayValues.currentBrand} {displayValues.currentModel}
                                    </p>
                                    <div className="flex justify-between gap-3">
                                        <button
                                            type="button"
                                            className="rounded-sm w-[95px] px-2 py-1.5 text-sm bg-[#212121] text-[#e9e9e9] transition-colors flex items-center justify-between gap-2.5"
                                        >
                                            <Star className="w-[15px]" />
                                            <span className="font-amulya font-bold text-base">Watch</span>
                                        </button>
                                        <button
                                            type="button"
                                            className="rounded-sm w-[95px] px-2 py-1.5 text-sm bg-[#212121] text-[#e9e9e9] transition-colors flex items-center justify-between gap-2.5"
                                        >
                                            <Share2 className="w-[15px]"/>
                                            <span className="font-amulya font-bold text-base">Share</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="font-synonym text-sm font-normal">
                                    {displayValues.engine}, ~{Number(displayValues.mileage)?.toLocaleString() || 0} Kilometres, {displayValues.location}
                                </div>
                            </div>

                            {/* Photo + Auction */}
                            <div className="flex gap-3">
                                <div className="w-2/3 bg-[#dedede] dark:bg-[#212121] h-[640px] flex flex-col justify-center ">
                                    <button onClick={() => setIsManagerOpen(true)}>
                                        <div className="hover:text-red-500 inline-block items-center transition-all duration-200">
                                            <Camera size={72} className="mx-auto"/>
                                            <span className="font-amulya font-medium text-center">Add photo</span>
                                        </div>
                                    </button>
                                </div>

                                <div className="w-1/3 flex flex-col px-3 py-4 bg-[#dedede] dark:bg-[#212121] justify-between gap-8">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-2.5">
                                            <span className="font-amulya font-medium text-xl">Enter start price</span>
                                            <Field name="startPrice">
                                                {({ field }: any) => (
                                                    <SimpleInput
                                                        {...field}
                                                        type="text"
                                                        placeholder="$ 12,000"
                                                        className="border bg-[#c7c7c7] dark:bg-[#2c2c2c] placeholder:font-synonym px-2.5 py-2.5 focus:border-red-500"
                                                    />
                                                )}
                                            </Field>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <span className="font-amulya font-bold text-lg">Seller</span>
                                            <div className="flex gap-2">
                                                <User className="h-[24px]"/>
                                                <span className="font-synonym">{data.sellerUsername}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* DateTime Range Picker */}
                                    <div>
                                        <DateTimeRangeInput
                                            startLabel="Start date & time"
                                            endLabel="Select end date"
                                            startValue={values.startTime}
                                            endValue={values.endTime}
                                            onStartChange={(date) => setFieldValue('startTime', date)}
                                            onEndChange={(date) => setFieldValue('endTime', date)}
                                        />

                                        <div className="flex items-center gap-2 mt-4">
                                            <ToggleButton name="isInspected" label="Inspected"/>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1 font-synonym ">
                                        <span className="font-semibold">About {displayValues.currentBrand} {displayValues.currentModel}</span>
                                        <MarkdownInput value={values.about}
                                                       onChange={(val) => setFieldValue("about", val)}
                                                       textareaClassName="bg-[#d0d0d0] dark:bg-[#2c2c2c] overflow-scroll max-h-[250px] min-h-[250px]"
                                                       previewClassName="dark:bg-[#2c2c2c] overflow-scroll h-[250px]"
                                                       placeholder="Enter short information about car " />
                                    </div>
                                </div>
                            </div>

                            {/* Car Info + btn */}
                            <div className="flex w-full gap-3">
                                <div className="flex flex-col gap-3 w-2/3">
                                    {/* Table */}
                                    <div className="flex gap-4.5 w-full">
                                        <div className="border w-full border-[#212121] dark:border-white grid grid-cols-[40%_60%] bg-[#c7c7c7] dark:bg-[#212121] rounded-lg">
                                            <span className="p-3 font-amulya font-bold text-lg">Brand</span>
                                            <div className="border-l border-[#212121] dark:border-[#d0d0d0] p-3">
                                                <InlineAutoComplete
                                                    name="brandId"
                                                    options={brands}
                                                    placeholder="Select brand"
                                                    isLoading={brandsLoading}
                                                />
                                            </div>

                                            <span className="p-3 font-amulya font-bold text-lg border-t border-[#212121] dark:border-[#d0d0d0]">Model</span>
                                            <div className="border-l border-t border-[#212121] dark:border-[#d0d0d0] p-3">
                                                <InlineAutoComplete
                                                    name="modelId"
                                                    options={models}
                                                    placeholder="Select model"
                                                    filterByMakeId={values.brandId ?? null}
                                                    isLoading={modelsLoading}
                                                    key={`model-${currentBrandId}`} // Force re-render when brand changes
                                                />
                                            </div>

                                            <span className="p-3 font-amulya font-bold text-lg border-t border-[#212121] dark:border-[#d0d0d0]">Mileage</span>
                                            <Field
                                                name="mileage"
                                                className="border-l border-t p-3 focus:outline-none bg-transparent border-[#212121] dark:border-[#d0d0d0]"
                                                placeholder="Enter mileage"
                                                type="text"
                                            />

                                            <span className="p-3 font-amulya font-bold text-lg border-t border-[#212121] dark:border-[#d0d0d0]">VIN</span>
                                            <Field
                                                name="vin"
                                                className="border-l border-t p-3 focus:outline-none bg-transparent border-[#212121] dark:border-[#d0d0d0]"
                                                placeholder="Enter VIN"
                                                type="text"
                                            />

                                            <span className="p-3 font-amulya font-bold text-lg border-t border-[#212121] dark:border-[#d0d0d0]">Location</span>
                                            <Field
                                                name="location"
                                                className="border-l border-t p-3 focus:outline-none bg-transparent border-[#212121] dark:border-[#d0d0d0]"
                                                placeholder="Enter car location"
                                                type="text"
                                            />

                                            <span className="p-3 font-amulya font-bold text-lg border-t border-[#212121] dark:border-[#d0d0d0]">Year</span>
                                            <Field
                                                name="year"
                                                className="border-l border-t p-3 focus:outline-none bg-transparent border-[#212121] dark:border-[#d0d0d0]"
                                                placeholder="Enter manufacture year"
                                                type="text"
                                            />

                                            <span className="p-3 font-amulya font-bold text-lg border-t border-[#212121] dark:border-[#d0d0d0]">Seller</span>
                                            <div className="flex gap-2 border-l border-t border-[#212121] dark:border-[#d0d0d0] p-3">
                                                <User className="h-[24px]"/>
                                                <span className="font-synonym">{data.sellerUsername}</span>
                                            </div>
                                        </div>

                                        <div className="border w-full border-[#212121] dark:border-[#d0d0d0] grid grid-cols-[40%_60%] rounded-lg bg-[#c7c7c7] dark:bg-[#212121]">
                                            <span className="p-3 font-amulya font-bold text-lg">Engine</span>
                                            <Field
                                                name="engine"
                                                className="border-l p-3 focus:outline-none bg-transparent border-[#212121] dark:border-[#d0d0d0]"
                                                type="text"
                                                placeholder="Enter engine model"
                                            />

                                            <span className="p-3 font-amulya font-bold text-lg border-t border-[#212121] dark:border-[#d0d0d0]">Drivetrain</span>
                                            <div className="border-l border-t border-[#212121] dark:border-[#d0d0d0] p-3">
                                                <InlineAutoComplete
                                                    name="drivetrainId"
                                                    options={DRIVETRAIN_OPTIONS}
                                                    placeholder="Select drivetrain"
                                                />
                                            </div>

                                            <span className="p-3 font-amulya font-bold text-lg border-t border-[#212121] dark:border-[#d0d0d0]">Transmission</span>
                                            <div className="border-l border-t border-[#212121] dark:border-[#d0d0d0] p-3">
                                                <InlineAutoComplete
                                                    name="transmissionId"
                                                    options={TRANSMISSION_OPTIONS}
                                                    placeholder="Select transmission"
                                                />
                                            </div>

                                            <span className="p-3 font-amulya font-bold text-lg border-t border-[#212121] dark:border-[#d0d0d0]">Body style</span>
                                            <div className="border-l border-t border-[#212121] dark:border-[#d0d0d0] p-3">
                                                <InlineAutoComplete
                                                    name="bodyStyleId"
                                                    options={bodyStyles}
                                                    placeholder="Select body style"
                                                    isLoading={bodyStylesLoading}
                                                />
                                            </div>

                                            <span className="p-3 font-amulya font-bold text-lg border-t border-[#212121] dark:border-[#d0d0d0]">Exterior Color</span>
                                            <Field
                                                name="exteriorColor"
                                                className="border-l border-t p-3 focus:outline-none bg-transparent border-[#212121] dark:border-[#d0d0d0]"
                                                type="text"
                                                placeholder="Enter car color"
                                            />

                                            <span className="p-3 font-amulya border-t font-bold text-lg">Interior Color</span>
                                            <Field
                                                name="interiorColor"
                                                className="border-l border-t p-3 focus:outline-none bg-transparent border-[#212121] dark:border-[#d0d0d0]"
                                                type="text"
                                                placeholder="Enter interior color"
                                            />

                                            <span className="p-3 font-amulya font-bold text-lg border-t border-[#212121] dark:border-[#d0d0d0]">Speeds</span>
                                            <Field
                                                name="speeds"
                                                className="border-l border-t p-3 focus:outline-none bg-transparent border-[#212121] dark:border-[#d0d0d0]"
                                                placeholder="Enter car speeds"
                                                type="text"
                                            />
                                        </div>
                                    </div>

                                    {/* Textareas - keeping existing implementation */}
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col gap-2.5">
                                            <span className="font-amulya font-bold text-2xl">Highlights</span>
                                            <MarkdownInput
                                                value={values.highlights}
                                                onChange={(val) => setFieldValue("highlights", val)}
                                                textareaClassName="bg-[#d0d0d0] dark:bg-[#2c2c2c]"
                                                previewClassName="dark:bg-[#2с2с2с]"
                                                placeholder="Enter basic information about this car"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2.5">
                                            <span className="font-amulya font-bold text-2xl">Recent Service History</span>
                                            <MarkdownInput
                                                value={values.serviceHistory}
                                                onChange={(val) => setFieldValue("serviceHistory", val)}
                                                textareaClassName="bg-[#d0d0d0] dark:bg-[#2c2c2c]"
                                                previewClassName="dark:bg-[#2с2с2с]"
                                                placeholder="Enter service history information of this car"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2.5">
                                            <span className="font-amulya font-bold text-2xl">Equipment</span>
                                            <MarkdownInput
                                                value={values.equipment}
                                                onChange={(val) => setFieldValue("equipment", val)}
                                                textareaClassName="bg-[#d0d0d0] dark:bg-[#2c2c2c]"
                                                previewClassName="dark:bg-[#2с2с2с]"
                                                placeholder="Enter information about additional equipment of this car"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2.5">
                                            <span className="font-amulya font-bold text-2xl">Known Flaws</span>
                                            <MarkdownInput
                                                value={values.flaws}
                                                onChange={(val) => setFieldValue("flaws", val)}
                                                textareaClassName="bg-[#d0d0d0] dark:bg-[#2c2c2c]"
                                                previewClassName="dark:bg-[#2с2с2с]"
                                                placeholder="Enter information about car flaws"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2.5">
                                            <span className="font-amulya font-bold text-2xl">Modifications</span>
                                            <MarkdownInput
                                                value={values.modifications}
                                                onChange={(val) => setFieldValue("modifications", val)}
                                                textareaClassName="bg-[#d0d0d0] dark:bg-[#2c2c2c]"
                                                previewClassName="dark:bg-[#2с2с2с]"
                                                placeholder="Enter information about car modifications"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2.5">
                                            <span className="font-amulya font-bold text-2xl">Other Items Included in Sale</span>
                                            <MarkdownInput
                                                value={values.otherItems}
                                                onChange={(val) => setFieldValue("otherItems", val)}
                                                textareaClassName="bg-[#d0d0d0] dark:bg-[#2c2c2c]"
                                                previewClassName="dark:bg-[#2с2с2с]"
                                                placeholder="Enter information about items included in sale"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2.5">
                                            <span className="font-amulya font-bold text-2xl">Ownership History</span>
                                            <MarkdownInput
                                                value={values.ownershipHistory}
                                                onChange={(val) => setFieldValue("ownershipHistory", val)}
                                                textareaClassName="bg-[#d0d0d0] dark:bg-[#2c2c2c]"
                                                previewClassName="dark:bg-[#2с2с2с]"
                                                placeholder="Enter ownership information"
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2.5">
                                            <span className="font-amulya font-bold text-2xl">Seller Notes</span>
                                            <MarkdownInput
                                                value={values.sellerNotes}
                                                onChange={(val) => setFieldValue("sellerNotes", val)}
                                                textareaClassName="bg-[#d0d0d0] dark:bg-[#2c2c2c]"
                                                previewClassName="dark:bg-[#2с2с2с]"
                                                placeholder="Enter additional information from the seller"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-1/3">
                                    <button
                                        type="button"
                                        disabled={loading.submitting}
                                        onClick={async () => {
                                            await approveAuction(auctionId).unwrap();
                                        }}
                                        className="px-[30px] py-2.5 mx-auto block sticky top-25 bg-gradient-to-r from-red-600 to-red-700 rounded-md text-2xl font-bold font-amulya hover:from-transparent hover:to-transparent hover:bg-none hover:text-red-500 hover:border hover:border-red-500 text-white mt-2.5 transition-all duration-200 border border-transparent disabled:opacity-50"
                                    >
                                        {loading.submitting ? 'Updating...' : 'Send to Client for approval'}
                                    </button>

                                    {/* Sticky Save Button - appears when there are changes */}
                                    {hasChanges && (
                                        <div className="sticky bottom-12 top-35 z-50 p-4">
                                            <div className="mx-auto flex justify-center items-center">
                                                <div className="flex gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setHasChanges(false);
                                                            window.location.reload();
                                                        }}
                                                        className="px-6 py-2 mt-2.5 bg-[#2c2c2c] border border-[#404040] text-white rounded-md hover:bg-[#2c2c2c] transition-colors font-amulya"
                                                    >
                                                        Discard Changes
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        onClick={() => {
                                                            handleSubmit(values);
                                                            setHasChanges(false);
                                                        }}
                                                        disabled={loading.submitting}
                                                        className="px-6 py-2 bg-gradient-to-r bg-[#d0d0d0] text-black rounded-md text-2xl font-bold font-amulya hover:from-transparent hover:to-transparent hover:bg-none hover:text-red-500 hover:border hover:border-red-500 mt-2.5 transition-all duration-200 border border-transparent disabled:opacity-50"
                                                    >
                                                        {loading.submitting ? 'Saving...' : 'Save Auction'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <CarFilesManager
                                    isOpen={isManagerOpen}
                                    onClose={() => setIsManagerOpen(false)}
                                    carId={data.carId}
                                    initialImages={carImages}
                                    initialVideos={carVideos}
                                    onImagesUpdate={(category, images) => {
                                        setCarImages(prev => ({ ...prev, [category]: images }));
                                    }}
                                    onVideosUpdate={(videos) => {
                                        setCarVideos(videos);
                                    }}
                                />
                            </div>
                        </Form>
                    );
                }}
            </Formik>


        </div>
    );
}