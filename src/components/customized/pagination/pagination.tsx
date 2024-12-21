import {
  Pagination as BasePagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui';
import { PaginationState } from '~/types';
import { cn } from '~/utils';

interface Props {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  maxVisible?: number;
  onPageChange: (params: PaginationState) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  maxVisible = 3,
  onPageChange,
  className = '',
}: Props) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    let start = Math.max(2, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages - 1, start + maxVisible - 2);

    // Adjust start if we're near the end
    if (end === totalPages - 1) {
      start = Math.max(2, end - (maxVisible - 2));
    }

    // Add ellipsis if there's a gap after first page
    if (start > 2) {
      pages.push('...');
    }

    // Add middle pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis if there's a gap before last page
    if (end < totalPages - 1) {
      pages.push('...');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <BasePagination className={cn('flex w-min items-center space-x-4', className)}>
      <div className='flex w-max items-center text-sm font-thin text-muted'>
        {startItem}-{endItem} of {totalItems}
      </div>
      <PaginationContent className='shadow-der02 rounded-lg bg-background'>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1)
                onPageChange({
                  pageIndex: currentPage - 1,
                  pageSize: itemsPerPage,
                });
            }}
            aria-disabled={currentPage === 1}
            className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
        {getVisiblePages().map((page, index) => (
          <PaginationItem key={index}>
            {page === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange({
                    pageIndex: page as number,
                    pageSize: itemsPerPage,
                  });
                }}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            href='#'
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages)
                onPageChange({
                  pageIndex: currentPage + 1,
                  pageSize: itemsPerPage,
                });
            }}
            aria-disabled={currentPage === totalPages}
            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </BasePagination>
  );
};

export default Pagination;
