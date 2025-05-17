import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const hostelApi = createApi({
  reducerPath: "hostel",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    //  Get all hostel (reading)

    getAllhostel: builder.query({
      query: (id) => `/hostels`,
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
        query: ({id, updatehostel}) => ({
            url: `/hostels/${id}`,
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: updatehostel
        })
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
    useGetAllhostelQuery, 
    useGetAhostelByIdQuery,
    useAddNewhostelMutation, 
    useUpdatehostelMutation,
    useDeletehostelMutation,
    useDeleteAllhostelMutation,
    useBlockhostelMutation,
  } = hostelApi; 
  