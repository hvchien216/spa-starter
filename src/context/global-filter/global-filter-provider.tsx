import { ReactNode, useRef } from 'react';
import {
  GlobalFilterContext,
  createGlobalFilterStore,
  GlobalFilterStore,
} from '~/context/global-filter/global-filter-context';

type StoreProviderProps = {
  children: ReactNode;
};
export const GlobalFilterProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const storeRef = useRef<GlobalFilterStore>();
  if (!storeRef.current) {
    storeRef.current = createGlobalFilterStore();
  }
  return <GlobalFilterContext.Provider value={storeRef?.current}>{children}</GlobalFilterContext.Provider>;
};
