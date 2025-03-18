import { Dog } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bone, Heart } from "lucide-react";
import useAuthStore from "@/state/store";
import { v4 as uuidv4 } from "uuid";
import { BackgroundGradient } from "./ui/background-gradient";

interface DogCardProps {
  dogs: Dog[];
}

const DogsCard = ({ dogs }: DogCardProps) => {
  const { favorites, addFavorite, removeFavorite } = useAuthStore();

  const toggleFavorite = (dog: Dog) => {
    if (favorites.includes(dog.id)) {
      removeFavorite(dog.id);
    } else {
      addFavorite(dog);
    }
  };

  return (
    <>
      {" "}
      {dogs.map((dog) => (
        <Card className="group relative overflow-hidden rounded-[8px] border border-indigo-700 bg-indigo-950/60 backdrop-blur-lg shadow-lg transition-all duration-300 hover:scale-105 hover:border-indigo-500 pt-0">
          <div className="relative h-60 overflow-hidden rounded-[8px]">
            <img
              src={dog.img}
              alt={dog.breed}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <Button
              variant="ghost"
              className={`absolute top-4 right-4 rounded-full p-5 bg-white/20 backdrop-blur-md shadow-md transition-all duration-300 hover:bg-white/40 cursor-pointer ${
                favorites.includes(dog.id) ? "text-red-500" : "text-white"
              }`}
              onClick={() => toggleFavorite(dog)}
            >
              <Heart className={`${favorites.includes(dog.id) ? "fill-current" : ""} text-red-500`} size={36} />
            </Button>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h2 className="text-3xl font-bold text-white drop-shadow-md">{dog.name}</h2>
            </div>
          </div>
          <CardContent className="p-3">
            <div className="flex items-center gap-3 mb-2">
              <Bone className="h-5 w-5 text-yellow-400 drop-shadow-sm" />
              <p className="font-semibold text-white text-xl">{dog.breed}</p>
            </div>
            <div className="flex justify-between text-lg text-gray-300">
              <span className="py-1  ">🐶 Age: {dog.age}</span>
              <span className="px-3 py-1">📍 ZIP: {dog.zip_code}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default DogsCard;
