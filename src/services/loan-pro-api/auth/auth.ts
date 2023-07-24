import { ILoginPayload } from 'components/auth/Login/login.types';
import { loanProApi } from '..';
import {
  IErrorResponse,
} from '../api.types';
import { FetchArgs } from '@reduxjs/toolkit/dist/query';

export const authApi = loanProApi.injectEndpoints({
  endpoints: build => ({
    login: build.mutation<any, ILoginPayload>({
      query: (body: ILoginPayload) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Login'],
      transformErrorResponse: (
        response: { status: string | number; error?: string },
        _meta,
        _arg,
      ) => (response as IErrorResponse)?.data?.errorMessage,
    }),
    logout: build.mutation({
      query: (): FetchArgs => ({
        url: 'auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Logout'],
      transformErrorResponse: (
        response: { status: string | number; error?: string },
        _meta,
        _arg,
      ) => (response as IErrorResponse)?.data?.errorMessage,
    }),
    refreshToken: build.mutation({
      query: (): FetchArgs => ({
        url: 'auth/refresh-token',
        method: 'POST'
      }),
      invalidatesTags: ['RefreshToken'],
      transformErrorResponse: (
        response: { status: string | number; error?: string },
        _meta,
        _arg,
      ) => (response as IErrorResponse)?.data?.errorMessage,
    })
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation
} = authApi;
