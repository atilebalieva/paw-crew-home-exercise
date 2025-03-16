const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full border-t shadow-sm" /* style={{ backgroundColor: "#6504b5" }} */>
      <div className="container mx-auto flex h-16 items-center px-4">FOOTER</div>
    </footer>
  );
};

export default Footer;
