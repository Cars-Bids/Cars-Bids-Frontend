import {useEffect, useState} from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type {CarImageData} from "@/features/types/AuctionDetailed.ts";

interface AuctionFilesManagerProps {
    isOpen: boolean;
    onClose: () => void;
    isVideoMode: boolean;
    images?: {
        mainPhoto: CarImageData[];
        interior: CarImageData[];
        exterior: CarImageData[];
        others: CarImageData[];
    };
    videos: string[];
}

type ImageCategory = 'mainPhoto' | 'interior' | 'exterior' | 'others' | 'videos';
type ViewMode = 'single' | 'gallery';

export default function AuctionFilesManager({isOpen, onClose, isVideoMode,
                                            images = { mainPhoto: [], interior: [], exterior: [], others: [] },
                                            videos = []
                                        }: AuctionFilesManagerProps) {

    const [activeCategory, setActiveCategory] = useState<ImageCategory>('mainPhoto');
    const [viewMode, setViewMode] = useState<ViewMode>('single');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        setViewMode('single');
        setActiveCategory(isVideoMode ? 'videos' : 'mainPhoto');
        setCurrentImageIndex(0);
    }, [isOpen, isVideoMode]);

    const categories = [
        { key: 'mainPhoto' as const, label: 'Main Photo' },
        { key: 'interior' as const, label: 'Interior' },
        { key: 'exterior' as const, label: 'Exterior' },
        { key: 'others' as const, label: 'Others' },
        { key: 'videos' as const, label: 'Videos' }
    ];

    const currentImages = activeCategory === 'videos' ? [] : [...images[activeCategory]];

    const navigateImage = (direction: 'prev' | 'next') => {
        const length = activeCategory === 'videos' ? videos.length : currentImages.length;
        if (!length) return;

        if (direction === 'prev') {
            setCurrentImageIndex(prev => prev > 0 ? prev - 1 : length - 1);
        }
        else {
            setCurrentImageIndex(prev => prev < length - 1 ? prev + 1 : 0);
        }
    };

    return (isOpen &&
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
            {/* Navigation Bar */}
            <div className="bg-[#121212] border-b-2 border-[#ce2023] p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        {categories.map(category => (
                            <button
                                key={category.key}
                                onClick={() => {
                                    setActiveCategory(category.key);
                                    setCurrentImageIndex(0);
                                }}
                                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                                    activeCategory === category.key
                                        ? 'bg-[#ce2023] text-white'
                                        : 'text-[#d0d0d0] hover:text-white hover:bg-gray-700'
                                }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        {activeCategory !== 'videos' && (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewMode('single')}
                                    className={`px-3 py-1 rounded text-sm ${
                                        viewMode === 'single' ? 'bg-[#ce2023] text-white' : 'text-[#d0d0d0] hover:text-white'
                                    }`}
                                >
                                    Single
                                </button>
                                <button
                                    onClick={() => setViewMode('gallery')}
                                    className={`px-3 py-1 rounded text-sm ${
                                        viewMode === 'gallery' ? 'bg-[#ce2023] text-white' : 'text-[#d0d0d0] hover:text-white'
                                    }`}
                                >
                                    Gallery
                                </button>
                            </div>
                        )}

                        <button
                            onClick={onClose}
                            className="text-[#d0d0d0] hover:text-white p-2 hover:bg-gray-700 rounded"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-[#1a1a1a] relative overflow-hidden">
                {activeCategory === 'videos' && videos.length > 0 ? (
                    <div className="h-full flex items-center justify-center relative">
                        {videos.length > 1 &&(
                            <button
                                onClick={() => navigateImage('prev')}
                                className="absolute left-6 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </button>
                        )}
                        <div className="aspect-video w-full rounded-lg m-70">
                            <iframe
                                src={`https://www.youtube.com/embed/${videos[currentImageIndex].split("v=")[1]}`}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        {videos.length > 1 &&(
                            <button
                                onClick={() => navigateImage('next')}
                                className="absolute right-6 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                            >
                                <ChevronRight size={24} />
                            </button>
                        )}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 px-4 py-2 rounded-lg text-white">
                            {currentImageIndex + 1} of {videos.length}
                        </div>
                    </div>
                ) : viewMode === 'single' && currentImages.length > 0 ? (
                    <div className="h-full flex items-center justify-center relative">
                        {currentImages.length > 1 &&(
                            <button
                                onClick={() => navigateImage('prev')}
                                className="absolute left-6 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                            >
                                <ChevronLeft size={24} />
                            </button>
                        )}
                        <div className="max-w-4xl max-h-full p-6 flex items-center justify-center">
                            <img
                                src={currentImages[currentImageIndex]?.imageUrl}
                                alt={`${activeCategory} ${currentImageIndex + 1}`}
                                className="max-w-full max-h-full object-contain rounded-lg"
                            />
                        </div>
                        {currentImages.length > 1 &&(
                            <button
                                onClick={() => navigateImage('next')}
                                className="absolute right-6 z-10 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                            >
                                <ChevronRight size={24} />
                            </button>
                        )}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 px-4 py-2 rounded-lg text-white">
                            {currentImageIndex + 1} of {currentImages.length}
                        </div>
                    </div>
                ) : (
                    <div className="p-6 h-full overflow-y-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {currentImages.map((image, index) => (
                                <div
                                    key={image.id}
                                    className="relative group bg-[#2c2c2c] border border-[#ce2023] rounded-lg overflow-hidden aspect-square"
                                >
                                    <img
                                        src={image.imageUrl}
                                        alt={`${activeCategory} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-white text-xs">
                                        #{index + 1}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}