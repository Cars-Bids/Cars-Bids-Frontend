import { apiSlice } from "@/features/api/Slices/apiSlice";
import type { RegisterData, AuthResponse, LoginRequest, RefreshTokenRequest } from "@/features/types/Profile";


const AccountEndopints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<void, RegisterData>({
      query: (body) => ({
        url: "/Account/Register",
        method: "POST",
        body: body,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
  query: (credentials) => ({
    url: "/Account/Login",
    method: "POST",
    body: credentials,
  }),
  }),
  sendPasswordResetEmail: builder.mutation<void, { mailTo: string }>({
    query: (body) => ({
      url: '/Account/SendPasswordResetEmail',
      method: 'POST',
      body,
    }),
  })
  ,
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


export const  {useRegisterMutation, useLoginMutation, useRefreshTokenMutation, useSendPasswordResetEmailMutation } = AccountEndopints;