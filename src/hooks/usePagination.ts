import { useState, useCallback, useMemo } from "react";

interface UsePaginationOptions {
  itemsPerPage?: number;
  initialPage?: number;
}

interface UsePaginationResult<T> {
  currentPage: number;
  totalPages: number;
  currentItems: T[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export function usePagination<T>(
  items: T[] = [],
  options: UsePaginationOptions = {},
): UsePaginationResult<T> {
  const { itemsPerPage = 5, initialPage = 1 } = options;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(items.length / itemsPerPage)),
    [items.length, itemsPerPage],
  );

  const validatedPage = useMemo(
    () => Math.min(Math.max(1, currentPage), totalPages),
    [currentPage, totalPages],
  );

  const currentItems = useMemo(() => {
    const startIndex = (validatedPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }, [items, validatedPage, itemsPerPage]);

  const goToPage = useCallback(
    (page: number) => {
      setCurrentPage(Math.min(Math.max(1, page), totalPages));
    },
    [totalPages],
  );

  const nextPage = useCallback(() => {
    setCurrentPage((current) => Math.min(current + 1, totalPages));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((current) => Math.max(current - 1, 1));
  }, []);

  return {
    currentPage: validatedPage,
    totalPages,
    currentItems,
    goToPage,
    nextPage,
    prevPage,
  };
}
