import { apiSlice } from "@/features/api/Slices/apiSlice";
import type { WishlistDto, SavedSearchDto, WishlistFilteredDto } from "@/features/types/Wishlist";
import type { PagedResult } from "@/features/types/types";

const WishlistEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllWishlists: builder.query<PagedResult<WishlistDto>, { pageNumber?: number; pageSize?: number }>({
      query: ({ pageNumber = 1, pageSize = 10 }) =>
        `/Wishlist?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      providesTags: ["Wishlists"],
    }),

    getWishlistById: builder.query<WishlistDto, { id: number }>({
      query: ({ id }) => `/Wishlist/${id}`,
      providesTags: (result, error, { id }) => [{ type: "Wishlists", id }],
    }),

    createWishlist: builder.mutation<void, { userId: number; auctionId: number }>({
      query: (data) => ({
        url: "/Wishlist",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wishlists"],
    }),

    updateWishlist: builder.mutation<void, { id: number; userId: number; auctionId: number }>({
      query: (data) => ({
        url: "/Wishlist",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Wishlists"],
    }),

    deleteWishlistById: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/Wishlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlists"],
    }),

    saveSearch: builder.mutation<void, { makeId: number; modelId?: number | null }>({
      query: (data) => ({
        url: "/Wishlist/saved-search",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SavedSearches"],
    }),

    checkSavedSearchExists: builder.query<boolean, { makeId: number; modelId?: number | null }>({
      query: ({ makeId, modelId }) => {
        const queryParams = new URLSearchParams({ makeId: makeId.toString() });
        if (modelId !== undefined && modelId !== null) {
          queryParams.append("modelId", modelId.toString());
        }
        return `/Wishlist/saved-search/exists?${queryParams.toString()}`;
      },
      providesTags: ["SavedSearches"],
    }),

    getSavedSearches: builder.query<PagedResult<SavedSearchDto>, { pageNumber?: number; pageSize?: number }>({
      query: ({ pageNumber = 1, pageSize = 10 }) =>
        `/Wishlist/saved-searches?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      providesTags: ["SavedSearches"],
    }),

    deleteSavedSearch: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/Wishlist/saved-search/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SavedSearches"],
    }),

    getFilteredWishlists: builder.query<
      PagedResult<WishlistFilteredDto>,
      { pageNumber?: number; pageSize?: number; endingSoon?: boolean; newCars?: boolean; inspected?: boolean }
    >({
      query: ({ pageNumber = 1, pageSize = 10, endingSoon, newCars, inspected }) => {
        const queryParams = new URLSearchParams({
          pageNumber: pageNumber.toString(),
          pageSize: pageSize.toString(),
        });
        if (endingSoon !== undefined) queryParams.append("endingSoon", endingSoon.toString());
        if (newCars !== undefined) queryParams.append("newCars", newCars.toString());
        if (inspected !== undefined) queryParams.append("inspected", inspected.toString());
        return `/Wishlist/filtered?${queryParams.toString()}`;
      },
      providesTags: ["Wishlists"],
    }),
  }),
});

export const {
  useGetAllWishlistsQuery,
  useGetWishlistByIdQuery,
  useCreateWishlistMutation,
  useUpdateWishlistMutation,
  useDeleteWishlistByIdMutation,
  useSaveSearchMutation,
  useCheckSavedSearchExistsQuery,
  useGetSavedSearchesQuery,
  useDeleteSavedSearchMutation,
  useGetFilteredWishlistsQuery,
} = WishlistEndpoints;