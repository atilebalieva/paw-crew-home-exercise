import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../services/api/api";

export const useLocations = (zipCodes: string[]) => {
  return useQuery({
    queryKey: ["locations", zipCodes],
    queryFn: () => apiClient.getLocations(zipCodes).then((res) => res.data),
    enabled: zipCodes.length > 0,
  });
};
