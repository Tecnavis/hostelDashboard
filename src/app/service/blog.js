import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const blogApi = createApi({
  reducerPath: "blog",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    //  Get all blog (reading)

    getAllblog: builder.query({
      query: (id) => `/blogs`,
    }),


    // Get blog by id

    getAblogById: builder.query({
      query: (id) => `/blogs/${id}`,
    }),

    // Add new blog

    addNewblog: builder.mutation({
      query: (newblog) => ({
        url: `/blogs`,
        method: "POST",
        body: newblog,
      }),
    }),

    // Update a blog

updateblog: builder.mutation({
  query: ({ id, updateData }) => ({
    url: `/blogs/${id}`,
    method: 'PUT',
    body: updateData,
  }),
}),

    // Delete a blog

    deleteblog: builder.mutation({
        query: (id) => ({
            url: `/blogs/${id}`,
            method: 'DELETE'
        })
    }),


    // block a blog

    blockblog: builder.mutation({
        query: (id) => ({
            url: `/blogs/block/${id}`,
            method: 'PATCH'
        })
    }),


  }),
});

export const {
    useGetAllblogQuery, 
    useGetAblogByIdQuery,
    useAddNewblogMutation, 
    useUpdateblogMutation,
    useDeleteblogMutation,
    useBlockblogMutation,
    
  } = blogApi; 
  