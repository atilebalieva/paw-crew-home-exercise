import { useDogBreeds } from "./useDogBreeds";
import { useSearchDogs } from "./useSearchDogs";
import { useGetDogs } from "./useGetDogs";

export type SortField = "breed" | "age" | "name" | "date_added";

export type SortDirection = "asc" | "desc";

const PAGE_SIZE = 24;

export const useDogs = (selectedBreed: string, page: number, sortField: SortField, sortDirection: SortDirection) => {
  const { data: breeds } = useDogBreeds();

  const { data: searchDogsResults } = useSearchDogs({
    breeds: selectedBreed ? [selectedBreed] : breeds,
    size: 24,
    from: (page - 1) * 24,
    sort: `${sortField}:${sortDirection}`,
  });

  const { data: dogsDetails } = useGetDogs(searchDogsResults?.resultIds || []);

  return {
    totalDogs: searchDogsResults?.total || 0,
    breeds: breeds || [],
    dogsDetails: dogsDetails || [],
    isLoading: !breeds || !searchDogsResults || !dogsDetails,
    searchDogsResults,
  };
};
export const DOGS_PAGE_SIZE = PAGE_SIZE;
