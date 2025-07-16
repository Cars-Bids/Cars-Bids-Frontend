import { apiSlice } from "../apiSlice";
import type { Make } from "../types/Car";


const CarEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query<Make[], void>({
      query: () => "/Car",
    }),
    getMakeById: builder.query<Make, number>({
      query: (id) => `/Make/${id}`,
    }),
    addMake: builder.mutation<Make, FormData>({
      query: (body) => ({
        url: "/Make",
        method: "POST",
        body,
      }),
    }),
    updateCar: builder.mutation<Make, FormData>({
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
  useGetCarsQuery,
  useAddMakeMutation,
  useDeleteMakeMutation,
  useGetMakeByIdQuery,
  useUpdateCarMutation,
} = CarEndpoints;
