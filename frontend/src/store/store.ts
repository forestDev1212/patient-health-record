import { configureStore } from "@reduxjs/toolkit";
import basicSlice from "./slice/basic.slice";
import authSlice from "./slice/auth.slice";

const store = configureStore({
  reducer: {
    basic: basicSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
