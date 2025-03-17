import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../services/api/api";

export const useLogout = () => {
  return useMutation({
    mutationFn: () => apiClient.logout(),
    onSuccess: () => {
      localStorage.removeItem("isAuthenticated");
      sessionStorage.clear();
    },
  });
};
