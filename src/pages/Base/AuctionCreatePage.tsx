import React, { useState } from "react";
import { Star, Share2, User, Calendar } from "lucide-react";

interface FormDataType {
    title: string;
    subtitle: string;
    startPrice: string;
    seller: string;
    startDate: string;
    endDate: string;
    inspected: boolean;
    about: string;
    brand: string;
    model: string;
    mileage: string;
    vin: string;
    titleStatus: string;
    location: string;
    engine: string;
    drivetrain: string;
    transmission: string;
    bodyStyle: string;
    exteriorColor: string;
    interiorColor: string;
    sellerType: string;
    highlights: string;
    serviceHistory: string;
    equipment: string;
    flaws: string;
    modifications: string;
    otherItems: string;
    ownershipHistory: string;
    sellerNotes: string;
}

type TextFieldKey = Exclude<keyof FormDataType, 'inspected'>;

export default function CreateAuctionPage() {
    const [formData, setFormData] = useState<FormDataType>({
        title: "2013 BMW M3 Coupe",
        subtitle: "Supercharged V8, ~45,800 Miles, 6-Speed Manual, Mostly Washington-Owned",
        startPrice: "$ 12,000",
        seller: "Porsche_lover",
        startDate: "Thr, Aug 7 14:55",
        endDate: "Thr, Aug 14",
        inspected: false,
        about: `The E9X BMW M3 stands out as the only M3 offered with a V8, delivering a performance experience we're unlikely to see again – and this particular E92 M3 Coupe takes things even further with a Harrop supercharger kit that should make it especially thrilling to drive. This M3 is also finished in eye-catching Melbourne Red, and it touts the desirable 6-speed manual transmission – and it comes with some great factory equipment like the Premium Package, Novillo leather upholstery, and an Enhanced Premium sound system.`,
        brand: "",
        model: "",
        mileage: "",
        vin: "WBSKG9C55DJ593976",
        titleStatus: "Clean (WA)",
        location: "",
        engine: "",
        drivetrain: "",
        transmission: "",
        bodyStyle: "",
        exteriorColor: "",
        interiorColor: "",
        sellerType: "Private Party",
        highlights: "",
        serviceHistory: "",
        equipment: "",
        flaws: "",
        modifications: "",
        otherItems: "",
        ownershipHistory: "",
        sellerNotes: "",
    });

    const [mainPhoto, setMainPhoto] = useState<File | null>(null);
    const [exteriorPhotos, setExteriorPhotos] = useState<File[]>([]);
    const [interiorPhotos, setInteriorPhotos] = useState<File[]>([]);
    const [otherPhotos, setOtherPhotos] = useState<File[]>([]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        if (e.target instanceof HTMLInputElement) {
            if (e.target.type === "checkbox") {
                setFormData((prev) => ({ ...prev, [name]: e.target.checked }));
            } else {
                setFormData((prev) => ({ ...prev, [name]: value }));
            }
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };



    const handleMainPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setMainPhoto(files[0]);
        }
    };

    const handleMultiplePhotosChange = (setter: React.Dispatch<React.SetStateAction<File[]>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setter((prev) => [...prev, ...newFiles].slice(0, 10));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", { ...formData, mainPhoto, exteriorPhotos, interiorPhotos, otherPhotos });
        // TODO: Send to backend
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form saved:", { ...formData, mainPhoto, exteriorPhotos, interiorPhotos, otherPhotos });
        // TODO: Send to backend
    };

    return (
        <div className="w-[1920px] bg-[#2c2c2c] inline-flex flex-col justify-start items-start gap-5 overflow-hidden">
            <div className="self-stretch px-60 pb-12 flex flex-col justify-start items-start gap-8">
                <div className="self-stretch pb-4 relative flex flex-col justify-start items-start gap-4">
                    <div className="self-stretch flex flex-col justify-start items-start">
                        <div className="self-stretch inline-flex justify-between items-center">
                            <div className="justify-start text-white text-2xl font-bold">{formData.title}</div>
                            <div className="flex justify-start items-center gap-3">
                                <div data-property-1="Default" className="w-[95px] px-2 py-1.5 bg-[#212121] rounded flex justify-center items-center gap-2.5">
                                    <div data-property-1="Default" className="flex-1 h-[18px] relative">
                                        <Star className="w-[15px] h-[14.30px] left-[1.50px] top-[1.50px] absolute bg-white/0 outline-2 outline-offset-[-1px] outline-white" />
                                    </div>
                                    <div className="justify-start text-white text-base font-bold">Watch</div>
                                </div>
                                <div data-property-1="Default" className="w-[95px] px-2 py-1.5 bg-[#212121] rounded flex justify-center items-center gap-2.5">
                                    <Share2 className="w-6 h-6 relative" />
                                    <div className="justify-start text-white text-base font-bold">Share</div>
                                </div>
                            </div>
                        </div>
                        <div className="justify-start text-white text-sm font-normal">{formData.subtitle}</div>
                    </div>
                    <div className="self-stretch inline-flex justify-start items-start gap-3 flex-wrap content-start">
                        <div className="w-[956px] h-[637px] p-[89px] bg-[#212121] inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
                            <div className="w-[72px] h-[72px] relative">
                                <svg width="72" height="73" viewBox="0 0 72 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M43.5 12.5H28.5L21 21.5H12C10.4087 21.5 8.88258 22.1321 7.75736 23.2574C6.63214 24.3826 6 25.9087 6 27.5V54.5C6 56.0913 6.63214 57.6174 7.75736 58.7426C8.88258 59.8679 10.4087 60.5 12 60.5H60C61.5913 60.5 63.1174 59.8679 64.2426 58.7426C65.3679 57.6174 66 56.0913 66 54.5V27.5C66 25.9087 65.3679 24.3826 64.2426 23.2574C63.1174 22.1321 61.5913 21.5 60 21.5H51L43.5 12.5Z" stroke="#2C2C2C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M43.5 12.5H28.5L21 21.5H12C10.4087 21.5 8.88258 22.1321 7.75736 23.2574C6.63214 24.3826 6 25.9087 6 27.5V54.5C6 56.0913 6.63214 57.6174 7.75736 58.7426C8.88258 59.8679 10.4087 60.5 12 60.5H60C61.5913 60.5 63.1174 59.8679 64.2426 58.7426C65.3679 57.6174 66 56.0913 66 54.5V27.5C66 25.9087 65.3679 24.3826 64.2426 23.2574C63.1174 22.1321 61.5913 21.5 60 21.5H51L43.5 12.5Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M36 48.5C40.9706 48.5 45 44.4706 45 39.5C45 34.5294 40.9706 30.5 36 30.5C31.0294 30.5 27 34.5294 27 39.5C27 44.4706 31.0294 48.5 36 48.5Z" stroke="#2C2C2C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M36 48.5C40.9706 48.5 45 44.4706 45 39.5C45 34.5294 40.9706 30.5 36 30.5C31.0294 30.5 27 34.5294 27 39.5C27 44.4706 31.0294 48.5 36 48.5Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <div className="justify-start text-white text-base font-medium">Add Photo</div>
                        </div>
                        <div className="w-full md:w-[472px] h-[637px] px-3 py-4 bg-[#212121] inline-flex flex-col justify-between items-start overflow-hidden">
                            <div className="self-stretch flex flex-col justify-start items-start gap-4">
                                <div className="self-stretch bg-[#212121] flex flex-col justify-start items-start gap-2.5">
                                    <div className="self-stretch flex flex-col justify-start items-start gap-2.5 px-0.5">
                                        <div className="justify-start text-white text-xl font-medium leading-tight">Enter start price</div>
                                        <div className="self-stretch h-10 px-2.5 bg-[#2c2c2c] rounded-md outline-1 outline-offset-[-1px] outline-[#d0d0d0] inline-flex justify-start items-center gap-[258px] overflow-hidden">
                                            <input
                                                type="text"
                                                name="startPrice"
                                                value={formData.startPrice}
                                                onChange={handleInputChange}
                                                className="flex-1 justify-start text-[#d0d0d0] text-base font-normal bg-transparent outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                                    <div className="flex-1 flex justify-start items-center gap-[102px]">
                                        <div className="w-[120px] justify-start text-white text-lg font-bold leading-tight">Seller</div>
                                        <div className="flex justify-center items-center gap-2">
                                            <User className="w-6 h-6 relative" />
                                            <div className="justify-start text-white text-base font-normal">{formData.seller}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch h-[175px] inline-flex flex-col justify-start items-start gap-4 overflow-hidden">
                                <div className="self-stretch inline-flex flex-col justify-center items-start gap-2.5">
                                    <div className="justify-start text-white text-lg font-bold leading-tight">Start date & time</div>
                                </div>
                                <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                                    <div className="flex-1 flex justify-start items-center gap-2">
                                        <div className="p-1 bg-[#2c2c2c] rounded-[10px] inline-flex flex-col justify-center items-start gap-2.5">
                                            <Calendar className="w-6 h-6 relative text-[#cd1f22]" />
                                        </div>
                                        <input
                                            type="datetime-local"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleInputChange}
                                            className="justify-start text-white text-base font-normal bg-transparent outline-none border border-white rounded p-1"
                                        />
                                    </div>
                                </div>
                                <div className="self-stretch inline-flex flex-col justify-center items-start gap-2.5">
                                    <div className="justify-start text-white text-lg font-bold leading-tight">Select end date</div>
                                </div>
                                <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                                    <div className="flex-1 flex justify-start items-center gap-2">
                                        <div className="p-1 bg-[#2c2c2c] rounded-[10px] inline-flex flex-col justify-center items-start gap-2.5">
                                            <Calendar className="w-6 h-6 relative text-[#cd1f22]" />
                                        </div>
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleInputChange}
                                            className="justify-start text-white text-base font-normal bg-transparent outline-none border border-white rounded p-1"
                                        />
                                    </div>
                                </div>
                                <div className="self-stretch inline-flex justify-start items-center gap-2.5">
                                    <div data-property-1="Inspected_button" className="px-1.5 py-0.5 bg-[#d0d0d0] rounded-lg outline-1 outline-offset-[-1px] outline-white flex justify-center items-center gap-3">
                                        <div className="justify-start text-white text-base font-bold">
                                            <input
                                                type="checkbox"
                                                name="inspected"
                                                checked={formData.inspected}
                                                onChange={handleInputChange}
                                                className="mr-2"
                                            />
                                            Inspected
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch h-56 flex flex-col justify-start items-start gap-1">
                                <div className="justify-start text-white text-base font-semibold">About BMW M3 E9X</div>
                                <textarea
                                    name="about"
                                    value={formData.about}
                                    onChange={handleInputChange}
                                    className="self-stretch justify-start text-white text-base font-normal bg-transparent outline-none resize-none"
                                    rows={6}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-[956px] inline-flex justify-start items-start gap-3 flex-wrap content-start">
                        <div className="w-[956px] inline-flex flex-col justify-start items-start gap-6 overflow-hidden">
                            <div className="self-stretch flex flex-col justify-start items-start gap-[18px]">
                                <div className="self-stretch inline-flex justify-start items-center gap-6 p-[1px]">
                                    <div className="w-[466px] h-[336px] bg-[#212121] rounded-lg outline-1 outline-offset-[-1px] outline-[#d0d0d0] inline-flex flex-col justify-start items-start">
                                        <div className="self-stretch h-12 inline-flex justify-start items-center">
                                            <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                                                <div className="justify-start text-white text-lg font-bold leading-tight">Brand</div>
                                            </div>
                                            <div className="flex-1 self-stretch p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                                                <input
                                                    type="text"
                                                    name="brand"
                                                    value={formData.brand}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter brand name"
                                                    className="justify-start text-[#d0d0d0] text-base font-normal bg-transparent outline-none w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="self-stretch h-12 border-t border-[#d0d0d0] inline-flex justify-start items-center">
                                            <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                                                <div className="justify-start text-white text-lg font-bold leading-tight">Model</div>
                                            </div>
                                            <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                                                <input
                                                    type="text"
                                                    name="model"
                                                    value={formData.model}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter car model name"
                                                    className="justify-start text-[#d0d0d0] text-base font-normal bg-transparent outline-none w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="self-stretch h-12 border-t border-[#d0d0d0] inline-flex justify-start items-center">
                                            <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                                                <div className="justify-start text-white text-lg font-bold leading-tight">Mileage</div>
                                            </div>
                                            <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                                                <input
                                                    type="text"
                                                    name="mileage"
                                                    value={formData.mileage}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter mileage"
                                                    className="justify-start text-[#d0d0d0] text-base font-normal bg-transparent outline-none w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="self-stretch h-12 border-t border-[#d0d0d0] inline-flex justify-start items-center">
                                            <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                                                <div className="justify-start text-white text-lg font-bold leading-tight">VIN</div>
                                            </div>
                                            <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                                                <input
                                                    type="text"
                                                    name="vin"
                                                    value={formData.vin}
                                                    onChange={handleInputChange}
                                                    className="justify-start text-white text-base font-medium bg-transparent outline-none w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="self-stretch h-12 border-t border-[#d0d0d0] inline-flex justify-start items-center">
                                            <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                                                <div className="justify-start text-white text-lg font-bold leading-tight">Title Status</div>
                                            </div>
                                            <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                                                <input
                                                    type="text"
                                                    name="titleStatus"
                                                    value={formData.titleStatus}
                                                    onChange={handleInputChange}
                                                    className="justify-start text-white text-base font-medium bg-transparent outline-none w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="self-stretch h-12 border-t border-[#d0d0d0] inline-flex justify-start items-center">
                                            <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                                                <div className="justify-start text-white text-lg font-bold leading-tight">Location</div>
                                            </div>
                                            <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter car location"
                                                    className="justify-start text-[#d0d0d0] text-base font-normal bg-transparent outline-none w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="self-stretch h-12 border-t border-[#d0d0d0] inline-flex justify-start items-center">
                                            <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                                                <div className="justify-start text-white text-lg font-bold leading-tight">Seller</div>
                                            </div>
                                            <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                                                <div className="flex justify-center items-center gap-2">
                                                    <User className="w-6 h-6 relative" />
                                                    <div className="justify-start text-white text-base font-medium">{formData.seller}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[466px] h-[336px] bg-[#212121] rounded-lg outline-1 outline-offset-[-1px] outline-[#d0d0d0] inline-flex flex-col justify-start items-start">
                                        <div className="self-stretch h-12 inline-flex justify-start items-center">
                                            <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                                                <div className="justify-start text-white text-lg font-bold leading-tight">Engine</div>
                                            </div>
                                            <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                                                <input
                                                    type="text"
                                                    name="engine"
                                                    value={formData.engine}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter engine model"
                                                    className="justify-start text-[#d0d0d0] text-base font-normal bg-transparent outline-none w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="self-stretch h-12 border-t border-[#d0d0d0] inline-flex justify-start items-center">
                                            <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                                                <div className="justify-start text-white text-lg font-bold leading-tight">Drivetrain</div>
                                            </div>
                                            <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                                                <input
                                                    type="text"
                                                    name="drivetrain"
                                                    value={formData.drivetrain}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter drivetrain"
                                                    className="justify-start text-[#d0d0d0] text-base font-normal bg-transparent outline-none w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="self-stretch h-12 border-t border-[#d0d0d0] inline-flex justify-start items-center">
                                            <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                                                <div className="justify-start text-white text-lg font-bold leading-tight">Transmission</div>
                                            </div>
                                            <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                                                <input
                                                    type="text"
                                                    name="transmission"
                                                    value={formData.transmission}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter transmission type"
                                                    className="justify-start text-[#d0d0d0] text-base font-normal bg-transparent outline-none w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="self-stretch h-12 border-t border-[#d0d0d0] inline-flex justify-start items-center">
                                            <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                                                <div className="justify-start text-white text-lg font-bold leading-tight">Body Style</div>
                                            </div>
                                            <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                                                <input
                                                    type="text"
                                                    name="bodyStyle"
                                                    value={formData.bodyStyle}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter car body type"
                                                    className="justify-start text-[#d0d0d0] text-base font-normal bg-transparent outline-none w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="self-stretch h-12 border-t border-[#d0d0d0] inline-flex justify-start items-center">
                                            <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                                                <div className="justify-start text-white text-lg font-bold leading-tight">Exterior Color</div>
                                            </div>
                                            <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                                                <input
                                                    type="text"
                                                    name="exteriorColor"
                                                    value={formData.exteriorColor}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter car color"
                                                    className="justify-start text-[#d0d0d0] text-base font-normal bg-transparent outline-none w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="self-stretch h-12 border-t border-[#d0d0d0] inline-flex justify-start items-center">
                                            <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                                                <div className="justify-start text-white text-lg font-bold leading-tight">Interior Color</div>
                                            </div>
                                            <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                                                <input
                                                    type="text"
                                                    name="interiorColor"
                                                    value={formData.interiorColor}
                                                    onChange={handleInputChange}
                                                    placeholder="Enter interior color"
                                                    className="justify-start text-[#d0d0d0] text-base font-normal bg-transparent outline-none w-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="self-stretch h-12 border-t border-[#d0d0d0] inline-flex justify-start items-center">
                                            <div className="w-[180px] p-3 flex justify-start items-center gap-2.5">
                                                <div className="justify-start text-white text-lg font-bold leading-tight">Seller Type</div>
                                            </div>
                                            <div className="flex-1 p-3 border-l border-[#d0d0d0] flex justify-start items-center gap-2.5">
                                                <input
                                                    type="text"
                                                    name="sellerType"
                                                    value={formData.sellerType}
                                                    onChange={handleInputChange}
                                                    className="justify-start text-white text-base font-medium bg-transparent outline-none w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="self-stretch flex flex-col justify-start items-start gap-6">
                                {[
                                    { key: "highlights" as TextFieldKey, label: "Highlights", placeholder: "Enter basic information about this car" },
                                    { key: "serviceHistory" as TextFieldKey, label: "Recent Service History", placeholder: "Enter service history information of this car" },
                                    { key: "equipment" as TextFieldKey, label: "Equipment", placeholder: "Enter information about additional equipment of this car" },
                                    { key: "flaws" as TextFieldKey, label: "Known Flaws", placeholder: "Enter information about car flaws" },
                                    { key: "modifications" as TextFieldKey, label: "Modifications", placeholder: "Enter information about car modifications" },
                                    { key: "otherItems" as TextFieldKey, label: "Other Items Included in Sale", placeholder: "Enter information about other items" },
                                    { key: "ownershipHistory" as TextFieldKey, label: "Ownership History", placeholder: "Enter ownership information" },
                                    { key: "sellerNotes" as TextFieldKey, label: "Seller Notes", placeholder: "Enter additional information from the seller" },
                                ].map(({ key, label, placeholder }) => (
                                    <div key={key} className="self-stretch flex flex-col justify-start px-[1px] py-[1px] items-start gap-2.5">
                                        <div className="justify-start text-white text-2xl font-bold">{label}</div>
                                        <textarea
                                            name={key}
                                            value={formData[key]}
                                            onChange={handleInputChange}
                                            placeholder={placeholder}
                                            className="self-stretch h-[127px] p-3 bg-[#2c2c2c] rounded-md outline-[0.50px] outline-offset-[-0.50px] outline-[#d0d0d0] inline-flex justify-start items-start gap-[258px] overflow-hidden flex-1 text-[#d0d0d0] text-base font-normal"
                                        />
                                    </div>
                                ))}
                                <div className="self-stretch flex flex-col justify-start px-[1px] py-[1px] items-start gap-2.5">
                                    <div className="justify-start text-white text-2xl font-bold">Main Photo (1 photo)</div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleMainPhotoChange}
                                        className="self-stretch p-3 bg-[#2c2c2c] rounded-md outline-[0.50px] outline-offset-[-0.50px] outline-[#d0d0d0] text-[#d0d0d0] text-base font-normal"
                                    />
                                    {mainPhoto && <div className="text-white">{mainPhoto.name}</div>}
                                </div>
                                <div className="self-stretch flex flex-col justify-start px-[1px] py-[1px] items-start gap-2.5">
                                    <div className="justify-start text-white text-2xl font-bold">Exterior Photos (up to 10)</div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleMultiplePhotosChange(setExteriorPhotos)}
                                        className="self-stretch p-3 bg-[#2c2c2c] rounded-md outline-[0.50px] outline-offset-[-0.50px] outline-[#d0d0d0] text-[#d0d0d0] text-base font-normal"
                                    />
                                    <div className="text-white">{exteriorPhotos.length} photos selected</div>
                                </div>
                                <div className="self-stretch flex flex-col justify-start px-[1px] py-[1px] items-start gap-2.5">
                                    <div className="justify-start text-white text-2xl font-bold">Interior Photos (up to 10)</div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleMultiplePhotosChange(setInteriorPhotos)}
                                        className="self-stretch p-3 bg-[#2c2c2c] rounded-md outline-[0.50px] outline-offset-[-0.50px] outline-[#d0d0d0] text-[#d0d0d0] text-base font-normal"
                                    />
                                    <div className="text-white">{interiorPhotos.length} photos selected</div>
                                </div>
                                <div className="self-stretch flex flex-col justify-start px-[1px] py-[1px] items-start gap-2.5">
                                    <div className="justify-start text-white text-2xl font-bold">Other Photos (up to 10)</div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleMultiplePhotosChange(setOtherPhotos)}
                                        className="self-stretch p-3 bg-[#2c2c2c] rounded-md outline-[0.50px] outline-offset-[-0.50px] outline-[#d0d0d0] text-[#d0d0d0] text-base font-normal"
                                    />
                                    <div className="text-white">{otherPhotos.length} photos selected</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-[29px] left-[1015px] top-[724px] absolute flex flex-col justify-center items-center gap-2.5">
                        <button
                            onClick={handleSubmit}
                            className="px-[30px] py-2.5 bg-[#cd1f22] rounded-md inline-flex justify-center items-center gap-2.5"
                        >
                            <div className="justify-start text-white text-2xl font-bold">Send to Client for approval</div>
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-[30px] py-2.5 bg-[#cd1f22] rounded-md inline-flex justify-center items-center gap-2.5"
                        >
                            <div className="justify-start text-white text-2xl font-bold">Save</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}