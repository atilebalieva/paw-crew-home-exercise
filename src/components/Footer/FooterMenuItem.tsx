import FooterLinks from "./FooterLinks";

interface FooterListProps {
  link: string;
  label: string;
}
const FooterMenuItem = ({ link, label }: FooterListProps) => {
  return (
    <li>
      <FooterLinks link={link} content={label} />
    </li>
  );
};

export default FooterMenuItem;
