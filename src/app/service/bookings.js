import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingApi = createApi({
  reducerPath: "bookings",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({

    //  Get all discussion (reading)

    getAllbooking: builder.query({
      query: () => "/bookings",
    }),

// get all owner bookings

     getAllOwnerbooking: builder.query({
      query: (id) => `/bookings/owner/${id}`,
    }),


       getAllAdminbooking: builder.query({
      query: (id) => `/bookings/super-admin/${id}`,
    }),

    // Get booking by id

    getAbookingById: builder.query({
      query: (id) => `/bookings/${id}`,
    }),

    // Add new booking

    addNewbooking: builder.mutation({
      query: (newbooking) => ({
        url: `/bookings`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newbooking,
      }),
    }),

    // Update a booking

    updatebooking: builder.mutation({
        query: ({ id, updatebooking }) => {
          return {
            url: `/bookings/${id}`,
            method: 'PUT',
            body: updatebooking,
          };
        },
      }),
      

    // Delete a booking

    deletebooking: builder.mutation({
        query: (id) => ({
            url: `/bookings/${id}`,
            method: 'DELETE'
        })
    })


  }),
});

export const {
    useGetAllAdminbookingQuery,
    useGetAllOwnerbookingQuery,
    useGetAllbookingQuery, 
    useGetAbookingByIdQuery,
    useAddNewbookingMutation, 
    useUpdatebookingMutation,
    useDeletebookingMutation,
  } =  bookingApi; 
  