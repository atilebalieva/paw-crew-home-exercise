import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../services/api/api";

export const useLocationSearch = (searchParams: Record<string, any> | null) => {
  return useQuery({
    queryKey: ["locationSearch", searchParams],
    queryFn: () => apiClient.getSearchLocations(searchParams).then((res) => res.data),
    enabled: !!searchParams,
  });
};
