import NavBar from "@/components/NavBar/NavBar";
import SearchPage from "./SearchPage";

const Layout = () => {
  console.log("search-page");
  return (
    <main>
      <NavBar />
      <SearchPage />
    </main>
  );
};

export default Layout;
