import { useState, useEffect } from "react";
import * as api from "@/services/api/api";
import useAuthStore from "@/services/state/authStore";

export const useDogs = (selectedBreed: string, page: number, sortOrder: "asc" | "desc") => {
  const { dogBreeds, setDogBreeds, setDogs, setAllDogs } = useAuthStore();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [totalDogs, setTotalDogs] = useState<number>(0);

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

  useEffect(() => {
    const fetchDogs = async () => {
      if (loading) return;
      setLoading(true);

      try {
        const dogsPerPage = 24;

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
  }, [selectedBreed, page, sortOrder]);

  return { totalDogs, error };
};
