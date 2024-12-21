import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PaginationState } from '~/types';
import { DEFAULT_ITEMS_PER_PAGE } from '~/constants';
import { debounce, getPage, getValue } from '~/utils';

const useSubstationsListParamsControl = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageIndex = getPage(searchParams.get('page'), 1);
  const pageSize = Math.min(getPage(searchParams.get('pageSize'), DEFAULT_ITEMS_PER_PAGE), DEFAULT_ITEMS_PER_PAGE);
  const q = getValue(searchParams.get('q'), '') as string | undefined;

  const handlePaginationChange = (pagination: PaginationState) => {
    const searchQueryParams = Object.fromEntries([...searchParams]);
    setSearchParams({
      ...searchQueryParams,
      page: (pagination.pageIndex + 1).toString(),
      pageSize: pagination.pageSize.toString(),
    });
  };

  const handleChangeKeyword = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const searchQueryParams = Object.fromEntries([...searchParams]);
    searchQueryParams['page'] = '1';
    setSearchParams({
      ...searchQueryParams,
      q: val,
    });
  }, 600);

  return {
    pageIndex,
    pageSize,
    q,
    handlePaginationChange,
    handleChangeKeyword,
  };
};

export default useSubstationsListParamsControl;
