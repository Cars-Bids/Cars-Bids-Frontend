import { apiSlice } from "@/features/api/Slices/apiSlice";
import type { Auction } from "@/features/types/Auction";
import type {AddCommentRequest, AuctionDetailed} from "@/features/types/AuctionDetailed.ts";
import type {ManagingAuctionPageDto} from "@/features/types/Car.ts";

export const AuctionsEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuctions: builder.query<Auction[], {PageNumber?:number ,PageSize?: number}>({
      query: ({PageNumber = 1, PageSize = 50}) => `/Auctions?pageNumber=${PageNumber}&pageSize=${PageSize}`,
    }),

    getAuctionById: builder.query<Auction, number>({
      query: (id) => `/Auctions/${id}`,
    }),

    getAuctionDetailedById: builder.query<AuctionDetailed, number>({
      query: (id) => `/Auctions/detailed/${id}`,
      providesTags: (_result, _error, id) => [{ type: "AuctionDetailed", id }],
    }),
    getActionActive: builder.query<Auction[] , {count?: number}>({
        query: ({count = 10 }) => `Auctions/active?count=${count} `
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

    getManagingAuction: builder.query<ManagingAuctionPageDto, number>({
      query: (auctionId) => `Auctions/managing/${auctionId}`,
    }),

    approveAuctionByManager: builder.mutation<void, number>({
      query: (auctionId) => {
        return{
          url: `Auctions/approve-auction/${auctionId}`,
          method: "POST",
        }
      },
    }),
  }),
});

export const {
  useGetAuctionsQuery,
  useGetAuctionByIdQuery,
  useGetAuctionDetailedByIdQuery,
  useAddAuctionCommentMutation,
  useGetActionActiveQuery,
  useGetManagingAuctionQuery,
    useApproveAuctionByManagerMutation
} = AuctionsEndpoints;
