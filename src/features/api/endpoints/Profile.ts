import { apiSlice } from "../apiSlice";
import type { Profile, ProfileUpdateRequest } from "../types";

const ProfileEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<Profile | null, void>({
      query: () => "/Profile",
    }),

    updateProfile: builder.mutation<void, ProfileUpdateRequest>({
      query: (profileData) => ({
        url: "/Profile",
        method: "PUT",
        body: profileData,
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } =
  ProfileEndpoints;
