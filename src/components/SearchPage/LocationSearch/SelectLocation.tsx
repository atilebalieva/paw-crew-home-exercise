import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useRef, useState } from "react";

interface SelectLocation {
  results: string[];
  handleClick: (value: string) => void;
  title: string;
  loadMoreItems?: () => void;
}

const SelectLocation = ({ results, handleClick, title, loadMoreItems }: SelectLocation) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [isObserving, setIsObserving] = useState(false);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && loadMoreItems && !isObserving) {
          setIsObserving(true);
          loadMoreItems();
          setTimeout(() => {
            setIsObserving(false);
          }, 500);
        }
      },
      { threshold: 0.5 },
    );

    if (loaderRef.current && loadMoreItems) {
      observerRef.current.observe(loaderRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreItems, results.length, isObserving]);

  return (
    <div className="rounded-lg shadow-sm">
      <div className="space-y-2">
        <Select onValueChange={handleClick}>
          <SelectTrigger className="w-full border-gray-200 bg-white focus:ring-2 focus:ring-primary focus:ring-offset-1">
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{title}</SelectItem>
            {results.map((item: string) => (
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
