import { QueryFunctionContext } from '@tanstack/react-query';
import httpRequest from '~/services/http-request';

export const customFetcher = <TData, TVariables>(
  url: string,
  variables?: TVariables,
): ((context?: QueryFunctionContext<[string, TVariables]>) => Promise<TData>) => {
  return async (context?: QueryFunctionContext<[string, TVariables]>) => {
    const controller = new AbortController();
    context?.signal?.addEventListener('abort', () => controller.abort(), {
      once: true,
    });

    const promise = httpRequest.get(url, {
      params: variables,
      signal: controller.signal,
    });

    return promise as Promise<TData>;
  };
};
