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

    getProfile: builder.query<Profile, { userId: number }>({
      query: ({ userId }) => `/Profile/get/?userId=${userId}`,
      providesTags: ['Profile']
    }),

    getBidsAndWins: builder.query<UserBidsAndWinsDto, { userId: number }>({
      query: ({ userId }) => `/Profile/bids-and-wins?userId=${userId}`,
    }),

    getBiddedCars: builder.query<PagedResult<UserBiddedCarsDto>, { userId: number; pageNumber?: number; pageSize?: number }>({
      query: ({ userId, pageNumber = 1, pageSize = 10 }) =>
        `/Profile/bidded-cars?userId=${userId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),

    getCommentsCount: builder.query<number, { userId: number }>({
      query: ({ userId }) => `/Profile/comments/count?userId=${userId}`,
    }),

    getUserComments: builder.query<PagedResult<UserCommentDto>, { userId: number; pageNumber?: number; pageSize?: number }>({
      query: ({ userId, pageNumber = 1, pageSize = 10 }) =>
        `/Profile/comments?userId=${userId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
      providesTags: ['ActiveAuctions'],

    }),
    getInpendingCars: builder.query<PagedResult<AuctionDto>, { pageNumber?: number; pageSize?: number }>({
      query: ({ pageNumber = 1, pageSize = 10 }) =>
        `/Profile/in-pending-cars?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),
    getManagetCars: builder.query<PagedResult<AuctionDto>, { pageNumber?: number; pageSize?: number }>({
      query: ({ pageNumber = 1, pageSize = 10 }) =>
        `/Profile/managed-cars?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),

    followUser: builder.mutation<void, { followingId: number }>({
      query: ({ followingId }) => ({
        url: `/Profile/follow/${followingId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Profile'],
    }),

    unfollowUser: builder.mutation<void, { followingId: number }>({
      query: ({ followingId }) => ({
        url: `/Profile/follow/${followingId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
    getIsFollowing: builder.query<boolean, { userId: number }>({
      query: ({ userId }) => `/Profile/is-following?userId=${userId}`,
      providesTags: ['Profile'],
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
  useGetInpendingCarsQuery,
  useGetManagetCarsQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetIsFollowingQuery,
} = ProfileEndpoints;
