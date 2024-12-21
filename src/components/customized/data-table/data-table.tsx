import { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';

import {
  ScrollArea,
  ScrollBar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Alert,
  AlertDescription,
  AlertTitle,
  Skeleton,
} from '~/components/ui';
import { Pagination } from '~/components/customized';
import SortIcon from './sort-icon';

import { OnChangeFn, PaginationState, SortingState } from '~/types';
import { cn } from '~/utils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paginationState?: PaginationState;
  sortingState?: SortingState;
  onTablePaginationChange?: OnChangeFn<PaginationState>;
  onTableSortingChange?: OnChangeFn<SortingState>;
  totalPages: number;
  totalItems: number;
  isLoading?: boolean;
  isError?: boolean;
  emptyContent?: ReactNode;
}

const DataTable = <TData, TValue>({
  columns,
  data,
  paginationState,
  sortingState,
  onTablePaginationChange,
  onTableSortingChange,
  totalPages,
  totalItems,
  isLoading,
  isError,
  emptyContent,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: onTablePaginationChange,
    onSortingChange: onTableSortingChange,
    state: {
      pagination: paginationState,
      sorting: sortingState,
    },
    manualPagination: true,
    manualSorting: true,
  });

  const _onPageChange = (params: PaginationState) => {
    const pageIndex = params.pageIndex ? Number(params.pageIndex) - 1 : 0;
    table.setPagination({ ...params, pageIndex });
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell colSpan={columns.length} className='p-0'>
                <Skeleton className='h-full w-full' />
              </TableCell>
            </TableRow>
          ))}
        </>
      );
    }

    if (isError) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length}>
            <div className='flex items-center justify-center'>
              <Alert variant='destructive' className='w-max border-none'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>There was an error loading the data. Please try again later.</AlertDescription>
              </Alert>
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (table.getRowModel().rows?.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} className='h-24 text-center'>
            {emptyContent || 'No results.'}
          </TableCell>
        </TableRow>
      );
    }

    return table.getRowModel().rows.map((row) => (
      <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <div className='flex h-full w-full flex-grow flex-col'>
      <ScrollArea className='flex-1'>
        <Table className='px-1'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const orderDir = header.column.getIsSorted();
                  const canSort = header.column.getCanSort();
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div className={cn('flex items-center space-x-2', canSort && '-ml-2')}>
                          {canSort && (
                            <button onClick={header.column.getToggleSortingHandler()}>
                              <SortIcon className='fill-primary' activeColor='fill-primary' order={orderDir} />
                            </button>
                          )}
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>{renderContent()}</TableBody>
        </Table>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
      {!isLoading && !isError && table.getRowModel().rows?.length > 0 && (
        <div className='ml-auto w-min px-1'>
          <Pagination
            currentPage={table.getState().pagination.pageIndex}
            totalPages={totalPages}
            itemsPerPage={table.getState().pagination.pageSize}
            totalItems={totalItems}
            onPageChange={_onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default DataTable;
