import { Search } from "lucide-react";
import { Input } from "../ui/input";

const SearchInput = ({ style }: { style: string }) => {
  return (
    <>
      <Search className={style} />
      <Input
        type="search"
        placeholder="Search for dogs..."
        className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-8 focus:bg-white focus:text-foreground focus:placeholder:text-muted-foreground"
      />
    </>
  );
};

export default SearchInput;
