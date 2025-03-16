import { create } from "zustand";
import { Dog } from "@/lib/types";
import { persist } from "zustand/middleware";

interface AuthState {
  favorites: string[];
  favoriteDogCache: Dog[];
  addFavorite: (dog: Dog) => void;
  removeFavorite: (dogId: string) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      favorites: [],
      favoriteDogCache: [],
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
      }),
    },
  ),
);

export default useAuthStore;
