import { loanProApi } from "..";
import { IErrorResponse } from "../api.types";

const recordApi = loanProApi.injectEndpoints({
    endpoints: build => ({
      getRecords: build.query({
        query: args => {
          return {
            url: `records/${args.userId}?page=${args?.meta?.page}&itemsPerPage=${args?.meta?.itemsPerPage}&orderBy=${args?.meta?.orderBy}&sortBy=${args?.meta?.sortBy}&search=${args?.search}`,
            withCredentials: true,
          };
        },
        providesTags: ['Records'],
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
  
  export const { useGetRecordsQuery } =
  recordApi;