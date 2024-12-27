import { configureStore } from "@reduxjs/toolkit";
import myselfSlice from "./myself/myselfSlice";
import notificationSlice from "./notifications/notificationSlice";

export const store = configureStore({
  reducer: {
    myselfRedux: myselfSlice,
    notificationRedux: notificationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
