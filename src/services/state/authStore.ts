import { create } from "zustand";
import { Dog } from "@/lib/infer-types";
import { persist } from "zustand/middleware";

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
  setAllDogs: (dogs: Dog[]) => void;
  favorites: string[];
  favoriteDogCache: Dog[];
  addFavorite: (dog: Dog) => void;
  removeFavorite: (dogId: string) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
      dogBreeds: [],
      dogs: [],
      allDogs: [],
      favorites: [],
      favoriteDogCache: [],
      setDogBreeds: (breeds) => set({ dogBreeds: breeds }),
      setDogs: (dogs) => set({ dogs }),
      setAllDogs: (dogs) => set({ allDogs: dogs }),
      addFavorite: (dog) =>
        set((state) => {
          if (state.favorites.includes(dog.id)) {
            return state;
          }
          return {
            favorites: [...state.favorites, dog.id],
            favoriteDogCache: [...state.favoriteDogCache, dog],
          };
        }),
      removeFavorite: (dogId) =>
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== dogId),
          favoriteDogCache: state.favoriteDogCache.filter((dog) => dog.id !== dogId),
        })),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        favorites: state.favorites,
        favoriteDogCache: state.favoriteDogCache,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    },
  ),
);

export default useAuthStore;
