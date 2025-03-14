import { PawPrintIcon as Paw } from "lucide-react";

const PawCrewLogo = () => {
  return (
    <div className="inline-flex items-center gap-2 ">
      <Paw className="text-primary h-6 w-6" />
      <h1 className="text-4xl font-bold text-primary">Paw Crew</h1>
      <Paw className="text-primary h-6 w-6" />
    </div>
  );
};

export default PawCrewLogo;
