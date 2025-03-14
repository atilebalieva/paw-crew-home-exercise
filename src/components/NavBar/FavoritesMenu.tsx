import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const FavoritesMenu = ({ style }: { style: string }) => {
  return (
    <>
      <Link to="/favorites" className={style}>
        <Heart className="h-4 w-4" />
        <span>Favorites</span>
      </Link>
    </>
  );
};

export default FavoritesMenu;
