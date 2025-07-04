import { apiSlice } from "../apiSlice";
import type { AuthResponse, LoginRequest, RefreshTokenRequest } from "../types/Profile";


const AccountEndopints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/Account/Register",
        method: "POST",
        body: formData,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
  query: (credentials) => ({
    url: "/Account/Login",
    method: "POST",
    body: credentials,
  }),
  }),
  refreshToken: builder.mutation<AuthResponse, RefreshTokenRequest>({
      query: (token) => ({
        url: '/Account/LoginViaRefreshToken',
        method: 'POST',
        body: token,
      }),
    }),
}),
  overrideExisting: false,
});


export const  {useRegisterMutation, useLoginMutation, useRefreshTokenMutation } = AccountEndopints;