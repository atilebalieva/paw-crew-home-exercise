import { useSearchDogs } from "./useSearchDogs";
import { useDogBreeds } from "./useDogBreeds";
import { useGetDogs } from "./useGetDogs";

export type SortField = "breed" | "name" | "age";
export type SortDirection = "asc" | "desc";
export type SortOption = `${SortField}:${SortDirection}`;

export const useDogs = (
  selectedBreed: string,
  page: number,
  sortField: SortField = "breed",
  sortDirection: SortDirection = "asc",
) => {
  const { data: breeds } = useDogBreeds();

  const { data: searchDogsResults } = useSearchDogs({
    breeds: selectedBreed ? [selectedBreed] : breeds,
    size: 24,
    from: (page - 1) * 24,
    sort: `${sortField}:${sortDirection}`,
  });

  const { data: dogDetails } = useGetDogs(searchDogsResults?.resultIds || []);

  return {
    totalDogs: searchDogsResults?.total || 0,
    isLoading: !breeds || !searchDogsResults || !dogDetails,
    breeds,
    dogDetails,
    searchDogsResults,
  };
};
