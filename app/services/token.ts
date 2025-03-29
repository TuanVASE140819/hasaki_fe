const TOKEN_KEY = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER: "user",
};

export const tokenService = {
  getAccessToken: () => {
    return localStorage.getItem(TOKEN_KEY.ACCESS_TOKEN);
  },

  getRefreshToken: () => {
    return localStorage.getItem(TOKEN_KEY.REFRESH_TOKEN);
  },

  getUser: () => {
    const userStr = localStorage.getItem(TOKEN_KEY.USER);
    return userStr ? JSON.parse(userStr) : null;
  },

  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem(TOKEN_KEY.ACCESS_TOKEN, accessToken);
    localStorage.setItem(TOKEN_KEY.REFRESH_TOKEN, refreshToken);
  },

  setUser: (user: any) => {
    localStorage.setItem(TOKEN_KEY.USER, JSON.stringify(user));
  },

  clearTokens: () => {
    localStorage.removeItem(TOKEN_KEY.ACCESS_TOKEN);
    localStorage.removeItem(TOKEN_KEY.REFRESH_TOKEN);
    localStorage.removeItem(TOKEN_KEY.USER);
  },
};
