import { Star, Share2 } from "lucide-react";

interface LotHeaderProps {
  title: string;
  subtitle?: string;
  isWatched: boolean;
  onToggleWatch: () => void;
}

export default function LotHeader({
                                    title,
                                    subtitle,
                                    isWatched,
                                    onToggleWatch,
                                  }: LotHeaderProps) {
  const handleShareClick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: subtitle,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Sharing error:", error);
    }
  };

  return (
      <header className="sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-1 px-4 py-1">
          <div className="min-w-0">
            <h1 className="truncate text-lg font-bold sm:text-xl text-black dark:text-gray-200">{title}</h1>
            {subtitle && <p className="truncate text-xs text-black dark:text-gray-200">{subtitle}</p>}
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            {/* Watch */}
            <button
                onClick={onToggleWatch}
                className={`rounded-md border border-zinc-800 px-3 py-1 text-sm dark:bg-zinc-900 text-black dark:text-gray-200
              hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors flex items-center`}
            >
              <Star
                  className={`mr-1 inline h-4 w-4 ${isWatched ? "fill-yellow-400 stroke-yellow-400" : ""}`}
              />
              {isWatched ? "Watching" : "Watch"}
            </button>

            {/* Share */}
            <button
                onClick={handleShareClick}
                className="rounded-md border border-zinc-800 px-3 py-1 text-sm dark:bg-zinc-900 text-black dark:text-gray-200
              hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors flex items-center"
            >
              <Share2 className="mr-1 inline h-4 w-4" />
              Share
            </button>
          </div>
        </div>
      </header>
  );
}
