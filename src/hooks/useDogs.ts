import { useDogBreeds } from "./useDogBreeds";
import { useSearchDogs } from "./useSearchDogs";
import { useGetDogs } from "./useGetDogs";
import { useLocationSearch } from "./useLocationSearch";
import { useEffect, useState, useCallback } from "react";

export type SortField = "breed" | "age" | "name" | "date_added";
export type SortDirection = "asc" | "desc";

const PAGE_SIZE = 24;
const CITIES_BATCH_SIZE = 500;

interface CityData {
  city: string;
  zip_codes: string[];
}

export const useDogs = (selectedBreed: string, page: number, sortField: SortField, sortDirection: SortDirection) => {
  const [citiesData, setCitiesData] = useState<CityData[]>([]);
  const [uniqueCities, setUniqueCities] = useState<string[]>([]);
  const [currentCityOffset, setCurrentCityOffset] = useState(0);
  const [isLoadingMoreCities, setIsLoadingMoreCities] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [filteredZipCodes, setFilteredZipCodes] = useState<string[]>([]);

  const { data: breeds, isLoading: breedsLoading } = useDogBreeds();

  const { data: locationData, refetch: refetchLocations } = useLocationSearch({
    size: CITIES_BATCH_SIZE,
    from: currentCityOffset,
  });

  useEffect(() => {
    if (locationData?.results?.length) {
      const cityMap = new Map<string, string[]>();

      locationData.results.forEach((loc: any) => {
        const city = loc.city;
        const zipCode = loc.zip_code;

        if (!cityMap.has(city)) {
          cityMap.set(city, [zipCode]);
        } else {
          cityMap.get(city)?.push(zipCode);
        }
      });

      const newCitiesData = Array.from(cityMap.entries()).map(([city, zipCodes]) => ({
        city,
        zip_codes: zipCodes,
      }));

      setCitiesData((prevData) => {
        const combinedData = [...prevData];

        newCitiesData.forEach((newCity) => {
          const existingCityIndex = combinedData.findIndex((c) => c.city === newCity.city);

          if (existingCityIndex >= 0) {
            combinedData[existingCityIndex].zip_codes = [
              ...new Set([...combinedData[existingCityIndex].zip_codes, ...newCity.zip_codes]),
            ];
          } else {
            combinedData.push(newCity);
          }
        });

        return combinedData;
      });

      setUniqueCities((prevCities) => {
        const uniqueSet = new Set([...prevCities, ...newCitiesData.map((c) => c.city)]);
        return Array.from(uniqueSet).sort();
      });
    }
  }, [locationData]);

  useEffect(() => {
    if (selectedCity && selectedCity !== "all") {
      const selectedCityData = citiesData.find((c) => c.city === selectedCity);
      if (selectedCityData) {
        const zipCodes = selectedCityData.zip_codes.slice(0, 100);
        setFilteredZipCodes(zipCodes);
        console.log("Updated Zip Codes:", zipCodes);
      }
    } else {
      setFilteredZipCodes([]);
    }
  }, [selectedCity, citiesData]);

  const loadMoreCities = useCallback(() => {
    if (!isLoadingMoreCities) {
      setIsLoadingMoreCities(true);
      setCurrentCityOffset((prev) => prev + CITIES_BATCH_SIZE);

      refetchLocations().then(() => {
        setIsLoadingMoreCities(false);
      });
    }
  }, [isLoadingMoreCities, refetchLocations]);

  console.log("Query Params Sent:", {
    breeds: selectedBreed ? [selectedBreed] : breeds,
    size: PAGE_SIZE,
    from: (page - 1) * PAGE_SIZE,
    sort: `${sortField}:${sortDirection}`,
    zipCodes: filteredZipCodes,
  });

  const { data: searchDogsResults, isLoading: searchLoading } = useSearchDogs({
    breeds: selectedBreed ? [selectedBreed] : breeds,
    size: PAGE_SIZE,
    from: (page - 1) * PAGE_SIZE,
    sort: `${sortField}:${sortDirection}`,
    zipCodes: filteredZipCodes,
  });

  const { data: dogsDetails, isLoading: detailsLoading } = useGetDogs(searchDogsResults?.resultIds || []);

  return {
    totalDogs: searchDogsResults?.total || 0,
    breeds: breeds || [],
    dogsDetails: dogsDetails || [],
    isLoading: breedsLoading || searchLoading || detailsLoading,
    cities: uniqueCities,
    loadMoreCities,
    setSelectedCity,
    selectedCity,
  };
};

export const DOGS_PAGE_SIZE = PAGE_SIZE;
