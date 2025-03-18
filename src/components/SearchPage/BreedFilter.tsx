import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";

export interface BreedFilterProps {
  selectedBreed: string;
  setSelectedBreed: (value: string) => void;
  breeds: string[];
}

const BreedFilter = ({ selectedBreed, setSelectedBreed, breeds }: BreedFilterProps) => {
  return (
    <div className="rounded-lg shadow-sm">
      <div className="space-y-2">
        <Select value={selectedBreed} onValueChange={setSelectedBreed}>
          <SelectTrigger className="w-full border-gray-200 bg-white focus:ring-2 focus:ring-primary focus:ring-offset-1">
            <SelectValue placeholder="Select a breed" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Breeds</SelectItem>
            {breeds.map((breed: string) => (
              <SelectItem value={breed} key={uuidv4()}>
                {breed}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default BreedFilter;
