import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { adminApi } from "./service/admin";
import { ownerApi } from "./service/owner";
import { hostelApi } from "./service/hostel";
import { roomApi } from "./service/room";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    [ownerApi.reducerPath]: ownerApi.reducer,
    [hostelApi.reducerPath]: hostelApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(adminApi.middleware)
      .concat(ownerApi.middleware)
      .concat(hostelApi.middleware)
      .concat(roomApi.middleware),
});

setupListeners(store.dispatch);
