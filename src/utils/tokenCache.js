import * as SecureStore from "expo-secure-store";
import { tokenCache as clerkExpoTokenCache } from "@clerk/clerk-expo/token-cache";

export const tokenCache = clerkExpoTokenCache ?? {
  async getToken(key) {
    return SecureStore.getItemAsync(key);
  },
  async saveToken(key, value) {
    if (!value) {
      await SecureStore.deleteItemAsync(key);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  }
};
