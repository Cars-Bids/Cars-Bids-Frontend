import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TokenResponse } from "@/features/api/Auth/authService";
import { saveTokens, clearTokens } from "@/features/api/Auth/authService";
import { decodeJwt } from "jose";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuth: boolean;
  role: string | null; // поле для ролі
}

// Ініціалізація з localStorage / sessionStorage
const accessToken = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");

let role: string | null = null;
if (accessToken) {
  try {
    const decoded = decodeJwt(accessToken);
    console.log("Decoded JWT at init:", decoded);
    // заміни 'roles' на те, що реально у твоєму токені
    role = Array.isArray(decoded.roles) ? decoded.roles[0] : decoded.roles || decoded.role || null;
  } catch (e) {
    console.error("JWT decode failed at init:", e);
  }
}

const initialState: AuthState = {
  accessToken,
  refreshToken,
  isAuth: !!accessToken,
  role,
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

      // Витягаємо роль з JWT
      try {
        const decoded = decodeJwt(tokens.accessToken);
        console.log("Decoded JWT in setCredentials:", decoded);
        state.role = Array.isArray(decoded.roles) ? decoded.roles[0] : decoded.roles || decoded.role || null;
      } catch (e) {
        console.error("JWT decode failed in setCredentials:", e);
        state.role = null;
      }

      saveTokens(tokens, rememberMe);
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuth = false;
      state.role = null;
      clearTokens();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
