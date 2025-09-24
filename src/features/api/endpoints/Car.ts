import { apiSlice } from "@/features/api/Slices/apiSlice";
import type { CarDto, CarManagerDto } from "@/features/types/Car";

const CarEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query<CarDto[], { pageNumber?: number; pageSize?: number }>({
      query: ({ pageNumber = 1, pageSize = 10 }) =>
        `/Car?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),

    getCarById: builder.query<CarDto, number>({
      query: (id) => `/Car/${id}`,
    }),

    getCarManagerById: builder.query<CarManagerDto, number>({
      query: (id) => `/Car/manager/${id}`,
    }),

    createCar: builder.mutation<void, FormData>({
      query: (body) => ({
        url: "/Car",
        method: "POST",
        body,
      }),
    }),

    updateCar: builder.mutation<void, FormData>({
      query: (body) => ({
        url: "/Car",
        method: "PUT",
        body,
      }),
    }),

    deleteCar: builder.mutation<void, number>({
      query: (id) => ({
        url: `/Car/${id}`,
        method: "DELETE",
      }),
    }),

    uploadImages: builder.mutation<string[], FormData>({
      query: (body) => ({
        url: "/uploadImages",
        method: "POST",
        body,
      }),
    }),

    requestNewCar: builder.mutation<void, FormData>({
      query: (body) => ({
        url: "/Car/requestNewCar",
        method: "POST",
        body,
      }),
    }),

    assignAndStartAuction: builder.mutation<void, number>({
      query: (carId) => ({
        url: `/Car/${carId}/assign-and-start-auction`,
        method: "POST",
      }),
    }),

    addCarImages: builder.mutation<
      void,
      { carId: number; files: FormData; category: string }
    >({
      query: ({ carId, files, category }) => ({
        url: `/Car/${carId}/images?category=${category}`,
        method: "POST",
        body: files,
      }),
    }),

    deleteCarImage: builder.mutation<void, { carId: number; imageId: number }>({
      query: ({ carId, imageId }) => ({
        url: `/Car/${carId}/images/${imageId}`,
        method: "DELETE",
      }),
    }),

    updateCarImagesOrder: builder.mutation<
      void,
      { carId: number; orderedImageIds: number[] }
    >({
      query: ({ carId, orderedImageIds }) => ({
        url: `/Car/${carId}/images/order`,
        method: "PUT",
        body: orderedImageIds,
      }),
    }),
  }),
});

export const {
  useGetCarsQuery,
  useGetCarByIdQuery,
  useGetCarManagerByIdQuery,
  useCreateCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useUploadImagesMutation,
  useRequestNewCarMutation,
  useAssignAndStartAuctionMutation,
  useAddCarImagesMutation,
  useDeleteCarImageMutation,
  useUpdateCarImagesOrderMutation,
} = CarEndpoints;
