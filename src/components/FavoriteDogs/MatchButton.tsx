import { useState, useEffect } from "react";
import { Heart, Sparkles, PawPrintIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dog } from "@/lib/types";

interface MatchButtonProps {
  handleClick: () => void;
  disabled?: boolean;
  matchedDog: Dog | null;
  isLoading: boolean;
}

const MatchButton = ({ handleClick, disabled = false, matchedDog, isLoading }: MatchButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [sparklePosition, setSparklePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setSparklePosition({
          x: Math.random() * 100,
          y: Math.random() * 100,
        });
      }, 700);

      return () => clearInterval(interval);
    }
  }, [isHovered]);

  return (
    <div className="flex items-center justify-center p-8 mb-5 lg:mb-8">
      <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
        <Button
          onClick={handleClick}
          disabled={isLoading}
          size="lg"
          className={cn(
            "relative overflow-hidden bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600",
            "text-white font-bold py-8 px-10 rounded-full shadow-lg",
            "transition-all duration-300 hover:shadow-pink-500/25 hover:shadow-xl",
            "border border-white/20 backdrop-blur-sm cursor-pointer",
            "min-w-[250px] z-10",
          )}
        >
          <div className="relative flex items-center justify-center gap-3 z-10">
            {isLoading ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                <span className="text-lg">Finding Match...</span>
              </>
            ) : (
              <>
                <Heart className={`h-5 w-5 ${isHovered ? "animate-heartbeat" : ""}`} />
                <span className="text-lg font-semibold">
                  {!matchedDog ? "Find your best Match" : "Find another match"}
                </span>
              </>
            )}
          </div>

          {isHovered && !isLoading && (
            <Sparkles
              className="absolute text-yellow-200 w-5 h-5 animate-ping z-20"
              style={{
                left: `${sparklePosition.x}%`,
                top: `${sparklePosition.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          )}

          <PawPrintIcon className="absolute -top-6 -left-6 h-8 w-8 text-pink-300 rotate-45 opacity-0 group-hover:opacity-70 transition-all duration-500 group-hover:translate-x-3 group-hover:translate-y-3" />

          <PawPrintIcon className="absolute -bottom-6 -right-6 h-8 w-8 text-purple-300 -rotate-45 opacity-0 group-hover:opacity-70 transition-all duration-500 group-hover:-translate-x-3 group-hover:-translate-y-3" />

          <span className="absolute inset-0 h-full w-full scale-0 rounded-full bg-white/30 transition-all duration-500 group-active:scale-100 opacity-0 group-active:opacity-30" />
        </Button>
      </div>
    </div>
  );
};

export default MatchButton;
