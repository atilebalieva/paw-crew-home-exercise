import { useState } from "react";
import Pagination from "@/components/PaginationComponent";
import DogsCard from "@/components/DogsCard";
import FilterItems from "@/components/SearchPage/FilterItems";
import SortItems from "@/components/SearchPage/SortItems";
import { useDogs, SortField, SortDirection } from "@/hooks/useDogs";
import IsLoading from "@/components/IsLoading";
import SearchHeader from "@/components/SearchPage/SearchHeader";

const SearchPage = () => {
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [sortField, setSortField] = useState<SortField>("breed");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState<number>(1);
  const [locationSearchTerm, setLocationSearchTerm] = useState<string>("");

  const { totalDogs, breeds, dogDetails, isLoading } = useDogs(
    selectedBreed,
    page,
    sortField,
    sortDirection,
    locationSearchTerm,
  );

  const handleLocationSearch = (searchTerm: string) => {
    setLocationSearchTerm(searchTerm);
    setPage(1);
  };

  const handleSortChange = (field: SortField, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);
    setPage(1);
  };

  const handleBreedFilter = (value: string) => {
    setSelectedBreed(value === "all" ? "" : value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    console.log("SearchPage: Changing to page", newPage);

    setPage(newPage);
  };

  if (isLoading) return <IsLoading status={isLoading} />;

  return (
    <section className="grow mb-8">
      <section className="container mx-auto px-4 py-8 mt-10">
        <SearchHeader />
        <div className="flex justify-between mb-6 ">
          <FilterItems selectedBreed={selectedBreed} setSelectedBreed={handleBreedFilter} breeds={breeds} />
          <SortItems currentSort={{ field: sortField, direction: sortDirection }} onSortChange={handleSortChange} />
        </div>
        {locationSearchTerm && (
          <div className="mb-4 text-sm text-gray-600">
            <p>Showing dogs near "{locationSearchTerm}".</p>
          </div>
        )}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 mb-8">
          {dogDetails.length > 0 ? (
            <DogsCard dogs={dogDetails} />
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
