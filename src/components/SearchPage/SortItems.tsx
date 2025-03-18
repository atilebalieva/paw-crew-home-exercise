import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { SortDirection, SortField } from "@/hooks/useDogs";

interface SortItemsProps {
  currentSort: {
    field: SortField;
    direction: SortDirection;
  };
  onSortChange: (field: SortField, direction: SortDirection) => void;
}

const SortItems = ({ currentSort, onSortChange }: SortItemsProps) => {
  const handleSortChange = (value: string) => {
    const [field, direction] = value.split(":") as [SortField, SortDirection];
    onSortChange(field, direction);
  };

  const selectValue = `${currentSort.field}:${currentSort.direction}`;

  return (
    <div className="rounded-lg shadow-sm">
      <div className="space-y-2">
        <label className="text-lg text-white font-medium text-gray-700">Sort By</label>
        <Select value={selectValue} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full border-gray-200 bg-white focus:ring-2 focus:ring-primary focus:ring-offset-1">
            <SelectValue placeholder="Choose sorting option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Breed</SelectLabel>
              <SelectItem value="breed:asc">Breed: A to Z</SelectItem>
              <SelectItem value="breed:desc">Breed: Z to A</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Name</SelectLabel>
              <SelectItem value="name:asc">Name: A to Z</SelectItem>
              <SelectItem value="name:desc">Name: Z to A</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Age</SelectLabel>
              <SelectItem value="age:asc">Age: Youngest first</SelectItem>
              <SelectItem value="age:desc">Age: Oldest first</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SortItems;
