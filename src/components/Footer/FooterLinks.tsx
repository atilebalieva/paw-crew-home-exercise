import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface FooterLinksProps {
  link: string;
  content: ReactNode | string;
}
const FooterLinks = ({ link, content }: FooterLinksProps) => {
  return (
    <Link to={link} className="hover:text-fuchsia-200 transition-colors">
      {content}
    </Link>
  );
};

export default FooterLinks;
