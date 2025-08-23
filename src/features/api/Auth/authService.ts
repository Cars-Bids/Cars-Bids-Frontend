
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const saveTokens = (tokens: TokenResponse, rememberMe: boolean) => {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem("accessToken", tokens.accessToken);
  storage.setItem("refreshToken", tokens.refreshToken);
  storage.setItem("rememberMe", rememberMe ? "1" : "0"); // додаємо ключ
};

export const getRememberMe = (): boolean => {
  const rm = localStorage.getItem("rememberMe") || sessionStorage.getItem("rememberMe");
  return rm === "1";
};
export const getAccessToken = () => localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");


export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("rememberMe");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  sessionStorage.removeItem("rememberMe");
};

