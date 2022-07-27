import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "../features/auth/authSlice";


export const store = configureStore({
    reducer: {
        user: userAuthReducer,
    }
})