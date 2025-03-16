import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/auth/RequireAuth";
import Layout from "./pages/Layout";
import FavoriteDogsPage from "./pages/FavoriteDogsPage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
