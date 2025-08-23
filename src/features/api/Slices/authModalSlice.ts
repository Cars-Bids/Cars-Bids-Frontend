// store/authModalSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SignupData {
  email: string;
  username: string;
}

interface ResetData {
  email: string;
  token: string;
}
interface AuthModalState {
  currentStep: "login" | "signup" | "signupPassword" | "forgotPassword" | "checkEmail" | "resetMail" | "confirmResetEmail" | "Error";
  signupData: SignupData;
  resetData: ResetData;
  tokenError: string ;
}

const initialState: AuthModalState = {
  currentStep: "login",
  signupData: { email: "", username: "" },
  resetData: { email: "", token: "" },
  tokenError: ""
};

const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<AuthModalState["currentStep"]>) {
      state.currentStep = action.payload;
    },
    setSignupData(state, action: PayloadAction<Partial<SignupData>>) {
      state.signupData = { ...state.signupData, ...action.payload };
    },
    setResetTokeAndEmail(state, action: PayloadAction<Partial<ResetData>>) {
      state.resetData = { ...state.resetData, ...action.payload };
  },
  setTokenError(state, action: PayloadAction<AuthModalState["tokenError"]>) {
    state.tokenError =  action.payload;
  }
}
});

export const { setStep, setSignupData } = authModalSlice.actions;
export default authModalSlice.reducer;
export const selectCurrentStep = (state: { authModal: AuthModalState }) => state.authModal.currentStep;
export const selectSignupData = (state: { authModal: AuthModalState }) => state.authModal.signupData;
export const selectResetData = (state: { authModal: AuthModalState }) => state.authModal.resetData;
export const { setResetTokeAndEmail } = authModalSlice.actions;
export const {setTokenError} = authModalSlice.actions;
export const selectTokenError = (state: { authModal: AuthModalState }) => state.authModal.tokenError;