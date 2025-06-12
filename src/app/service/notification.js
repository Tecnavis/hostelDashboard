import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notificationApi = createApi({
  reducerPath: "notification",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({

    //  Get all notfication unread owner

    getAllnotficationOwnerUnRead: builder.query({
      query: (id) => `/notifications/super-owner/no-read/${id}`,
    }),

        //  Get all notfication unread admin


    getAllnotficationAdminUnRead: builder.query({
      query: (id) => `/notifications/super-admin/no-read/${id}`,
    }),

        //  Get all notfication read owner


    AllnotficationOwnerRead: builder.query({
      query: (id) => `/notifications/super-owner/read/${id}`,
    }),

        //  Get all notfication read admin


    AllnotficationAdminRead: builder.query({
      query: (id) => `/notifications/super-admin/read/${id}`,
    }),

    // Update a notfication admin

    updatenotficationAdmin: builder.mutation({
      query: ({ id, updatenotfication }) => ({
        url: `/notifications/super-admin/${id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: updatenotfication,
      }),
    }),

    // Update a notfication owner

    updatenotficationOwner: builder.mutation({
      query: ({ id, updatenotfication }) => ({
        url: `/notifications/super-owner/${id}`,
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: updatenotfication,
      }),
    }),
  }),
});

export const {
useAllnotficationAdminReadQuery,
useAllnotficationOwnerReadQuery,
useGetAllnotficationAdminUnReadQuery,
useGetAllnotficationOwnerUnReadQuery,
 useUpdatenotficationAdminMutation,
 useUpdatenotficationOwnerMutation
} = notificationApi;
