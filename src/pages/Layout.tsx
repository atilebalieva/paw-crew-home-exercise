import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="min-h-screen font-playfair bg-gradient-to-t from-gray-900 to-gray-800 flex flex-col justify-between">
      <NavBar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
