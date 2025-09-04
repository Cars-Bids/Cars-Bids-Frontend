import { useState } from "react";
import { Image as ImgIcon, Play } from "lucide-react";

export type Photo = { id: string; src: string; alt?: string };

export default function LotGallery({ photos, title }: {
    photos: Photo[];
    title: string;
}) {
    // Активне фото, за замовчуванням — перше
    const [activePhoto, setActivePhoto] = useState<Photo>(photos[0]);

    return (
        <section>
            {/* Головне фото */}
            <div className="aspect-[16/9] w-full overflow-hidden rounded-md">
                <img
                    src={activePhoto.src}
                    alt={activePhoto.alt || title}
                    className="h-full w-full object-cover transition-all duration-300"
                />
            </div>

            {/* Мініатюри */}
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {photos.slice(0, 8).map((p) => (
                    <button
                        key={p.id}
                        onClick={() => setActivePhoto(p)}
                        className={`relative h-24 w-32 flex-none overflow-hidden border transition-all duration-200 ${
                            p.id === activePhoto.id
                                ? "border-blue-500"
                                : "border-zinc-800 hover:border-zinc-400"
                        }`}
                    >
                        <img
                            src={p.src}
                            alt={p.alt || "thumbnail"}
                            className="h-full w-full object-cover"
                        />
                    </button>
                ))}

                {/* Кнопка "All Photos" */}
                <button
                    className="relative h-24 w-32 flex-none items-center gap-2 border border-zinc-800 text-xs text-white overflow-hidden flex justify-center hover:bg-zinc-900"
                    style={{
                        backgroundImage: `url(${photos[photos.length - 2].src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span className="absolute inset-0 bg-black/30"></span> {/* затемнення */}
                    <ImgIcon className="h-4 w-4 relative z-10" />
                    <span className="relative z-10">All Photos</span>
                </button>

                {/* Кнопка "Videos" */}
                <button
                    className="relative h-24 w-32 flex-none items-center gap-2 border border-zinc-800 text-xs text-white overflow-hidden flex justify-center hover:bg-zinc-900"
                    style={{
                        backgroundImage: `url(${photos[photos.length - 1].src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span className="absolute inset-0 bg-black/30"></span> {/* затемнення */}
                    <Play className="h-4 w-4 relative z-10" />
                    <span className="relative z-10">Videos</span>
                </button>

            </div>
        </section>
    );
}
