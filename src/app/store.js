import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { adminApi } from "./service/admin";
import { ownerApi } from "./service/owner";
import { hostelApi } from "./service/hostel";
import { roomApi } from "./service/room";
import { userApi } from "./service/user";
import { bookingApi } from "./service/bookings";
import { notificationApi } from "./service/notification";

export const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    [ownerApi.reducerPath]: ownerApi.reducer,
    [hostelApi.reducerPath]: hostelApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(adminApi.middleware)
      .concat(ownerApi.middleware)
      .concat(hostelApi.middleware)
      .concat(roomApi.middleware)
      .concat(bookingApi.middleware)
      .concat(userApi.middleware)
      .concat(notificationApi.middleware),
});

setupListeners(store.dispatch);
