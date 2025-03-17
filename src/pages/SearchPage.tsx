import { useState } from "react";
import Pagination from "@/components/PaginationComponent";
import DogsCard from "@/components/DogsCard";
import FilterItems from "@/components/SearchPage/FilterItems";
import SortItems from "@/components/SearchPage/SortItems";
import SearchLocation from "@/components/SearchPage/SearchLocation";
import { useDogs, SortField, SortDirection } from "@/hooks/useDogs";
import Loading from "@/components/Loading";

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

  /*  const { totalDogs = 0, breeds = [], dogDetails = [] } = data || {}; */

  const handleLocationSearch = (searchTerm: string) => {
    setLocationSearchTerm(searchTerm);
    setPage(1);
  };

  const handleSortChange = (field: SortField, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);
    setPage(1);
  };

  const handleBreedFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBreed(event.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <div className="flex justify-center items-center h-64">Loading...</div>;

  return (
    <section className="grow">
      <section className="container mx-auto px-4 py-8 mt-10">
        <SearchLocation onSearch={handleLocationSearch} />

        <div className="flex justify-between">
          <FilterItems selectedBreed={selectedBreed} setSelectedBreed={handleBreedFilter} breeds={breeds} />
          <SortItems currentSort={{ field: sortField, direction: sortDirection }} onSortChange={handleSortChange} />
        </div>

        {locationSearchTerm && (
          <div className="mb-4 text-sm text-gray-600">
            <p>Showing dogs near "{locationSearchTerm}".</p>
          </div>
        )}

        <section>
          {dogDetails.length > 0 ? (
            <DogsCard dogs={dogDetails} />
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600">No dogs found matching your search criteria.</p>
            </div>
          )}
          <Pagination totalDogs={totalDogs} currentPage={page} onPageChange={handlePageChange} />
        </section>
      </section>
    </section>
  );
};

export default SearchPage;
