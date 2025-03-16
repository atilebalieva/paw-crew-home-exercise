import NavBar from "@/components/NavBar/NavBar";
import SearchPage from "./SearchPage";
import Footer from "@/components/Footer";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#e8f0ff] to-[#f0e6ff flex flex-col justify-between">
      <NavBar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
