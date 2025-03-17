import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { BoxesCore } from "@/components/ui/background-boxes";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#e8f0ff] to-[#f0e6ff flex flex-col justify-between">
      {/*    <BoxesCore /> */}
      <NavBar />
      {/*     <Toaster /> */}
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
