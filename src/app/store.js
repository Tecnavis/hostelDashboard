import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { adminApi } from "./service/admin";
import { ownerApi } from "./service/owner";
import { hostelApi } from "./service/hostel";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    [ownerApi.reducerPath]: ownerApi.reducer,
    [hostelApi.reducerPath]: hostelApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(adminApi.middleware)
      .concat(ownerApi.middleware)
      .concat(hostelApi.middleware),
});

setupListeners(store.dispatch);
