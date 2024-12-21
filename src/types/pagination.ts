export type PaginationState = {
  pageIndex: number;
  pageSize: number;
};

export type ColumnSort = {
  desc: boolean;
  id: string;
};
export type SortingState = ColumnSort[];

export type Updater<T> = T | ((old: T) => T);

export type OnChangeFn<T> = (updaterOrValue: Updater<T>) => void;

export interface ListResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalPages: number;
  totalElements: number;
}
