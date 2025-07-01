import { 
  type BaseQueryApi, 
  createApi, 
  fetchBaseQuery, 
  type FetchArgs, 
  type FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import conf from "../../app/conf/basic.conf.json";
import type { RootState } from '../../app/store';
import { logout, setCredentials } from './authSlice';
import type { AuthResponse } from './types';

const baseQuery = fetchBaseQuery({
  baseUrl: conf.baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object = {}
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && (result.error as FetchBaseQueryError).status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }
    const refreshResult = await baseQuery(
      {
        url: '/Account/LoginViaRefreshToken',
        method: 'POST',
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const authData = refreshResult.data as AuthResponse;
      api.dispatch(setCredentials(authData));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [], 
  endpoints: () => ({}),
});