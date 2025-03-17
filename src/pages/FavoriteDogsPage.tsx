import { useState } from "react";
import useAuthStore from "@/state/store";
import { Dog } from "@/lib/types";
import DogsCard from "@/components/DogsCard";
import EmptyState from "@/components/FavoriteDogs/EmptyState";
import MatchButton from "@/components/FavoriteDogs/MatchButton";
import { useMatchDogs } from "@/hooks/useMatchDogs";
import FavoritesDescription from "@/components/FavoriteDogs/FavoritesDescription";
/* import { toast } from "sonner";
 */ import { Heart } from "lucide-react";

const FavoriteDogsPage = () => {
  const { favorites, favoriteDogCache } = useAuthStore();
  const { mutate: matchDogs, isPending } = useMatchDogs();
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);

  const handleMatch = () => {
    if (favorites.length === 0) {
      return;
    }

    matchDogs(favorites, {
      onSuccess: (data) => {
        const matchId = data.match;
        const matchedDogDetails = favoriteDogCache.find((dog) => dog.id === matchId);

        if (matchedDogDetails) {
          setMatchedDog(matchedDogDetails);
        }
      },
      /* onError: () => {
        toast("We couldn't find a match at this time. Please try again later.");
      }, */
    });
  };

  console.log(matchedDog);
  return (
    <section className="container mx-auto px-4 py-8 grow">
      <FavoritesDescription favoriteDogCache={favoriteDogCache} />

      <MatchButton handleClick={handleMatch} />

      {matchedDog && (
        <div className="bg-secondary p-6 rounded-3xl border-2 border-dashed border-secondary mt-4">
          <h2 className="text-2xl font-bold flex items-center">
            <Heart className="mr-2 h-5 w-5 fill-primary text-primary" />
            Your Match: {matchedDog.name}
          </h2>
          <p className="text-muted-foreground mt-1">
            Congratulations! You've been matched with {matchedDog.name}, a {matchedDog.age}-year-old {matchedDog.breed}.
          </p>
          <div className="mt-4">
            <img src={matchedDog.img} alt={matchedDog.name} className="w-full max-w-md h-auto rounded-xl mx-auto" />
          </div>
        </div>
      )}

      {favoriteDogCache.length > 0 ? <DogsCard dogs={favoriteDogCache} /> : <EmptyState />}
    </section>
  );
};

export default FavoriteDogsPage;
