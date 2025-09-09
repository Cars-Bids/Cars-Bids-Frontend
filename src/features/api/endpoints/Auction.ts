import { apiSlice } from "@/features/api/Slices/apiSlice";
import type { PaginatedAuctions } from "@/features/types/Auction";

const AuctionsEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuctions: builder.query<PaginatedAuctions, { pageNumber?: number; pageSize?: number }>({
      query: ({ pageNumber = 1, pageSize = 50 } = {}) => ({
        url: '/Auctions',
        params: { pageNumber, pageSize },
      }),
    }),
  }),
});

export const { useGetAuctionsQuery } = AuctionsEndpoints;
