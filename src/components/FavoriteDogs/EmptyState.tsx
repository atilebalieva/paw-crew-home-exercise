import { Heart, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center text-white">
      <div className="bg-fuchsia-800 rounded-full p-6 mb-4">
        <Heart className="h-12 w-12" />
      </div>
      <h2 className="text-xl font-semibold mb-2">No favorite dogs yet</h2>
      <p className=" max-w-md mb-6">When you find dogs you love, mark them as favorites and they'll appear here.</p>
      <Button asChild>
        <Link to="/">
          <PlusCircle className="mr-2 h-4 w-4" />
          Browse Dogs
        </Link>
      </Button>
    </div>
  );
};

export default EmptyState;
