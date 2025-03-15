import { useEffect, useState } from "react";
import { Dog } from "@/lib/infer-types";
import * as api from "@/services/api/api";
import useAuthStore from "@/services/state/authStore";
import Pagination from "@/components/PaginationComponent";
import DogsCard from "@/components/SearchPage/DogsCard";
import Banner from "@/components/SearchPage/Banner";
import FilterItems from "@/components/SearchPage/FilterItems";
import SortItems from "@/components/SearchPage/SortItems";

const SearchPage = () => {
  const [error, setError] = useState("");
  const [page, setPage] = useState<number>(1);
  const [totalDogs, setTotalDogs] = useState<number>(0);
  const { dogs, setDogs, dogBreeds, setDogBreeds } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  useEffect(() => {
    const fetchDogBreeds = async () => {
      try {
        const breeds = await api.getDogBreeds();
        setDogBreeds(breeds);
      } catch (err: any) {
        setError("Something went wrong, there is no list of dogs.");
      }
    };

    fetchDogBreeds();
  }, []);

  const fetchDogs = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const dogsPerPage = 25;

      const response = await api.searchDogs({
        breeds: selectedBreed ? [selectedBreed] : dogBreeds,
        size: dogsPerPage,
        from: (page - 1) * dogsPerPage,
        sort: `breed:${sortOrder}`,
      });

      if (response.resultIds.length > 0) {
        const dogDetails = await api.getDogs(response.resultIds);
        if (!selectedBreed) {
          setAllDogs(dogDetails);
        }
        setDogs(dogDetails);
        setTotalDogs(response.total);
      } else {
        setError("No dogs found for these breeds.");
      }
    } catch (err: any) {
      setError("Failed to fetch dog details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, [selectedBreed, page, sortOrder]);

  console.log("DOGS", dogs);

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

  console.log("TOTAL", totalDogs);

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
