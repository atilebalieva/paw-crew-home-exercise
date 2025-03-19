import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import FavoriteDogsPage from "./pages/FavoriteDogsPage";
import SearchPage from "./pages/SearchPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/api/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <Layout>
              <SearchPage />
            </Layout>
          }
        />
        <Route
          path="/favorites"
          element={
            <Layout>
              <FavoriteDogsPage />
            </Layout>
          }
        />
      </Routes>
      {/*     <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
