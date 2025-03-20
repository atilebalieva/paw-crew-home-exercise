import { useState } from "react";
import useAuthStore from "@/state/store";
import { Dog } from "@/lib/types";
import DogsCard from "@/components/DogsCard";
import EmptyState from "@/components/FavoriteDogs/EmptyState";
import MatchButton from "@/components/FavoriteDogs/MatchButton";
import { useMatchDogs } from "@/hooks/useMatchDogs";
import FavoritesDescription from "@/components/FavoriteDogs/FavoritesDescription";
import MatchDogModal from "@/components/FavoriteDogs/MatchDogModal";

const FavoriteDogsPage = () => {
  const { favorites, favoriteDogCache, addFavorite } = useAuthStore();
  const { mutate: matchDogs } = useMatchDogs();
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMatch = () => {
    if (favorites.length === 0) {
      return;
    }

    setIsLoading(true);

    matchDogs(favorites, {
      onSuccess: (data) => {
        const matchId = data.match;
        const matchedDogDetails = favoriteDogCache.find((dog) => dog.id === matchId);

        if (matchedDogDetails) {
          setMatchedDog(matchedDogDetails);
          addFavorite(matchedDogDetails);
          setIsModalOpen(true);
        }
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <section className="container mx-auto px-4 py-8 grow">
      <FavoritesDescription favoriteDogCache={favoriteDogCache} />
      {favoriteDogCache.length > 0 && (
        <MatchButton handleClick={handleMatch} matchedDog={matchedDog} isLoading={isLoading} />
      )}

      {isModalOpen && matchedDog && <MatchDogModal matchedDog={matchedDog} onClose={() => setIsModalOpen(false)} />}

      {favoriteDogCache.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 mb-8">
          <DogsCard dogs={favoriteDogCache} />{" "}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
};

export default FavoriteDogsPage;
