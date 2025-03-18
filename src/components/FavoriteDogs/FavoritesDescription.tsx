import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { Dog } from "@/lib/types";

const FavoritesDescription = ({ favoriteDogCache }: { favoriteDogCache: Dog[] }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <Button variant="ghost" size="sm" asChild className="mb-2 -ml-2 text-muted-foreground">
          <Link to="/">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to all dogs
          </Link>
        </Button>
        <h1 className="text-3xl text-white font-bold tracking-tight">My Favorite Dogs</h1>
        <p className="text-white mt-1">
          {favoriteDogCache.length > 0
            ? `You have ${favoriteDogCache.length} favorite ${favoriteDogCache.length === 1 ? "dog" : "dogs"}`
            : "Collect your favorite dogs here"}
        </p>
      </div>
    </div>
  );
};

export default FavoritesDescription;
