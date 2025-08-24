import { apiSlice } from "@/features/api/Slices/apiSlice";
import type { Make } from "@/features/types/Car";

const MakeEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMakes: builder.query<Make[], void>({
      query: () => "/Make",
    }),
    getMakeById: builder.query<Make, number>({
      query: (id) => `/Make/${id}`,
    }),
    addMake: builder.mutation<Make, { name: string }>({
      query: (body) => ({
        url: "/Make",
        method: "POST",
        body,
      }),
    }),
    updateMake: builder.mutation<Make, Make>({
      query: (style) => ({
        url: `/Make`,
        method: "PUT",
        body: style,
      }),
    }),
    deleteMake: builder.mutation<void, number>({
      query: (id) => ({
        url: `/Make/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMakesQuery,
  useGetMakeByIdQuery,
  useAddMakeMutation,
  useUpdateMakeMutation,
  useDeleteMakeMutation,
} = MakeEndpoints;
