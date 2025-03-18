import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";

interface SelectLocation {
  results: number[];
  handleClick: (value: string) => void;
  selectedValue: string;
  title: string;
}
const SelectLocation = ({ results, handleClick, selectedValue, title }: SelectLocation) => {
  return (
    <div className="rounded-lg shadow-sm">
      <div className="space-y-2">
        <Select value={selectedValue} onValueChange={handleClick}>
          <SelectTrigger className="w-full border-gray-200 bg-white focus:ring-2 focus:ring-primary focus:ring-offset-1">
            <SelectValue placeholder="Select a zip code" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{title}</SelectItem>
            {results.map((item: number) => (
              <SelectItem value={item} key={uuidv4()}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectLocation;
