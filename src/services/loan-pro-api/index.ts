import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { resetOperations } from 'store/features/operation/operationSlice';
import { resetRecords } from 'store/features/record/recordSlice';
import { IUser } from 'store/features/user/types';
import { addUser, logOut } from 'store/features/user/userSlice';


const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_BASE_URL}`,
    prepareHeaders: (headers: Headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  });
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && (result.error.status === 401 || (result.error as any)?.originalStatus === 401)) {
    console.log('error');
    // try to get a new token
    const refreshResult = await baseQuery('/auth/refresh-token', api, extraOptions)
    if (refreshResult.data) {
      // store the new token
      api.dispatch(addUser(refreshResult.data as IUser))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(resetRecords());
      api.dispatch(resetOperations());
      localStorage.removeItem('isAuthenticated');
      api.dispatch(logOut())
    }
  }
  return result
}

export const loanProApi = createApi({
  reducerPath: 'loanPro',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Login', 'Records', 'Operations', 'Logout', 'RefreshToken'],
  endpoints: () => ({}),
});
