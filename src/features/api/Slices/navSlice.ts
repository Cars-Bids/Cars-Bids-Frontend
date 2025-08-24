import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface NavbarState {
  activeItem: string;
}

const initialState: NavbarState = {
  activeItem: 'Auctions',
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    setActiveItem: (state, action: PayloadAction<string>) => {
      state.activeItem = action.payload;
    },
  },
});

export const { setActiveItem } = navbarSlice.actions;
export default navbarSlice.reducer;