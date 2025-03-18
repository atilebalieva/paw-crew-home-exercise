import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import PawCrewLogo from "../PawCrewLogo";
import FavoritesMenu from "./FavoritesDogsMenu";
import SignOut from "./SignOut";

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
          <Link to="/">
            <PawCrewLogo color="white" />
          </Link>
          <FavoritesMenu style="flex items-center gap-2 text-lg" />
          <SignOut />
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default NavBarMobile;
