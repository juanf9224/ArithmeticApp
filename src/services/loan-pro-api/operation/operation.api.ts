import { IOperation, OperationType } from "constants/operation.constant";
import { loanProApi } from "..";
import { IErrorResponse } from "../api.types";
import { FetchArgs } from "@reduxjs/toolkit/dist/query";

type CalculatePayload ={
  userId: number;
  type: OperationType;
  data: {
    valueA: number;
    valueB?: number;
  }
}
const operationsApi = loanProApi.injectEndpoints({
    endpoints: build => ({
      calculate: build.mutation({
        query: ({ userId, type, data}: CalculatePayload): FetchArgs => {
          return {
            url: `/operations/${userId}/calculate`,
            method: 'POST',
            body: JSON.stringify({
                type: type,
                data: data
            }),
            credentials: 'same-origin',
            mode: 'cors'
          };
        },
        transformErrorResponse: (
          response: { status: string | number; error?: any },
          _meta,
          _arg,
        ) => {
          return (response as IErrorResponse)?.data?.errorMessage;
        },
      }),
      getOperations: build.query({
        query: (): FetchArgs => {
          return {
            url: `/operations`,
            credentials: 'same-origin',
            mode: 'cors'
          };
        },
        providesTags: ['Operations'],
        transformResponse: (
          response: IOperation[],
          _meta,
          _arg,
        ) => response,
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
  
  export const { useCalculateMutation, useGetOperationsQuery } = operationsApi;