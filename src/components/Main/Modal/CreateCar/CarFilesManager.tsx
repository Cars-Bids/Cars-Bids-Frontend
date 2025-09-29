import {useState, useRef, useEffect} from "react";
import { X, ChevronLeft, ChevronRight, Plus, Trash2, GripVertical, Link as LinkIcon } from "lucide-react";
import {
    useFileUploadMutation,
    usePhotoDeleteMutation,
    useReorderCarImagesMutation
} from "@/features/api/endpoints/CarEndpoints";

interface CarImage {
    id: number;
    url: string;
    orderNumber: number;
}

interface CarFilesManagerProps {
    isOpen: boolean;
    onClose: () => void;
    carId: number;
    initialImages?: {
        mainPhoto: CarImage[];
        interior: CarImage[];
        exterior: CarImage[];
        others: CarImage[];
    };
    initialVideos?: string[];
    onImagesUpdate?: (category: string, images: CarImage[]) => void;
    onVideosUpdate?: (videos: string[]) => void;
}

type ImageCategory = 'mainPhoto' | 'interior' | 'exterior' | 'others' | 'videos';
type ViewMode = 'single' | 'gallery';

const categoryMap: Record<ImageCategory, number> = {
    mainPhoto: 0,
    interior: 2,
    exterior: 1,
    others: 3,
    videos: -1
};

