import {apiSlice} from "@/features/api/Slices/apiSlice.ts";
import type {RequestNewCarCommand} from "@/features/types/Car.ts";
import {serialize} from "object-to-formdata";

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
    }),
    overrideExisting: false,
});

export const { useRequestNewCarMutation } = CarEndpoints;
