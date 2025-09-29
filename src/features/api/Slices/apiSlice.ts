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
      clearTokens();
      api.dispatch(logout());
      api.dispatch(apiSlice.util.resetApiState()); // очищаємо кеш після logout
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

  
      api.dispatch(apiSlice.util.resetApiState());
      api.dispatch(
        setCredentials({
          tokens: {
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
          },
          rememberMe,
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
      clearTokens();
      api.dispatch(logout());
      api.dispatch(apiSlice.util.resetApiState());
    }
  }

  return result;
};


export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
    refetchOnFocus: true,
    refetchOnReconnect: true,
refetchOnMountOrArgChange: 30 ,
  tagTypes: ["SavedSearches","Wishlists",'Profile', 'EndedAuctions', 'ActiveAuctions', 'NotificationSettings', "AuctionDetailed", "ChatMessages", "ChatRequirements"],
  endpoints: () => ({}),
});
