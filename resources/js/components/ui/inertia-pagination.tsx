// resources/js/components/ui/inertia-pagination.tsx
import { router } from '@inertiajs/react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

interface InertiaPaginationProps {
  pagination: {
    current_page: number;
    last_page: number;
    prev_page_url: string | null;
    next_page_url: string | null;
    links: Link[];
  };
}

export function InertiaPagination({ pagination }: InertiaPaginationProps) {
  const { current_page, last_page, prev_page_url, next_page_url, links } = pagination;

  if (last_page <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href={prev_page_url || '#'}
            onClick={(e) => {
              e.preventDefault();
              if (prev_page_url) router.visit(prev_page_url);
            }}
            className={!prev_page_url ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {links.map((link, index) => {
          // Skip "« Previous" and "Next »" karena kita handle manual
          if (link.label.includes('Previous') || link.label.includes('Next')) {
            return null;
          }

          if (link.label === '...') {
            return (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={index}>
              <PaginationLink
                href={link.url || '#'}
                isActive={link.active}
                onClick={(e) => {
                  e.preventDefault();
                  if (link.url) router.visit(link.url);
                }}
                className={link.active ? 'bg-blue-600 text-white hover:bg-blue-700' : ''}
              >
                {link.label}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href={next_page_url || '#'}
            onClick={(e) => {
              e.preventDefault();
              if (next_page_url) router.visit(next_page_url);
            }}
            className={!next_page_url ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}