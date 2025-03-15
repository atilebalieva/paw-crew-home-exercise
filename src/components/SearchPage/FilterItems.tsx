import { FilterItemsProps } from "@/lib/infer-types";

const FilterItems = ({ selectedBreed, setSelectedBreed, breeds }: FilterItemsProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-secondary/20 rounded-3xl border-2 border-dashed border-secondary/50">
      <div className="w-full md:w-64">
        <label className="text-xl font-medium text-primary mb-1 block">Woof! Find by breed</label>
        <select
          value={selectedBreed}
          onChange={setSelectedBreed}
          className="bg-white p-2 rounded-xl border-primary/20 border-2 w-2xs"
        >
          <option value="">All Breeds</option>
          {breeds.map((breed: string, index) => (
            <option value={breed} key={index + 0.5}>
              {breed}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterItems;
