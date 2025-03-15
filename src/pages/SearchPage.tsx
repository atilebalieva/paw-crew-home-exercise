import { useState } from "react";
import useAuthStore from "@/services/state/authStore";
import Pagination from "@/components/PaginationComponent";
import DogsCard from "@/components/SearchPage/DogsCard";
import Banner from "@/components/SearchPage/Banner";
import FilterItems from "@/components/SearchPage/FilterItems";
import SortItems from "@/components/SearchPage/SortItems";
import { useDogs } from "@/hooks/useDogs";

const SearchPage = () => {
  const { dogs, dogBreeds } = useAuthStore();

  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState<number>(1);
  const [favorites, setFavorites] = useState<string[]>([]);

  const { allDogs, totalDogs, error } = useDogs(selectedBreed, page, sortOrder);

  const handleSortChange = (order: "asc" | "desc") => {
    setSortOrder(order);
    setPage(1);
  };

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleBreedFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBreed(event.target.value);
    setPage(1);
  };

  const filteredDogs = selectedBreed ? dogs : allDogs;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section>
      <Banner />
      <section className="container mx-auto px-4 py-8 mt-10">
        <div className="flex justify-between">
          <FilterItems selectedBreed={selectedBreed} setSelectedBreed={handleBreedFilter} breeds={dogBreeds} />
          <SortItems sortOrder={sortOrder} setSortOrder={handleSortChange} />
        </div>
        {filteredDogs.length > 0 ? (
          <section>
            <DogsCard dogs={filteredDogs} isFavorite={favorites} toggleFavorite={toggleFavorite} />
            <Pagination totalDogs={totalDogs} currentPage={page} onPageChange={handlePageChange} />
          </section>
        ) : (
          <p>No dogs found for the selected breed.</p>
        )}
      </section>
    </section>
  );
};
export default SearchPage;
