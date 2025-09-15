import {apiSlice} from "@/features/api/Slices/apiSlice.ts";
import type {RequestNewCarCommand} from "@/features/types/Car.ts";
import {serialize} from "object-to-formdata";

export const CarEndpoints = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        requestNewCar: builder.mutation<void, RequestNewCarCommand>({
            query: (data) => {

                console.log(data)
                data.userId = 1;
                return {
                    url: "/Car/requestNewCar",
                    method: "POST",
                    body: serialize(data),
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const { useRequestNewCarMutation } = CarEndpoints;
