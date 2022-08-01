import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "../features/auth/authSlice";
import eventReducer from "../features/events/eventSlice";

export const store = configureStore({
    reducer: {
        user: userAuthReducer,
        events: eventReducer,
    }
})