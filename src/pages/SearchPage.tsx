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
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalDogs, setTotalDogs] = useState<number>(0);
  const { dogBreeds, setDogBreeds } = useAuthStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);

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

  const fetchDogsByBreed = async (breeds: string[], page: number) => {
    if (loading) return;
    setLoading(true);

    try {
      const allDogs: Dog[] = [];
      const dogsPerPage = 25;

      const response = await api.searchDogs({
        breeds: breeds,
        size: dogsPerPage,
        from: (page - 1) * dogsPerPage,
      });

      if (response.resultIds.length > 0) {
        const dogDetails = await api.getDogs(response.resultIds);
        allDogs.push(...dogDetails);

        setDogs(allDogs);

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
    if (dogBreeds.length > 0) {
      fetchDogsByBreed(dogBreeds, page);
    }
  }, [dogBreeds, page]);

  console.log("DOGS", dogs);

  const handleNextPage = () => {
    if (page * 25 < totalDogs) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <section>
      <Banner />
      <section className="container mx-auto px-4 py-8 mt-10">
        <div>
          <FilterItems  electedBreed, setSelectedBreed, breeds/>
          <SortItems />
        </div>
        <DogsCard dogs={dogs} isFavorite={favorites} toggleFavorite={toggleFavorite} />
        <Pagination />
      </section>
    </section>
  );
};

export default SearchPage;
