import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiClient } from "../services/api/api";

export const useDogBreeds = (options?: UseQueryOptions<string[]>) => {
  return useQuery({
    queryKey: ["dogBreeds"],
    queryFn: () => apiClient.getDogBreeds().then((res) => res.data),
    ...options,
  });
};
