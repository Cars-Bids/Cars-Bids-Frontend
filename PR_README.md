# API Slice Refactor: Token Refresh Logic

## Overview
This pull request introduces a robust authentication token refresh mechanism to the RTK Query `apiSlice` in the project. The update ensures that when an API request fails due to an expired or invalid access token (HTTP 401), the application will attempt to refresh the token using the stored refresh token. If the refresh is successful, the original request is retried with the new token; otherwise, the user is logged out.

## Key Changes
- **Enhanced `baseQueryWithReauth`**: Added logic to intercept 401 errors, attempt token refresh, and retry the original request if possible.
- **Automatic Logout**: If no refresh token is available or the refresh fails, the user is automatically logged out for security.
- **Centralized Auth Handling**: All API requests now benefit from this logic, improving user experience and security.

## How It Works
1. API requests are made using RTK Query's `baseQuery`.
2. If a request returns a 401 error:
   - The code checks for a valid refresh token.
   - If present, it sends a request to `/Account/LoginViaRefreshToken` to obtain a new access token.
   - On success, credentials are updated and the original request is retried.
   - On failure, the user is logged out.

## Files Modified
- `src/features/api/apiSlice.ts`: Main logic for token refresh and error handling.

## Benefits
- Seamless user experience with automatic token refresh.
- Improved security by handling token expiration and invalidation.
- Centralized and reusable authentication logic for all API endpoints.

## Usage
No additional steps are required. All API requests using the `apiSlice` will now automatically handle token refresh and logout as needed.

---

If you have any questions or need further clarification, please let me know!
