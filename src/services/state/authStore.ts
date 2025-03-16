import { create } from "zustand";
import { Dog } from "@/lib/infer-types";

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: (user: { name: string; email: string }) => void;
  logout: () => void;
  dogBreeds: string[];
  dogs: Dog[];
  allDogs: Dog[];
  setDogBreeds: (breeds: string[]) => void;
  setDogs: (dogs: Dog[]) => void;
  /*   setAllDogs: (updateFn: (prevDogs: Dog[]) => Dog[]) => void; */
  setAllDogs: (dogs: Dog[]) => void;
  favorites: string[];
  addFavorite: (dogId: string) => void;
  removeFavorite: (dogId: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
  dogBreeds: [],
  dogs: [],
  allDogs: [],
  favorites: [],
  setDogBreeds: (breeds) => set({ dogBreeds: breeds }),
  setDogs: (dogs) => set({ dogs }),
  /* setAllDogs: (updateFn) =>
    set((state) => {
      const newDogs = updateFn(state.allDogs);
      return { allDogs: newDogs };
    }), */
  setAllDogs: (dogs) => set({ allDogs: dogs }),
  addFavorite: (dogId) =>
    set((state) => ({
      favorites: [...state.favorites, dogId],
    })),
  removeFavorite: (dogId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== dogId),
    })),
}));

export default useAuthStore;
