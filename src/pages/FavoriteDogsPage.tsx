import { useEffect, useState } from "react";
import useAuthStore from "@/services/state/authStore";
import { Dog } from "@/lib/infer-types";
import DogsCard from "@/components/SearchPage/DogsCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import EmptyState from "@/components/FavoriteDogs/EmptyState";

const FavoriteDogsPage = () => {
  const { allDogs, favorites } = useAuthStore();
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);

  useEffect(() => {
    const favoriteDogsList = allDogs.filter((dog) => favorites.includes(dog.id));
    setFavoriteDogs(favoriteDogsList);
  }, [allDogs, favorites]);

  console.log(favorites.length);
  console.log("favoriteDogs", favoriteDogs);

  return (
    <div className="container mx-auto px-4 py-8 grow">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2 -ml-2 text-muted-foreground">
            <Link to="/">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to all dogs
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">My Favorite Dogs</h1>
          <p className="text-muted-foreground mt-1">
            {favoriteDogs.length > 0
              ? `You have ${favoriteDogs.length} favorite ${favoriteDogs.length === 1 ? "dog" : "dogs"}`
              : "Collect your favorite dogs here"}
          </p>
        </div>
      </div>
      {favoriteDogs.length > 0 ? <DogsCard dogs={favoriteDogs} /> : <EmptyState />}
    </div>
  );
};

export default FavoriteDogsPage;
