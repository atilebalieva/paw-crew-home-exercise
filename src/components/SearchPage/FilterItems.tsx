import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterItemsProps } from "@/lib/infer-types";

const FilterItems = ({ selectedBreed, setSelectedBreed, breeds }: FilterItemsProps) => (
  <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-secondary/20 p-6 rounded-3xl border-2 border-dashed border-secondary/50">
    <div className="w-full md:w-64">
      <label className="text-sm font-medium text-primary mb-1 block">Woof! Find by breed</label>
      <Select value={selectedBreed} onValueChange={setSelectedBreed}>
        <SelectTrigger className="bg-white rounded-xl border-primary/20">
          <SelectValue placeholder="Filter by breed" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Breeds</SelectItem>
          {breeds.map((breed) => (
            <SelectItem key={breed} value={breed}>
              {breed}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>
);

export default FilterItems;
