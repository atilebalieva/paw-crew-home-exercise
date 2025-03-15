import { useState, useEffect } from "react";
import * as api from "@/services/api/api";
import { Dog } from "@/lib/infer-types";

export const useDogs = (selectedBreed: string, page: number, sortOrder: "asc" | "desc", dogBreeds: string[]) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [totalDogs, setTotalDogs] = useState<number>(0);
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  useEffect(() => {
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

    fetchDogs();
  }, [selectedBreed, page, sortOrder, dogBreeds]);

  return { dogs, allDogs, totalDogs, error, loading };
};
