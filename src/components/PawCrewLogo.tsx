import { PawPrintIcon as Paw } from "lucide-react";

const PawCrewLogo = ({ color = "white" }: { color?: string }) => {
  return (
    <div className={`inline-flex items-center gap-2 text-${color}`}>
      <Paw className="h-6 w-6" />
      <h1 className="text-4xl font-bold">Paw Crew</h1>
      <Paw className="h-6 w-6" />
    </div>
  );
};

export default PawCrewLogo;
