import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/auth/RequireAuth";
import Layout from "./pages/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/search-page" element={<Layout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
