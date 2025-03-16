import { useEffect, useState } from "react";
import useAuthStore from "@/services/state/authStore";
import { Dog } from "@/lib/infer-types";
import DogsCard from "@/components/SearchPage/DogsCard";

const FavoriteDogsPage = () => {
  const { dogs, favorites } = useAuthStore();
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);

  useEffect(() => {
    const favoriteDogsList = dogs.filter((dog) => favorites.includes(dog.id));
    setFavoriteDogs(favoriteDogsList);
  }, [dogs, favorites]);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-8">My Favorite Dogs</h1>
      {favoriteDogs.length > 0 ? <DogsCard dogs={favoriteDogs} /> : <p>No favorite dogs found.</p>}
    </section>
  );
};

export default FavoriteDogsPage;
