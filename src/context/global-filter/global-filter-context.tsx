import { createContext } from 'react';
import { createStore } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { TIME_RANGE, type TimeRange } from '~/constants';
import type { Substation } from '~/services/substation/model';

interface GlobalFilterStoreProps {
  timeRange: TimeRange;
  substations: Substation[];
}

export interface GlobalFilterState extends GlobalFilterStoreProps {
  updateTimeRange: (payload: TimeRange) => void;
  updateSubstations: (payload: Substation[]) => void;
}

export type GlobalFilterStore = ReturnType<typeof createGlobalFilterStore>;

// ====================== STORE ======================
export const createGlobalFilterStore = (initProps?: Partial<GlobalFilterStoreProps>) => {
  const DEFAULT_PROPS: GlobalFilterStoreProps = {
    timeRange: TIME_RANGE.YEARLY,
    substations: [],
  };
  return createStore<GlobalFilterState>()(
    immer((set) => ({
      ...DEFAULT_PROPS,
      ...initProps,
      // ======================
      updateTimeRange: (payload: TimeRange) =>
        set((state) => {
          state.timeRange = payload;
        }),
      // ======================
      updateSubstations: (payload: Substation[]) =>
        set((state) => {
          state.substations = payload;
        }),
    })),
  );
};

// ====================== CONTEXT ======================

export const GlobalFilterContext = createContext<GlobalFilterStore | null>(null);
