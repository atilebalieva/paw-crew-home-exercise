import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/services/state/authStore";
import * as api from "@/services/api/api";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserAccountMenu = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await api.logout();

      logout();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <User className="h-6 w-6 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Light Mode</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserAccountMenu;
