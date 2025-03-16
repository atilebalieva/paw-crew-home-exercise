import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { v4 as uuidv4 } from "uuid";

interface PaginationComponentProps {
  totalDogs: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingsCount?: number;
}

const PaginationComponent = ({ totalDogs, currentPage, onPageChange, siblingsCount = 1 }: PaginationComponentProps) => {
  const totalPages = Math.ceil(totalDogs / 25);

  const generatePagination = () => {
    const pagination: (number | string)[] = [1];

    const leftSiblingIndex = Math.max(currentPage - siblingsCount, 2);
    const rightSiblingIndex = Math.min(currentPage + siblingsCount, totalPages - 1);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    if (shouldShowLeftDots) {
      pagination.push("leftEllipsis");
    } else if (2 < leftSiblingIndex) {
      for (let i = 2; i < leftSiblingIndex; i++) {
        pagination.push(i);
      }
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pagination.push(i);
    }

    if (shouldShowRightDots) {
      pagination.push("rightEllipsis");
    } else if (rightSiblingIndex < totalPages - 1) {
      for (let i = rightSiblingIndex + 1; i < totalPages; i++) {
        pagination.push(i);
      }
    }

    if (totalPages > 1) {
      pagination.push(totalPages);
    }

    return pagination;
  };

  const paginationItems = generatePagination();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {paginationItems.map((item, index) => {
          if (typeof item === "string") {
            return (
              <PaginationItem key={uuidv4()}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={item}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(item as number);
                }}
                isActive={currentPage === item}
                className="cursor-pointer"
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
