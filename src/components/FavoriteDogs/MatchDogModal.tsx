import { X } from "lucide-react";
import DogsCard from "../DogsCard";
import { Dog } from "@/lib/types";
import { useEffect } from "react";

interface MatchDogModalProps {
  matchedDog: Dog;
  onClose: () => void;
}

const MatchDogModal = ({ matchedDog, onClose }: MatchDogModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-slate-950 opacity-90" onClick={onClose}></div>

      <div className="p-10 w-full max-w-md text-center relative bg-slate-950 rounded-lg shadow-xl overflow-y-auto max-h-[90vh] z-10">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-100 to-yellow-700 text-transparent bg-clip-text mb-4">
          You've found your perfect match!
        </h2>
        <div>
          <DogsCard dogs={[matchedDog]} />
        </div>
      </div>
    </div>
  );
};

export default MatchDogModal;
