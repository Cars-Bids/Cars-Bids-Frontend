import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LangState {
  current: string;
}

const initialState: LangState = {
  current: localStorage.getItem("lang") || "EN",
};

export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<string>) => {
      state.current = action.payload;
    
    },
  },
});

export const { setLang } = langSlice.actions;
export default langSlice.reducer;
