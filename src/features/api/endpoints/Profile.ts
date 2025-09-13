import { apiSlice } from "@/features/api/Slices/apiSlice";
import type {
  Profile,
  ProfileUpdateRequest,
  UserBidsAndWinsDto,
  UserBiddedCarsDto,
  UserCommentDto,
  ChangePasswordDto,
  UpdateUserNotificationSettingDto,
} from "@/features/types/Profile";
import type { ProfileInReviewCarDto } from "@/features/types/Car";
import type { AuctionDto } from "@/features/types/Auction";
import type { PagedResult } from "@/features/types/types";

const ProfileEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, void>({
      query: () => "/Profile",
      providesTags: ['Profile']
    }),

    updateProfile: builder.mutation<void, ProfileUpdateRequest>({
      query: (profileData) => {
        const formData = new FormData();
        formData.append('UserId', profileData.id.toString());
        formData.append('Username', profileData.username);
        formData.append('Email', profileData.email);
        if (profileData.bio) formData.append('Bio', profileData.bio);
        if (profileData.profilePicture) formData.append('ProfilePicture', profileData.profilePicture);

        return {
          url: '/Profile',
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['Profile']
    }),

    getBidsAndWins: builder.query<UserBidsAndWinsDto, void>({
      query: () => "/Profile/bids-and-wins",
    }),

    getBiddedCars: builder.query<PagedResult<UserBiddedCarsDto>, { pageNumber?: number; pageSize?: number }>({
      query: ({ pageNumber = 1, pageSize = 10 }) =>
        `/Profile/bidded-cars?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),

    getCommentsCount: builder.query<number, void>({
      query: () => "/Profile/comments/count",
    }),

    getUserComments: builder.query<PagedResult<UserCommentDto>, { pageNumber?: number; pageSize?: number }>({
      query: ({ pageNumber = 1, pageSize = 10 }) =>
        `/Profile/comments?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),

    getUserNotificationSettings: builder.query<UpdateUserNotificationSettingDto[], void>({
      query: () => "/Profile/user-notification-setting",
      providesTags: ["NotificationSettings"],
    }),

    updateNotificationSettings: builder.mutation<void, UpdateUserNotificationSettingDto[]>({
      query: (settings) => ({
        url: "/Profile/notification-settings",
        method: "PUT",
        body: { Settings: settings },
      }),
      invalidatesTags: ["NotificationSettings"],
    }),

    getInReviewCars: builder.query<PagedResult<ProfileInReviewCarDto>, { pageNumber?: number; pageSize?: number }>({
      query: ({ pageNumber = 1, pageSize = 10 }) =>
        `/Profile/in-review-cars?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),

    getAuctionComments: builder.query<PagedResult<UserCommentDto>, { pageNumber?: number; pageSize?: number }>({
      query: ({ pageNumber = 1, pageSize = 4 }) =>
        `/Profile/auction-comments?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),

    changePassword: builder.mutation<void, ChangePasswordDto>({
      query: (dto) => ({
        url: "/Profile/change-password",
        method: "PUT",
        body: dto,
      }),
    }),

    getEndedAuctions: builder.query<PagedResult<AuctionDto>, { pageNumber?: number; pageSize?: number }>({
      query: ({ pageNumber = 1, pageSize = 10 }) =>
        `/Profile/ended-auctions?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      providesTags: ['EndedAuctions']
    }),
    getActiveAuctions: builder.query<PagedResult<AuctionDto>, { pageNumber?: number; pageSize?: number }>({
      query: ({ pageNumber = 1, pageSize = 10 }) =>
        `/Profile/active-auctions?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      providesTags: ['ActiveAuctions']
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetBidsAndWinsQuery,
  useGetBiddedCarsQuery,
  useGetCommentsCountQuery,
  useGetUserCommentsQuery,
  useGetUserNotificationSettingsQuery,
  useUpdateNotificationSettingsMutation,
  useGetInReviewCarsQuery,
  useGetAuctionCommentsQuery,
  useChangePasswordMutation,
  useGetEndedAuctionsQuery,
  useGetActiveAuctionsQuery,
} = ProfileEndpoints;
