import { SortDirection, SortField } from "@/hooks/useDogs";

interface SortItemsProps {
  currentSort: {
    field: SortField;
    direction: SortDirection;
  };
  onSortChange: (field: SortField, direction: SortDirection) => void;
}

const SortItems = ({ currentSort, onSortChange }: SortItemsProps) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, direction] = e.target.value.split(":") as [SortField, SortDirection];
    onSortChange(field, direction);
  };

  const selectValue = `${currentSort.field}:${currentSort.direction}`;

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-secondary/20 p-6 rounded-3xl border-2 border-dashed border-secondary/50">
      <div className="w-full md:w-64">
        <label className="text-xl font-medium text-primary mb-1 block">Sort By:</label>
        <select
          value={selectValue}
          onChange={handleSortChange}
          className="bg-white p-2 rounded-xl border-primary/20 border-2 w-2xs"
        >
          <optgroup label="Breed">
            <option value="breed:asc">Breed: A to Z</option>
            <option value="breed:desc">Breed: Z to A</option>
          </optgroup>
          <optgroup label="Name">
            <option value="name:asc">Name: A to Z</option>
            <option value="name:desc">Name: Z to A</option>
          </optgroup>
          <optgroup label="Age">
            <option value="age:asc">Age: Youngest first</option>
            <option value="age:desc">Age: Oldest first</option>
          </optgroup>
        </select>
      </div>
    </div>
  );
};

export default SortItems;
