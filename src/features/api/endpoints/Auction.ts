import { apiSlice } from "@/features/api/Slices/apiSlice";
import type { Auction } from "@/features/types/Auction";
import type {AddCommentRequest, AuctionDetailed} from "@/features/types/AuctionDetailed.ts";

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

    addAuctionComment: builder.mutation<void, AddCommentRequest>({
      query: (data) => {
        return {
          url: "/comment",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: (_result, _error, data) => [{ type: "AuctionDetailed", id: data.auctionId }],
    }),
  }),
});

export const {
  useGetAuctionsQuery,
  useGetAuctionByIdQuery,
  useGetAuctionDetailedByIdQuery,
  useAddAuctionCommentMutation
} = AuctionsEndpoints;
