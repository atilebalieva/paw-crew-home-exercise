import { useState } from "react";
import Pagination from "@/components/PaginationComponent";
import DogsCard from "@/components/DogsCard";
import Banner from "@/components/SearchPage/Banner";
import FilterItems from "@/components/SearchPage/FilterItems";
import SortItems from "@/components/SearchPage/SortItems";
import { useDogs, SortField, SortDirection } from "@/hooks/useDogs";
import Loading from "@/components/Loading";

const SearchPage = () => {
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [sortField, setSortField] = useState<SortField>("breed");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState<number>(1);

  const { totalDogs, breeds, dogDetails, isLoading } = useDogs(selectedBreed, page, sortField, sortDirection);

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
      {/*       <Banner /> */}
      <section className="container mx-auto px-4 py-8 mt-10">
        <div className="flex justify-between">
          <FilterItems selectedBreed={selectedBreed} setSelectedBreed={handleBreedFilter} breeds={breeds} />
          <SortItems currentSort={{ field: sortField, direction: sortDirection }} onSortChange={handleSortChange} />
        </div>
        <section>
          <DogsCard dogs={dogDetails} />
          <Pagination totalDogs={totalDogs} currentPage={page} onPageChange={handlePageChange} />
        </section>
      </section>
    </section>
  );
};
export default SearchPage;
