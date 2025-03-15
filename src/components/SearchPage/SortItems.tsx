import { Button } from "@/components/ui/button";
import { SortItemsProps } from "@/lib/infer-types";

const SortItems = ({ sortOrder, setSortOrder }: SortItemsProps) => {
  return (
    <div>
      {" "}
      <Button
        variant={sortOrder === "asc" ? "default" : "outline"}
        onClick={() => setSortOrder("asc")}
        className="w-36 rounded-xl"
      >
        A to Z
      </Button>
      <Button
        variant={sortOrder === "desc" ? "default" : "outline"}
        onClick={() => setSortOrder("desc")}
        className="w-36 rounded-xl"
      >
        Z to A
      </Button>
    </div>
  );
};

export default SortItems;
