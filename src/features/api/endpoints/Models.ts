import { apiSlice } from "@/features/api/Slices/apiSlice";
import type { Model, CreateModel } from "@/features/types/Car";


const ModelsEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getModels: builder.query<Model[], void>({
      query: () => "/Model",
    }),
    getModelsByMake: builder.query<Model[], number>({
      query: (makeId) => `/Model/makeId=${makeId}`,
    }),
    getModelById: builder.query<Model, number>({
      query: (id) => `/Model/${id}`,
    }),
    addModel: builder.mutation<Model, CreateModel>({
      query: (body) => ({
        url: "/Model",
        method: "POST",
        body,
      }),
    }),
    updateModel: builder.mutation<void, Model>({
      query: (model) => ({
        url: "/Model",
        method: "PUT",
        body: model,
      }),
    }),
    deleteModel: builder.mutation<void, number>({
      query: (id) => ({
        url: `/Model/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetModelsQuery,
  useGetModelsByMakeQuery,
  useGetModelByIdQuery,
  useAddModelMutation,
  useUpdateModelMutation,
  useDeleteModelMutation,
} = ModelsEndpoints;
