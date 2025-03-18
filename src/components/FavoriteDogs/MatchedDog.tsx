import { Heart } from "lucide-react";
import DogsCard from "../DogsCard";
import { Dog } from "@/lib/types";

interface MatchDogProps {
  matchedDog: Dog;
}

const MatchDog = ({ matchedDog }: MatchDogProps) => {
  return (
    <div className=" mt-4 mb-12 text-white text-center mb-8">
      <div className="flex justify-center mb-6">
        <Heart className="mr-2 h-5 w-5 fill-primary text-primary" />
        <h2 className="text-2xl font-bold">Congratulations! Your Match: {matchedDog.name}</h2>
      </div>
      <div className="flex justify-center items-center">
        <DogsCard dogs={[matchedDog]} />
      </div>
    </div>
  );
};

export default MatchDog;
