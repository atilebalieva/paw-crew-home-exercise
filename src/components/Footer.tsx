const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="sticky bottom-0 z-50 w-full border-b shadow-sm" /* style={{ backgroundColor: "#6504b5" }} */>
      <div className="container mx-auto flex h-16 items-center px-4"></div>
    </footer>
  );
};

export default Footer;
