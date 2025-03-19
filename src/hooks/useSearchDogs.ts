import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../services/api/api";

export const useSearchDogs = (queryParams: Record<string, any>) => {
  return useQuery({
    queryKey: ["dogs", "search", queryParams],
    queryFn: () => apiClient.searchDogs(queryParams).then((res) => res.data),
    enabled: !!queryParams,
  });
};
