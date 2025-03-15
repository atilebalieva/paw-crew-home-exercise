export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface FilterItemsProps {
  selectedBreed: string;
  setSelectedBreed: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  breeds: string[];
}

export interface SortItemsProps {
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
}
