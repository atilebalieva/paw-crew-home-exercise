import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../services/api/api";

export const useGetDogs = (dogIds: string[]) => {
  return useQuery({
    queryKey: ["dogs", dogIds],
    queryFn: () => apiClient.getDogs(dogIds).then((res) => res.data),
    enabled: dogIds.length > 0,
  });
};
