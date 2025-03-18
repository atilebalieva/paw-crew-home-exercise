import { Link } from "react-router-dom";
import NavBarMobile from "./NavBarMobile";
import PawCrewLogo from "../PawCrewLogo";
import FavoritesMenu from "./FavoritesDogsMenu";
import SignOut from "./SignOut";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b shadow-sm bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="w-full">
        <div className="container mx-auto flex h-16 gap-10 items-center px-4">
          <NavBarMobile />
          <div className="mr-4">
            <Link to="/">
              <PawCrewLogo color="white" />
            </Link>
          </div>
          <nav className="hidden md:flex">
            <FavoritesMenu style={"flex items-center gap-1.5 text-md font-medium text-white hover:text-white/80"} />
          </nav>
          <div className="hidden md:flex ml-auto text-white ">
            <SignOut />
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
