import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import { loanProApi } from "..";
import { IErrorResponse } from "../api.types";
import { IRecord } from "constants/record.constant";
import { IMeta } from "components/table/DynamicTable/dynamicTable.types";

interface PagedRecordResponse {
  results: IRecord[];
  total: number;
}

interface PagedRecordsPayload {
  userId: number;
  meta: IMeta;
  search: string;
}

const recordApi = loanProApi.injectEndpoints({
    endpoints: build => ({
      getRecords: build.query<PagedRecordResponse, PagedRecordsPayload>({
        query: (args): FetchArgs => {
          return {
            url: `records/${args.userId}?page=${args?.meta?.page}&itemsPerPage=${args?.meta?.itemsPerPage}&orderBy=${args?.meta?.orderBy}&sortBy=${args?.meta?.sortBy}&search=${args?.search}`,
          };
        },
        providesTags: (result, _error, _page) => 
          result
            ? [
              ...result.results.map(({ id }) => ({ type: 'Records' as const, id })),
              { type: 'Records', id: 'PARTIAL-LIST'}
              ]:
              [ { type: 'Records', id: 'PARTIAL-LIST' } ]
        ,
        transformErrorResponse: (
          response: { status: string | number; error?: any },
          _meta,
          _arg,
        ) => {
          return (response as IErrorResponse)?.data?.errorMessage;
        },
      }),
      removeRecord: build.mutation({
        query: (args): FetchArgs => {
          return {
            url: `records/${args.id}`,
            method: 'DELETE'
          };
        },
        invalidatesTags: (_result, _error, id) => [
          { type: 'Records', id},
          { type: 'Records', id: 'PARTIAL-LIST'}
        ],
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
  
  export const { useGetRecordsQuery, useRemoveRecordMutation } =
  recordApi;