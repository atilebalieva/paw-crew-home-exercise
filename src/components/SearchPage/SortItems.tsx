interface SortItemsProps {
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
}
const SortItems = ({ sortOrder, setSortOrder }: SortItemsProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-secondary/20 p-6 rounded-3xl border-2 border-dashed border-secondary/50">
      <div className="w-full md:w-64">
        <label className="text-xl font-medium text-primary mb-1 block">Sort By: Featured</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="bg-white p-2 rounded-xl border-primary/20 border-2 w-2xs"
        >
          <option value="asc">Breed: A to Z</option>
          <option value="desc">Breed: Z to A</option>
        </select>
      </div>
    </div>
  );
};

export default SortItems;
