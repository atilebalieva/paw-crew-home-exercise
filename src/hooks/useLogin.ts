import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../services/api/api";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ name, email }: { name: string; email: string }) =>
      apiClient.login(name, email).then((res) => res.data),
    onSuccess: () => {
      localStorage.setItem("isAuthenticated", "true");
    },
  });
};
