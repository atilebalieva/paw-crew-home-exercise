import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../services/api/api";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, email }: { name: string; email: string }) =>
      apiClient.login(name, email).then((res) => res.data),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      localStorage.setItem("isAuthenticated", "true");
    },
  });
};
