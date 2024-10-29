import { configureStore } from "@reduxjs/toolkit";
import { userInfoSlice } from "../slices/userInfoSlice";
import { sidebarSlice } from "../slices/sidebarSlice";

export const store = configureStore({
  reducer: {
    userInfo: userInfoSlice.reducer,
    collapse: sidebarSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
