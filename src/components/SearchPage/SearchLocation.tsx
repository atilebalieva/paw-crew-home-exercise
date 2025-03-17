import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchLocationProps {
  onSearch: (searchTerm: string) => void;
}

const SearchLocation = ({ onSearch }: SearchLocationProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [showResults, setShowResults] = useState(false);
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setShowResults(!!e.target.value);
  };

  return (
    <div className="mb-6 relative">
      <input
        type="text"
        value={searchInput}
        onChange={handleInputChange}
        placeholder="Enter State, City or Zip"
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchLocation;
