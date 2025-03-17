import axios, { AxiosError } from "axios";

const URL = "https://frontend-take-home-service.fetch.com";

const api = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const apiClient = {
  login: (name: string, email: string) => api.post("/auth/login", JSON.stringify({ name, email })),

  logout: () => api.post("/auth/logout"),

  getDogBreeds: () => api.get("/dogs/breeds"),

  searchDogs: (queryParams: Record<string, any>) => api.get("/dogs/search", { params: queryParams }),

  getDogs: (dogIds: string[]) => api.post("/dogs", dogIds),

  matchDogs: (dogIds: string[]) => api.post("/dogs/match", dogIds),

  getLocations: (zipCodes: string[]) => api.post("/locations", zipCodes),

  getLocationByZipCode: (zipCodeSrearch: string[]) => api.post("/locations", zipCodeSrearch),

  getSearchLocations: (queryParams: Record<string, any> | null) => api.post("/locations/search", queryParams),
};
