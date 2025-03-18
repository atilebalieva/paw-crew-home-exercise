import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/useLogout";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleSignOut = async () => {
    logoutMutation.mutate();
    navigate("/login", { replace: true });
  };
  return (
    <div
      className="cursor-pointer group py-2 focus:bg-destructive/15 font-medium flex items-center"
      onClick={handleSignOut}
    >
      <LogOut size={14} className="group-hover:rotate-180 transition-all duration-300 easy-in-out mr-3" />
      <p>Sign out</p>
    </div>
  );
};

export default SignOut;
