import { apiSlice } from "../apiSlice";
import type { Auction } from "../types";

const AuctionsEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAuctions: builder.query<Auction[], void>({
      query: () => '/Auctions',
    }),
  }),
});

export const { useGetAuctionsQuery } = AuctionsEndpoints;
