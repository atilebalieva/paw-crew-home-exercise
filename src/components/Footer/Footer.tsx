import { Button } from "@/components/ui/button";
import PawCrewLogo from "@/components/PawCrewLogo";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import FooterLinks from "./FooterLinks";
import FooterMenuItem from "./FooterMenuItem";

const Footer = () => {
  return (
    <footer className="w-full text-white border-t">
      <div className="container mx-auto px-4 md:px-6 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 ">
          <div className="flex flex-col space-y-4">
            <div className="mb-2">
              <PawCrewLogo />
            </div>
            <p className="text-sm max-w-xs">
              Providing exceptional care and services for your furry friends since 2015.
            </p>
            <div className="flex space-x-4 mt-4">
              <FooterLinks link={"#"} content={<FaFacebookF className="h-5 w-5" />} />
              <FooterLinks link={"#"} content={<FaInstagram className="h-5 w-5" />} />
              <FooterLinks link={"#"} content={<FaYoutube className="h-5 w-5" />} />
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Adoption</h4>
            <p className="text-sm">Every pet deserves a loving home. Consider adoption and change a life forever.</p>
            <ul className="space-y-2 text-sm">
              <FooterMenuItem link={"/"} label={"Available Dogs"} />
              <FooterMenuItem link={"#"} label={"Adoption Process"} />
              <FooterMenuItem link={"#"} label={"Success Stories"} />
            </ul>
            <Button variant="outline" size="sm" className="mt-2 text-muted-foreground cursor-pointer">
              Adopt Today
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center border-t mt-6 pt-6">
          <p className="text-xs">© {new Date().getFullYear()} Paw Crew. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0 text-sm">
            <FooterLinks link={"#"} content={"Privacy Policy"} />
            <FooterLinks link={"#"} content={"Terms of Service"} />
            <FooterLinks link={"#"} content={"Cookie Policy"} />
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
