import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../state/authStore";

const URL = "https://frontend-take-home-service.fetch.com";

const api = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const handleTokenExpiration = (navigate: Function) => {
  const { logout } = useAuthStore.getState();
  logout();
  navigate("/login", { replace: true });
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const navigate = useNavigate();
      handleTokenExpiration(navigate);

      return Promise.reject(new Error("Session expired"));
    }

    return Promise.reject(error);
  },
);

export const login = async (name: string, email: string) => {
  const response = await api.post("/auth/login", JSON.stringify({ name, email }));
  return response.data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const getDogBreeds = async () => {
  const response = await api.get("/dogs/breeds");
  return response.data;
};

export const searchDogs = async (queryParams: Record<string, any>) => {
  const response = await api.get("/dogs/search", { params: queryParams });
  return response.data;
};

export const getDogs = async (dogIds: string[]) => {
  const response = await api.post("/dogs", dogIds);
  return response.data;
};

export const matchDogs = async (dogIds: string[]) => {
  const response = await api.post("/dogs/match", dogIds);
  return response.data;
};

export const getLocations = async (zipCodes: string[]) => {
  const response = await api.post("/locations", zipCodes);
  return response.data;
};
