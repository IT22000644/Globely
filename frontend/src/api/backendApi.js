// services/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://manilkanavod.me/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Favorites"], // <-- Important for cache invalidation
  endpoints: (builder) => ({
    // Auth
    register: builder.mutation({
      query: (data) => ({
        url: "users/register",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    getMe: builder.query({
      query: () => "users/me",
    }),

    // Favorites
    addFavorite: builder.mutation({
      query: (favoriteData) => ({
        url: "users/favorites",
        method: "POST",
        body: favoriteData,
      }),
      invalidatesTags: ["Favorites"],
    }),
    getFavorites: builder.query({
      query: () => "users/favorites",
      providesTags: ["Favorites"],
    }),
    deleteFavorite: builder.mutation({
      query: (cca3) => ({
        url: `users/favorites/${cca3}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetMeQuery,
  useAddFavoriteMutation,
  useGetFavoritesQuery,
  useDeleteFavoriteMutation,
} = backendApi;
