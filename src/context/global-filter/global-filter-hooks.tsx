import { useContext } from 'react';
import { useStore } from 'zustand';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import { GlobalFilterContext, GlobalFilterState } from '~/context/global-filter/global-filter-context';

export const useGlobalFilterState = <T,>(
  selector: (state: Omit<GlobalFilterState, 'updateTimeRange' | 'updateSubstations'>) => T,
  equalityFn?: (left: T, right: T) => boolean,
): T => {
  const store = useContext(GlobalFilterContext);
  if (!store) throw new Error('Missing GlobalFilterProvider in the tree');
  return useStoreWithEqualityFn(store, selector, equalityFn);
};

export const useGlobalFilterActions = <T,>(
  selector: (state: Omit<GlobalFilterState, 'timeRange' | 'substations'>) => T,
): T => {
  const store = useContext(GlobalFilterContext);
  if (!store) throw new Error('Missing GlobalFilterProvider in the tree');
  return useStore(store, selector);
};
