import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuthStore from "@/state/store";
import * as api from "@/services/api/api";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "@/hooks/useLogout";

const UserAccountMenu = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleSignOut = async () => {
    logoutMutation.mutate();
    navigate("/login", { replace: true });
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
