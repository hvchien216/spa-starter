import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import { customFetcher } from '~/services/custom-fetcher';
import type { Substation } from '~/services/substation/model';
import { SUBSTATION_LIST } from '~/services/substation/url';
import { GET_SUBSTATIONS_LIST_INF_QUERY, GET_SUBSTATIONS_LIST_QUERY } from '~/services/substation/request-keys';
import { ListResponse } from '~/types';

type Response = ListResponse<Substation>;
type Variables = {
  query?: string;
  page: number;
  size: number;
};

export const useGetSubstationListInfiniteQuery = <TData extends Response = Response>(
  variables: Omit<Variables, 'page'>,
  options?: Omit<
    UseInfiniteQueryOptions<TData, Error, InfiniteData<TData>>,
    'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam'
  >,
) =>
  useInfiniteQuery({
    ...options,
    queryKey: [GET_SUBSTATIONS_LIST_INF_QUERY, variables],
    queryFn: async ({ pageParam = 0 }) =>
      (await customFetcher(SUBSTATION_LIST, {
        ...variables,
        sort: 'createdDate,desc',
        page: pageParam,
      })()) as TData,
    initialPageParam: 0,
    // getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.pageable.pageNumber + 1),
    // select: (data) => data?.pages?.flatMap((page) => page.content) || [],
    getNextPageParam: () => 1, // TODO: fix this
    staleTime: 30 * 1000,
  });

export const useGetSubstationListQuery = <TData = Response>(
  variables: Variables,
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<TData>({
    ...options,
    queryKey: [GET_SUBSTATIONS_LIST_QUERY, variables],
    // queryFn: customFetcher<Response, Variables>(SUBSTATION_LIST, variables) as QueryFunction<TData>,
    initialData: data as TData,
  });
};

const data: Response = {
  content: [
    {
      id: '1',
      name: 'North Substation',
      numOfApplications: 12,
      capacityInkWac: 500,
      capacityInkWp: 600,
      capacityInkWh: 2000,
      createdAt: '2024-01-01T12:00:00Z',
      updatedAt: '2024-02-01T12:00:00Z',
    },
    {
      id: '2',
      name: 'East Substation',
      numOfApplications: 8,
      capacityInkWac: 300,
      capacityInkWp: 350,
      capacityInkWh: 1500,
      createdAt: '2024-01-05T12:00:00Z',
      updatedAt: '2024-02-05T12:00:00Z',
    },
    {
      id: '3',
      name: 'South Substation',
      numOfApplications: 5,
      capacityInkWac: 400,
      capacityInkWp: 450,
      capacityInkWh: 1800,
      createdAt: '2024-01-10T12:00:00Z',
      updatedAt: '2024-02-10T12:00:00Z',
    },
    {
      id: '4',
      name: 'West Substation',
      numOfApplications: 10,
      capacityInkWac: 600,
      capacityInkWp: 700,
      capacityInkWh: 2500,
      createdAt: '2024-01-15T12:00:00Z',
      updatedAt: '2024-02-15T12:00:00Z',
    },
    {
      id: '5',
      name: 'Central Substation',
      numOfApplications: 20,
      capacityInkWac: 1000,
      capacityInkWp: 1200,
      capacityInkWh: 5000,
      createdAt: '2024-01-20T12:00:00Z',
      updatedAt: '2024-02-20T04:00:00Z',
    },
  ],
  pageable: {
    pageNumber: 0,
    pageSize: 10,
  },
  totalPages: 1,
  totalElements: 5,
};
