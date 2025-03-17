import { useZipCodeSearch } from "@/hooks/useZipCodeSearch";
import { useLocationSearch } from "@/hooks/useLocationSearch";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useDogBreeds } from "./useDogBreeds";
import { useSearchDogs } from "./useSearchDogs";
import { useGetDogs } from "./useGetDogs";

export type SortField = "breed" | "age" | "name" | "date_added";
export type SortDirection = "asc" | "desc";

export const useDogs = (
  selectedBreed: string,
  page: number,
  sortField: SortField,
  sortDirection: SortDirection,
  locationSearchTerm: string,
) => {
  const debouncedSearchTerm = useDebounce(locationSearchTerm, 500);
  const { data: breeds } = useDogBreeds();

  const { data: searchDogsResults } = useSearchDogs({
    breeds: selectedBreed ? [selectedBreed] : breeds,
    size: 24,
    from: (page - 1) * 24,
    sort: `${sortField}:${sortDirection}`,
  });

  const { data: dogDetails } = useGetDogs(searchDogsResults?.resultIds || []);

  const [searchType, setSearchType] = useState<"zip" | "city" | "state" | null>(null);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [locationParams, setLocationParams] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    const searchTerm = debouncedSearchTerm.trim();
    if (!searchTerm) {
      setSearchType(null);
      setZipCodes([]);
      setLocationParams(null);
      return;
    }

    const isZipCode = /^\d{5}$/.test(searchTerm);
    if (isZipCode) {
      setSearchType("zip");
      setZipCodes([searchTerm]);
      setLocationParams(null);
    } else if (/^[A-Za-z]{2}$/.test(searchTerm)) {
      setSearchType("state");
      setLocationParams({ states: [searchTerm.toUpperCase()] });
    } else {
      setSearchType("city");
      setLocationParams({ city: searchTerm });
    }
  }, [debouncedSearchTerm]);

  const { data: zipCodeResults } = useZipCodeSearch(searchType === "zip" ? zipCodes : []);
  const { data: locationResults } = useLocationSearch(searchType !== "zip" ? locationParams : null);

  useEffect(() => {
    if (searchType !== "zip" && locationResults?.results) {
      setZipCodes(locationResults.results.map((loc: any) => loc.zip_code));
    }
  }, [locationResults, searchType]);

  return {
    totalDogs: searchDogsResults?.total || 0,
    breeds: breeds || [],
    dogDetails: dogDetails || [],
    isLoading: !breeds || !searchDogsResults || !dogDetails,
    searchDogsResults,
  };
};
