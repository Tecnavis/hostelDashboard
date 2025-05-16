import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({

    //  Get all discussion (reading)

    getAllUser: builder.query({
      query: () => "/users",
    }),


    // Post user login

    loginUser: builder.mutation({
        query: (logUser) => ({
          url: `/users/login`,
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: logUser,
        }),
      }),

      // put user logout

      logoutUser: builder.mutation({
        query: ({id}) => ({
          url: `/users/logout/${id}`,
          method: "PUT",
        }),
      }),

    // Get user by id

    getAUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),

    // Add new user

    addNewUser: builder.mutation({
      query: (newUser) => ({
        url: `/users`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newUser,
      }),
    }),

    // Update a user

    updateUser: builder.mutation({
        query: ({ id, updateUser }) => {
          console.log('Updating user:', updateUser);  // Log the updateUser object
          return {
            url: `/users/${id}`,
            method: 'PUT',
            // headers: { "Content-Type": "application/json" },
            body: updateUser,
          };
        },
      }),
      

    // Delete a user

    deleteUser: builder.mutation({
        query: (id) => ({
            url: `/users/${id}`,
            method: 'DELETE'
        })
    })


  }),
});

export const {
    useGetAllUserQuery, 
    useLoginUserMutation,
    useGetAUserByIdQuery,
    useAddNewUserMutation, 
    useUpdateUserMutation,
    useDeleteUserMutation,
    useLogoutUserMutation,
  } =  userApi; 
  