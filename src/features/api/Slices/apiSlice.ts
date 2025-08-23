// services/api.ts
import {
  type BaseQueryApi,
  createApi,
  fetchBaseQuery,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import conf from "@/app/conf/basic.conf.json";
import type { RootState } from "@/app/store";
import { logout, setCredentials } from "@/features/api/Slices/authSlice";
import type { AuthResponse } from "@/features/types/Profile";
import {
  saveTokens,
  getRefreshToken,
  clearTokens,
  getRememberMe,
} from "@/features/api/Auth/authService";

const baseQuery = fetchBaseQuery({
  baseUrl: conf.baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
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
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      api.dispatch(logout());
      clearTokens();
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: "/Account/LoginViaRefreshToken",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const authData = refreshResult.data as AuthResponse;
      const rememberMe = getRememberMe();

      api.dispatch(
        setCredentials({
          tokens: {
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
          },
          rememberMe: rememberMe,
        })
      );

      saveTokens(
        {
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
        },
          rememberMe
      );

    
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      clearTokens();
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: () => ({}),
});
