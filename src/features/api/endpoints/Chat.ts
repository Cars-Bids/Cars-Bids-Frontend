import { apiSlice } from "@/features/api/Slices/apiSlice";
import type { ChatMessageDto } from "@/features/types/Chat";

export interface ChatMessagesResponse {
    messages: ChatMessageDto[];
    totalCount: number;
}

export const ChatEndpoints = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getChatMessages: builder.query<ChatMessagesResponse, { chatId: number; page?: number; pageSize?: number }>({
            query: ({ chatId, page = 1, pageSize = 50 }) => ({
                url: `/Chat/${chatId}/messages`,
                params: { page, pageSize },
            }),
            providesTags: (result, _error, { chatId }) =>
                result
                    ? [
                        { type: "ChatMessages" as const, id: chatId },
                        ...result.messages.map((msg) => ({ type: "ChatMessages" as const, id: `${chatId}-${msg.id}` })),
                    ]
                    : [{ type: "ChatMessages" as const, id: chatId }],
        }),
        getChatRequirements: builder.query<
            { id: number; text: string; createdAt: string; createdBy: number }[],
            number
        >({
            query: (chatId) => `/Chat/${chatId}/requirements`,
            providesTags: (result, error, chatId) => [{ type: "ChatRequirements", id: chatId }],
        }),

        addRequirement: builder.mutation<
            { id: number; text: string },
            { chatId: number; text: string }
        >({
            query: ({ chatId, text }) => ({
                url: `/Chat/${chatId}/requirements`,
                method: "POST",
                body: { text },
            }),
            invalidatesTags: (result, error, { chatId }) => [{ type: "ChatRequirements", id: chatId }],
        }),

        deleteRequirement: builder.mutation<void, { chatId: number; id: number }>({
            query: ({ chatId, id }) => ({
                url: `/Chat/${chatId}/requirements/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, { chatId }) => [{ type: "ChatRequirements", id: chatId }],
        }),
    }),
});

export const {
    useGetChatMessagesQuery,
    useGetChatRequirementsQuery,
    useAddRequirementMutation,
    useDeleteRequirementMutation,} = ChatEndpoints;