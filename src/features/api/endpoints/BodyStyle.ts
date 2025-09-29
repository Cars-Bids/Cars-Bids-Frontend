import { apiSlice } from "@/features/api/Slices/apiSlice";
import type { Style } from "@/features/types/Car";


const BodyStylesEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStyles: builder.query<Style[], void>({
      query: () => "/BodyStyle?pageNumber=1&pageSize=200",
    }),
    getStyleById: builder.query<Style, number>({
      query: (id) => `/BodyStyle/${id}`,
    }),

    addStyle: builder.mutation<Style, { styleName: string }>({
      query: (body) => ({
        url: "/BodyStyle",
        method: "POST",
        body,
      }),
    }),
    updateStyle: builder.mutation<Style, Style>({
      query: (style) => ({
        url: `/BodyStyle`,
        method: "PUT",
        body: style,
      }),
    }),
    deleteStyle: builder.mutation<void, number>({
      query: (id) => ({
        url: `/BodyStyle/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetStylesQuery,
  useGetStyleByIdQuery,
  useAddStyleMutation,
  useUpdateStyleMutation,
  useDeleteStyleMutation,
} = BodyStylesEndpoints;
