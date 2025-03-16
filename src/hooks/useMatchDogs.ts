import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../services/api/api";

export const useMatchDogs = () => {
  return useMutation({
    mutationFn: (dogIds: string[]) => apiClient.matchDogs(dogIds).then((res) => res.data),
  });
};
