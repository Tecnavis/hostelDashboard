import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const roomApi = createApi({
  reducerPath: "room",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    //  Get all room (reading)

    getAllroom: builder.query({
      query: (id) => `/rooms`,
    }),

     getAllHostelRoom: builder.query({
      query: (id) => `/rooms/hostels/${id}`,
    }),

    // Get room by id

    getAroomById: builder.query({
      query: (id) => `/rooms/${id}`,
    }),

    // Add new room

    addNewroom: builder.mutation({
      query: (newroom) => ({
        url: `/rooms`,
        method: "POST",
        body: newroom,
      }),
    }),

    // Update a room

    updateroom: builder.mutation({
        query: ({id, updateroom}) => ({
            url: `/rooms/${id}`,
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: updateroom
        })
    }),

    // Delete a room

    deleteroom: builder.mutation({
        query: ({id, hostelId }) => ({
            url: `/rooms/${id}/hostels/${hostelId}`,
            method: 'DELETE'
        })
    }),

      // Delete all room

      deleteAllroom: builder.mutation({
        query: () => ({
            url: `/rooms`,
            method: 'DELETE'
        })
    }),

    // block a room

    blockroom: builder.mutation({
        query: (id) => ({
            url: `/rooms/block/${id}`,
            method: 'PATCH'
        })
    }),


  }),
});

export const {
    useGetAllroomQuery, 
    useGetAllHostelRoomQuery,
    useGetAroomByIdQuery,
    useAddNewroomMutation, 
    useUpdateroomMutation,
    useDeleteroomMutation,
    useDeleteAllroomMutation,
    useBlockroomMutation,
  } = roomApi; 
  