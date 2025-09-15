import { apiSlice } from "@/features/api/Slices/apiSlice";
import type { Auction } from "@/features/types/Auction";
import type {AuctionDetailed} from "@/features/types/AuctionDetailed.ts";

export const AuctionsEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuctions: builder.query<Auction[], void>({
      query: () => '/auctions',
    }),

    getAuctionById: builder.query<Auction, number>({
      query: (id) => `/auctions/${id}`,
    }),

    getAuctionDetailedById: builder.query<AuctionDetailed, number>({
      query: (id) => `/auctions/detailed/${id}`,
      providesTags: (_result, _error, id) => [{ type: "AuctionDetailed", id }],
    }),
  }),
});

export const {
  useGetAuctionsQuery,
  useGetAuctionByIdQuery,
  useGetAuctionDetailedByIdQuery
} = AuctionsEndpoints;
