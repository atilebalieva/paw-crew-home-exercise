import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: (user: { name: string; email: string }) => void;
  logout: () => void;
  dogBreeds: string[];
  setDogBreeds: (breeds: string[]) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => set({ isAuthenticated: false, user: null }),
  dogBreeds: [],
  setDogBreeds: (breeds) => set({ dogBreeds: breeds }),
}));

export default useAuthStore;
