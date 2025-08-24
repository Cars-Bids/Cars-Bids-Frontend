// authSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TokenResponse } from "@/features/api/Auth/authService";
import { saveTokens, clearTokens } from "@/features/api/Auth/authService";


interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken"),
  isAuth: !!(localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")),
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ tokens: TokenResponse; rememberMe: boolean }>) => {
      const { tokens, rememberMe } = action.payload;
      state.accessToken = tokens.accessToken;
      state.refreshToken = tokens.refreshToken;
      state.isAuth = true; 
      saveTokens(tokens, rememberMe);
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuth = false;
      clearTokens();
    
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
