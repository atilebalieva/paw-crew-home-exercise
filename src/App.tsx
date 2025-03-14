import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/auth/RequireAuth";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RequireAuth />}>
        <Route path="/search-page" element={<SearchPage />} />
      </Route>
    </Routes>
  );
}

export default App;
