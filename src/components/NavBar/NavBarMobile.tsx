import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import PawCrewLogo from "../PawCrewLogo";
import SearchInput from "./SearchInput";
import FavoritesMenu from "./FavoritesDogsMenu";
import UserAccountMenu from "./UserAccountMenu";

const NavBarMobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden text-white">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] p-4">
        <nav className="flex flex-col gap-4">
          <Link to="/" /* className="flex items-center gap-2 text-lg font-semibold" */>
            <PawCrewLogo />
          </Link>
          <FavoritesMenu style="flex items-center gap-2 text-lg" />
          <div className="relative">
            <SearchInput style="absolute left-2.5 top-2.5 h-4 w-4" />
          </div>
          <UserAccountMenu />
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default NavBarMobile;
