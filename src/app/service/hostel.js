import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const hostelApi = createApi({
  reducerPath: "hostel",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    //  Get all hostel (reading)

    getAllhostel: builder.query({
      query: (id) => `/hostels`,
    }),


    // get all super admin hostles
      getAllSuperAdminhostel: builder.query({
      query: (id) => `/hostels/super-admin/${id}`,
    }),

     // get all owner hostles
      getAllOwnerhostel: builder.query({
      query: (id) => `/hostels/owner/${id}`,
    }),


    // Get hostel by id

    getAhostelById: builder.query({
      query: (id) => `/hostels/${id}`,
    }),

    // Add new hostel

    addNewhostel: builder.mutation({
      query: (newhostel) => ({
        url: `/hostels`,
        method: "POST",
        body: newhostel,
      }),
    }),

    // Update a hostel

updatehostel: builder.mutation({
  query: ({ id, updateData }) => ({
    url: `/hostels/${id}`,
    method: 'PUT',
    body: updateData,
  }),
}),

    // Delete a hostel

    deletehostel: builder.mutation({
        query: (id) => ({
            url: `/hostels/${id}`,
            method: 'DELETE'
        })
    }),

      // Delete all hostel

      deleteAllhostel: builder.mutation({
        query: () => ({
            url: `/hostels`,
            method: 'DELETE'
        })
    }),

    // block a hostel

    blockhostel: builder.mutation({
        query: (id) => ({
            url: `/hostels/block/${id}`,
            method: 'PATCH'
        })
    }),


  }),
});

export const {
  useGetAllSuperAdminhostelQuery,
  useGetAllOwnerhostelQuery,
    useGetAllhostelQuery, 
    useGetAhostelByIdQuery,
    useAddNewhostelMutation, 
    useUpdatehostelMutation,
    useDeletehostelMutation,
    useDeleteAllhostelMutation,
    useBlockhostelMutation,
  } = hostelApi; 
  