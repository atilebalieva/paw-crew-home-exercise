import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import NavBarMobile from "./NavBarMobile";
import PawCrewLogo from "../PawCrewLogo";
import FavoritesMenu from "./FavoritesDogsMenu";
import UserAccountMenu from "./UserAccountMenu";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b shadow-sm" /* style={{ backgroundColor: "#6504b5" }} */>
      <div className="w-full bg-primary">
        <div className="container mx-auto flex h-16 items-center px-4">
          <NavBarMobile />
          <div className="flex items-center gap-2 mr-4">
            <Link to="/" className="flex items-center gap-2">
              <PawCrewLogo />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <FavoritesMenu style={"flex items-center gap-1.5 text-sm font-medium text-white hover:text-white/80"} />
          </nav>
          <div className="flex items-center gap-8 ml-auto">
            <div className="hidden md:flex relative w-full max-w-sm items-center">
              <SearchInput style="absolute left-2.5 top-2.5 h-4 w-4" />
            </div>
            <UserAccountMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
