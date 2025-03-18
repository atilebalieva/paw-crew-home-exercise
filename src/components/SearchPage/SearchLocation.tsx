import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import SearchHeader from "./SearchHeader";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

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
    <div className="mb-6 flex justify-center flex-col items-center">
      <SearchHeader />;
      <div className="w-full max-w-xl">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            value={searchInput}
            onChange={handleInputChange}
            placeholder="Enter State, City or Zip"
            className={cn(
              "h-12 w-full bg-white pl-10 pr-4 text-lg",
              "border-gray-200 shadow-sm ",
              "focus:border-blue-500 focus:ring-2 focus:ring-blue-500",
              "rounded-lg transition-all duration-200",
            )}
          />
        </div>
        <p className="mt-2 text-xs text-gray-300">Search for locations across the United States</p>
      </div>
    </div>
  );
};

export default SearchLocation;
