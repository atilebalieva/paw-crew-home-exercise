import NavBar from "@/components/NavBar/NavBar";
import SearchPage from "./SearchPage";

const Layout = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#e8f0ff] to-[#f0e6ff]">
      <NavBar />
      <SearchPage />
    </main>
  );
};

export default Layout;
