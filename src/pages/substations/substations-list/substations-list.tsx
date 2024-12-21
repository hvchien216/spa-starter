import { PageHeader } from '~/components/common';
import { DataTable } from '~/components/customized';
import { useSorting } from '~/components/customized/data-table';

import { useGetSubstationListQuery } from '~/services/substation';

import useSubstationsListParamsControl from './use-substations-list-params-control';
import { columns } from './columns';
import SubstationListFilter from './substation-list-filter';

type Props = {};

const SubstationsList = (_props: Props) => {
  const { pageIndex, pageSize, q, handlePaginationChange } = useSubstationsListParamsControl();
  const { sorting, onTableSortingChange } = useSorting();
  const { data, isLoading, isError } = useGetSubstationListQuery({
    page: pageIndex - 1,
    size: pageSize,
    query: q,
    // TODO: Add sorting
  });

  const onTablePaginationChange = (pagination) => {
    handlePaginationChange(typeof pagination === 'function' ? pagination({ pageIndex, pageSize }) : pagination);
  };

  return (
    <div className='flex flex-1 flex-col space-y-4 bg-[#fafdff]'>
      <PageHeader title='Substations' />
      <SubstationListFilter />
      <div className='mx-auto flex w-full flex-grow flex-col px-4 pb-6 xl:container xl:px-6'>
        <DataTable
          columns={columns}
          data={data?.content || []}
          totalPages={data?.totalPages || 0}
          totalItems={data?.totalElements || 0}
          paginationState={{ pageIndex, pageSize }}
          sortingState={sorting}
          onTablePaginationChange={onTablePaginationChange}
          onTableSortingChange={onTableSortingChange}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
};

export default SubstationsList;
