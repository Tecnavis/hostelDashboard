import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const adminApi = createApi({
  reducerPath: "admin",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    //  Get all admin (reading)

    getAllAdmin: builder.query({
      query: (id) => `/admins/super-admins/682598d1adb06a35c127291f`,
    }),

    // Get admin by id

    getAadminById: builder.query({
      query: (id) => `/admins/${id}`,
    }),

    // Add new admin

    addNewAdmin: builder.mutation({
      query: (newadmin) => ({
        url: `/admins`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newadmin,
      }),
    }),

    // Update a admin

    updateAdmin: builder.mutation({
        query: ({id, updateadmin}) => ({
            url: `/admins/${id}`,
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: updateadmin
        })
    }),

    // Delete a admin

    deleteAdmin: builder.mutation({
        query: (id) => ({
            url: `/admins/${id}`,
            method: 'DELETE'
        })
    }),

      // Delete all admin

      deleteAllAdmin: builder.mutation({
        query: () => ({
            url: `/admins`,
            method: 'DELETE'
        })
    }),

    // block a admin

    blockAdmin: builder.mutation({
        query: (id) => ({
            url: `/admins/block/${id}`,
            method: 'PATCH'
        })
    }),


  }),
});

export const {
    useGetAllAdminQuery, 
    useGetAadminByIdQuery,
    useAddNewAdminMutation, 
    useUpdateAdminMutation,
    useDeleteAdminMutation,
    useDeleteAllAdminMutation,
    useBlockAdminMutation,
  } = adminApi; 
  