import { apiSlice } from "@/features/api/Slices/apiSlice";
import type { Profile, ProfileUpdateRequest } from "@/features/types/Profile";


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

export const { useGetProfileQuery, useUpdateProfileMutation  } =
  ProfileEndpoints;
