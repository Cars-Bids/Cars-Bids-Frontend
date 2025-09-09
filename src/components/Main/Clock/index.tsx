import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface AuctionTimerProps {
  startTime: string;
  endTime: string;
}

const AuctionTimer = ({ startTime, endTime }: AuctionTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [status, setStatus] = useState<"starts" | "ends" | "ended">("starts");

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      const start = new Date(startTime).getTime();
      const end = new Date(endTime).getTime();

      if (now < start) {
        setTimeLeft(start - now);
        setStatus("starts");
      } else if (now >= start && now < end) {
        setTimeLeft(end - now);
        setStatus("ends");
      } else {
        setTimeLeft(0);
        setStatus("ended");
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [startTime, endTime]);

  const formatTime = (ms: number) => {
    if (ms <= 0) return "00:00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="flex items-center gap-2 bg-neutral-800 border border-red-600 px-3 py-1.5 rounded-lg text-xs font-medium font-synonym">
      <Clock className="w-4 h-4 text-red-600" />
      {status === "starts" && <>Starts in {formatTime(timeLeft)}</>}
      {status === "ends" && <>Ends in {formatTime(timeLeft)}</>}
      {status === "ended" && <>Auction ended</>}
    </div>
  );
};

export default AuctionTimer;
