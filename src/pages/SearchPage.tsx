import { useState } from "react";
import Pagination from "@/components/PaginationComponent";
import DogsCard from "@/components/DogsCard";
import BreedFilter from "@/components/SearchPage/BreedFilter";
import SortByDirection from "@/components/SearchPage/SortByDirection";
import { useDogs, SortField, SortDirection } from "@/hooks/useDogs";
import Loader from "@/components/Loader";
import SearchHeader from "@/components/SearchPage/SearchHeader";
import SelectLocation from "@/components/SearchPage/LocationSearch/SelectLocation";

const SearchPage = () => {
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [sortField, setSortField] = useState<SortField>("breed");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [page, setPage] = useState<number>(1);

  const { totalDogs, breeds, dogsDetails, cities, isLoading, loadMoreCities, setSelectedCity } = useDogs(
    selectedBreed,
    page,
    sortField,
    sortDirection,
  );

  const handleSortChange = (field: SortField, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);
    setPage(1);
  };

  const handleBreedFilter = (value: string) => {
    setSelectedBreed(value === "all" ? "" : value);
    setPage(1);
  };

  const handleCitySelect = (value: string) => {
    setSelectedCity(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (isLoading) return <Loader status={isLoading} />;

  return (
    <section className="grow mb-8">
      <section className="container mx-auto px-4 py-8 mt-10">
        <SearchHeader />
        <div className="flex justify-between mb-6 ">
          <BreedFilter selectedBreed={selectedBreed} setSelectedBreed={handleBreedFilter} breeds={breeds} />
          <SelectLocation
            results={cities}
            handleClick={handleCitySelect}
            title={"All Cities"}
            loadMoreItems={loadMoreCities}
          />
          <SortByDirection
            currentSort={{ field: sortField, direction: sortDirection }}
            onSortChange={handleSortChange}
          />
        </div>

        {dogsDetails.length > 0 ? (
          <div>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 mb-8">
              <DogsCard dogs={dogsDetails} />
            </section>
            <Pagination totalDogs={totalDogs} currentPage={page} onPageChange={handlePageChange} />
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-xl text-white">Oops! We couldn’t find any dogs in your selected city</p>
          </div>
        )}
      </section>
    </section>
  );
};

export default SearchPage;
