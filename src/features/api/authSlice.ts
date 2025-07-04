import { createSlice} from '@reduxjs/toolkit';

import type { AuthState } from './types/Profile';

import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ AccessToken: string; RefreshToken: string }>) => {
      state.accessToken = action.payload.AccessToken;
      state.refreshToken = action.payload.RefreshToken;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
