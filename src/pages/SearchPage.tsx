import { useState } from "react";
import Pagination from "@/components/PaginationComponent";
import DogsCard from "@/components/DogsCard";
import BreedFilter from "@/components/SearchPage/BreedFilter";
import SortByDirection from "@/components/SearchPage/SortByDirection";
import { useDogs, SortField, SortDirection } from "@/hooks/useDogs";
import IsLoading from "@/components/Loader";
import SearchHeader from "@/components/SearchPage/SearchHeader";
import LocationSearch from "@/components/SearchPage/LocationSearch/LocationSearch";
import { useLocations } from "@/hooks/useLocations";

const SearchPage = () => {
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [sortField, setSortField] = useState<SortField>("breed");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState<number>(1);

  const { totalDogs, breeds, dogsDetails, isLoading } = useDogs(selectedBreed, page, sortField, sortDirection);

  const handleSortChange = (field: SortField, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);
    setPage(1);
  };

  const uniqueZipCodes = [...new Set(dogsDetails.map((dog: any) => dog.zip_code))];
  console.log("uniqueZipCodes", uniqueZipCodes);

  const { data: zipCodes } = useLocations(uniqueZipCodes);

  console.log(dogsDetails);
  console.log(uniqueZipCodes);

  const handleBreedFilter = (value: string) => {
    setSelectedBreed(value === "all" ? "" : value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <IsLoading status={isLoading} />;

  return (
    <section className="grow mb-8">
      <section className="container mx-auto px-4 py-8 mt-10">
        <SearchHeader />
        <div className="flex justify-between mb-6 ">
          <BreedFilter selectedBreed={selectedBreed} setSelectedBreed={handleBreedFilter} breeds={breeds} />
          <SortByDirection
            currentSort={{ field: sortField, direction: sortDirection }}
            onSortChange={handleSortChange}
          />
        </div>
        <div>
          <LocationSearch />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 mb-8">
          {dogsDetails.length > 0 ? (
            <DogsCard dogs={dogsDetails} />
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600">No dogs found matching your search criteria.</p>
            </div>
          )}
        </section>
        <Pagination totalDogs={totalDogs} currentPage={page} onPageChange={handlePageChange} />
      </section>
    </section>
  );
};

export default SearchPage;
