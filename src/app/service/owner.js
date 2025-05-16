import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const ownerApi = createApi({
  reducerPath: "owner",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    //  Get all owner (reading)
 
     getAllowner: builder.query({
      query: () => `/owners`,
    }),

// get all owner staff

    getAllownerStaff: builder.query({
      query: (id) => `/owners/super-owner/${id}`,
    }),

    // Get owner by id

    getAownerById: builder.query({
      query: (id) => `/owners/${id}`,
    }),

    // Add new owner

    addNewowner: builder.mutation({
      query: (newowner) => ({
        url: `/owners`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newowner,
      }),
    }),

    // Update a owner

    updateowner: builder.mutation({
        query: ({id, updateowner}) => ({
            url: `/owners/${id}`,
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: updateowner
        })
    }),

    // Delete a owner

    deleteowner: builder.mutation({
        query: (id) => ({
            url: `/owners/${id}`,
            method: 'DELETE'
        })
    }),

      // Delete all owner

      deleteAllowner: builder.mutation({
        query: () => ({
            url: `/owners`,
            method: 'DELETE'
        })
    }),

    // block a owner

    blockowner: builder.mutation({
        query: (id) => ({
            url: `/owners/block/${id}`,
            method: 'PATCH'
        })
    }),


  }),
});

export const {
    useGetAllownerQuery, 
    useGetAllownerStaffQuery,
    useGetAownerByIdQuery,
    useAddNewownerMutation, 
    useUpdateownerMutation,
    useDeleteownerMutation,
    useDeleteAllownerMutation,
    useBlockownerMutation,
  } = ownerApi; 
  