import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/features/api/Slices/apiSlice";
import authReducer from '@/features/api/Slices/authSlice';
import navbarReducer from '@/features/api/Slices/navSlice';
import authModalReducer from '@/features/api/Slices/authModalSlice';
export const store = configureStore({
    reducer:{
        navbar: navbarReducer,
         auth: authReducer,  
         authModal: authModalReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;