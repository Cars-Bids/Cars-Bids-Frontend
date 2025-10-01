import {apiSlice} from "@/features/api/Slices/apiSlice.ts";

const NotificationEndpoints = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        markNotificationRead: builder.mutation<void, number>({
            query: (id) => ({
                url: `/Notification/${id}/read`,
                method: "POST"
            }),
        }),
    }),
});

export const {
    useMarkNotificationReadMutation
} = NotificationEndpoints;