import {apiSlice} from "@/features/api/Slices/apiSlice.ts";
import type {RequestNewCarCommand} from "@/features/types/Car.ts";
import {serialize} from "object-to-formdata";
import type {UpdateCarCommand} from "@/features/types/UpdateCarCommand.ts";

export const CarEndpoints = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        requestNewCar: builder.mutation<void, RequestNewCarCommand>({
            query: ({photos, ...data}) => {
                console.log(data)
                data.userId = 1;

                const formData = serialize(data);
                photos.forEach((photo) => {
                    formData.append('photos', photo);
                })

                return {
                    url: "/Car/requestNewCar",
                    method: "POST",
                    body: formData,
                };
            },
        }),
        updateCar: builder.mutation<void, UpdateCarCommand>({
            query: (cmd) => {
                return {
                    url: "/Car",
                    method: "PUT",
                    body: serialize(cmd),
                }
            }
        }),
        fileUpload: builder.mutation<string[], { files: FileList; carId: number; categoryId: number }>({
            query: ({ files, carId, categoryId }) => {
                const formData = new FormData();

                Array.from(files).forEach(file => {
                    formData.append("files", file);
                });

                return {
                    url: `Car/${carId}/images?category=${categoryId}`,
                    method: "POST",
                    body: formData,
                };
            }
        }),
        photoDelete: builder.mutation<void, { photoId: number; carId: number }>({
            query: ({ photoId, carId }) => {
                return {
                    url: `Car/${carId}/images/${photoId}`,
                    method: "DELETE"
                };
            }
        }),
        reorderCarImages: builder.mutation<void, { carId: number; orderIds: number[]; categoryId: number}>({
            query: ({ carId, orderIds, categoryId }) => ({
                url: `Car/${carId}/images/order?category=${categoryId}`,
                method: 'PUT',
                body: orderIds,
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useRequestNewCarMutation,
    useUpdateCarMutation,
    useFileUploadMutation,
    usePhotoDeleteMutation,
    useReorderCarImagesMutation
} = CarEndpoints;
