import axios from "axios";
import { baseURL } from "./request";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const REFRESH_TOKEN_URL = baseURL?.concat("/auth/refresh/");

interface DecodedToken {
  exp: number; // Expiration timestamp
}

export const TokenManager = {
  async getAccessToken() {
    return await AsyncStorage.getItem("access_token");
  },

  async getRefreshToken() {
    return await AsyncStorage.getItem("refresh_token");
  },

  async clearTokens() {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
  },

  async setTokens(accessToken: string, refreshToken: string) {
    await AsyncStorage.setItem("access_token", accessToken);
    await AsyncStorage.setItem("refresh_token", refreshToken);
  },

  async isTokenExpired(token: string) {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp <= currentTime;
  },

  async refreshAccessToken() {
    const refreshToken = await this.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    try {
      const response = await axios.post(REFRESH_TOKEN_URL, {
        refresh: refreshToken,
      });
      const { access, refresh } = response.data;
      await this.setTokens(access, refresh || refreshToken);
    } catch (error) {
      console.error("Failed to refresh token:", error);
      throw error;
    }
  },
};