export default function CarFilesManager({
                                            isOpen,
                                            onClose,
                                            carId,
                                            initialImages = { mainPhoto: [], interior: [], exterior: [], others: [] },
                                            initialVideos = [],
                                            onImagesUpdate,
                                            onVideosUpdate
                                        }: CarFilesManagerProps) {
    const [activeCategory, setActiveCategory] = useState<ImageCategory>('mainPhoto');
    const [viewMode, setViewMode] = useState<ViewMode>('gallery');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [videoInput, setVideoInput] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [fileUpload, { isLoading: isUploading }] = useFileUploadMutation();
    const [photoDelete, { isLoading: isDeleting }] = usePhotoDeleteMutation();
    const [reorderCarImages, { isLoading: isReordering }] = useReorderCarImagesMutation();

    const [images, setImages] = useState(initialImages);
    const [videos, setVideos] = useState(initialVideos);

    useEffect(() => {
        setImages(initialImages);
    }, [initialImages]);

    useEffect(() => {
        setVideos(initialVideos);
    }, [initialVideos]);

    const isLoading = isUploading || isDeleting || isReordering;

    const categories = [
        { key: 'mainPhoto' as const, label: 'Main Photo' },
        { key: 'interior' as const, label: 'Interior' },
        { key: 'exterior' as const, label: 'Exterior' },
        { key: 'others' as const, label: 'Others' },
        { key: 'videos' as const, label: 'Videos' }
    ];

    const currentImages = activeCategory === 'videos' ? [] : [...images[activeCategory]].sort((a, b) => a.orderNumber - b.orderNumber);

    const currentVideos = activeCategory === 'videos' ? videos : [];

    const handleFileUpload = async (files: FileList) => {
        if (!files.length || activeCategory === 'videos') return;

        try {
            const newImageUrls = await fileUpload({
                files,
                carId,
                categoryId: categoryMap[activeCategory],
            }).unwrap();

            const newImages = newImageUrls.map((url, index) => ({
                id: Date.now() + index,
                url,
                orderNumber: currentImages.length + index + 1,
            }));

            const updatedImages = {
                ...images,
                [activeCategory]: [...currentImages, ...newImages],
            };

            setImages(updatedImages);
            onImagesUpdate?.(activeCategory, updatedImages[activeCategory]);
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    const handleDeleteImage = async (imageId: number) => {
        if (activeCategory === 'videos') return;

        try {
            await photoDelete({ photoId: imageId, carId }).unwrap();

            const updatedImages = {
                ...images,
                [activeCategory]: currentImages
                    .filter(img => img.id !== imageId)
                    .map((img, index) => ({ ...img, orderNumber: index + 1 })),
            };

            setImages(updatedImages);
            onImagesUpdate?.(activeCategory, updatedImages[activeCategory]);

            if (currentImageIndex >= updatedImages[activeCategory].length) {
                setCurrentImageIndex(Math.max(0, updatedImages[activeCategory].length - 1));
            }
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    const handleReorderImages = async (newOrder: CarImage[]) => {
        if (activeCategory === 'videos') return;

        const orderIds = newOrder.map(img => img.orderNumber);

        try {
            await reorderCarImages({ carId, orderIds, categoryId: categoryMap[activeCategory] }).unwrap();

            const updatedImages = {
                ...images,
                [activeCategory]: newOrder.map((img, index) => ({ ...img, orderNumber: index + 1 })),
            };

            setImages(updatedImages);
            onImagesUpdate?.(activeCategory, updatedImages[activeCategory]);
        } catch (error) {
            console.error('Reorder failed:', error);
        }
    };

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === dropIndex) return;

        const newOrder = [...currentImages];
        const [removed] = newOrder.splice(draggedIndex, 1);
        newOrder.splice(dropIndex, 0, removed);

        handleReorderImages(newOrder);
        setDraggedIndex(null);
    };

    const handleAddVideo = () => {
        if (!videoInput.trim()) return;
        const newVideos = [...videos, videoInput.trim()];
        setVideos(newVideos);
        onVideosUpdate?.(newVideos);
        setVideoInput('');
    };

    const handleDeleteVideo = (index: number) => {
        const newVideos = videos.filter((_, i) => i !== index);
        setVideos(newVideos);
        onVideosUpdate?.(newVideos);
    };

    const navigateImage = (direction: 'prev' | 'next') => {
        if (activeCategory === 'videos' || currentImages.length === 0) return;

        if (direction === 'prev') {
            setCurrentImageIndex(prev => prev > 0 ? prev - 1 : currentImages.length - 1);
        } else {
            setCurrentImageIndex(prev => prev < currentImages.length - 1 ? prev + 1 : 0);
        }
    };

    if (!isOpen) return null;

    return (
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
                {isLoading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                        <div className="bg-[#121212] p-6 rounded-lg border border-[#ce2023]">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 border-2 border-[#ce2023] border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-white">Loading...</span>
                            </div>
                        </div>
                    </div>
                )}

                {activeCategory === 'videos' ? (
                    <div className="p-6 h-full overflow-y-auto">
                        <div className="max-w-4xl mx-auto">
                            <div className="mb-6 flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter YouTube URL"
                                    value={videoInput}
                                    onChange={(e) => setVideoInput(e.target.value)}
                                    className="flex-1 px-4 py-2 bg-[#2c2c2c] border border-[#ce2023] rounded text-white placeholder-gray-400"
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddVideo()}
                                />
                                <button
                                    onClick={handleAddVideo}
                                    className="px-4 py-2 bg-[#ce2023] text-white rounded hover:bg-[#b91c1f] transition-colors flex items-center gap-2"
                                >
                                    <Plus size={16} />
                                    Add Video
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {videos.map((video, index) => (
                                    <div key={index} className="bg-[#2c2c2c] border border-[#ce2023] rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <LinkIcon size={20} className="text-[#ce2023] flex-shrink-0 mt-1" />
                                            <button
                                                onClick={() => handleDeleteVideo(index)}
                                                className="text-red-400 hover:text-red-300 ml-2"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <p className="text-white text-sm break-all">{video}</p>
                                    </div>
                                ))}
                            </div>
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
                                src={currentImages[currentImageIndex]?.url}
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

                        <button
                            onClick={() => handleDeleteImage(currentImages[currentImageIndex].id)}
                            className="absolute top-6 right-6 p-2 bg-red-600/70 hover:bg-red-600 rounded-full text-white transition-colors"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ) : (
                    <div className="p-6 h-full overflow-y-auto">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {currentImages.map((image, index) => (
                                <div
                                    key={image.id}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, index)}
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, index)}
                                    className="relative group cursor-move bg-[#2c2c2c] border border-[#ce2023] rounded-lg overflow-hidden aspect-square"
                                >
                                    <img
                                        src={image.url}
                                        alt={`${activeCategory} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />

                                    <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-white text-xs">
                                        #{image.orderNumber}
                                    </div>

                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleDeleteImage(image.id)}
                                            className="p-1 bg-red-600 hover:bg-red-700 rounded text-white"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>

                                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <GripVertical size={16} className="text-white" />
                                    </div>
                                </div>
                            ))}

                            {/* Add Button */}
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="aspect-square border-2 border-dashed border-[#ce2023] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-[#ce2023]/10 transition-colors"
                            >
                                <Plus size={32} className="text-[#ce2023] mb-2" />
                                <span className="text-[#ce2023] text-sm font-medium">Add Photos</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Hidden File Input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                    className="hidden"
                />
            </div>
        </div>
    );
}
