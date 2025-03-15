import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/auth/RequireAuth";
import Layout from "./pages/Layout";
import Favorites from "./components/Favorites";

function App() {
  return (
    <>
      {/*  <Layout /> */}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
