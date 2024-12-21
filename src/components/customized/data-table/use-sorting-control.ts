import { useState } from 'react';
import { SortingState } from '~/types';

const useSorting = () => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const onTableSortingChange = (sorting: SortingState | ((prev: SortingState) => SortingState)) => {
    setSorting(typeof sorting === 'function' ? sorting : () => sorting);
  };

  return {
    sorting,
    onTableSortingChange,
  };
};

export default useSorting;
