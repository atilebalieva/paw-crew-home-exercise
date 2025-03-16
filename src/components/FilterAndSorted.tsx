import { FilterAndSortItemsProps } from "@/lib/infer-types";
import FilterItems from "./SearchPage/FilterItems";
import SortItems from "./SearchPage/SortItems";

const FilterAndSorted = () => {
  return (
    <div className="flex justify-between">
      <FilterItems />
      <SortItems />
    </div>
  );
};

export default FilterAndSorted;
