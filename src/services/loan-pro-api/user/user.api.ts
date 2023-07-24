import { loanProApi } from '..';
import { IErrorResponse } from '../api.types';

const userApi = loanProApi.injectEndpoints({
  endpoints: build => ({
    getOperations: build.query({
      query: args => {
        return {
          url: `user/${args.userId}`,
          credentials: 'same-origin'
        };
      },
      transformResponse: (
        response: { data: any },
        _meta,
        _arg,
      ) => response.data,
      transformErrorResponse: (
        response: { status: string | number; error?: any },
        _meta,
        _arg,
      ) => {
        return (response as IErrorResponse)?.data?.errorMessage;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetOperationsQuery } =
  userApi;
