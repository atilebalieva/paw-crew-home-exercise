import { apiClient } from "@/services/api/api";
import { useQuery } from "@tanstack/react-query";

export const useZipCodeSearch = (zipCodes: string[]) => {
  return useQuery({
    queryKey: ["zipCodeSearch", zipCodes],
    queryFn: () => apiClient.getLocationByZipCode(zipCodes).then((res) => res.data),
    enabled: zipCodes.length > 0,
  });
};
