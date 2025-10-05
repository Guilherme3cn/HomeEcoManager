import "react-native-gesture-handler";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Constants from "expo-constants";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppNavigator } from "./src/navigation/AppNavigator";
import { AuthNavigator } from "./src/navigation/AuthNavigator";
import { tokenCache } from "./src/utils/tokenCache";

const publishableKey =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  process.env.CLERK_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  Constants.expoConfig?.extra?.clerkPublishableKey;

export default function App() {
  if (!publishableKey) {
    return (
      <SafeAreaProvider>
        <View style={styles.missingKeyContainer}>
          <Text style={styles.missingKeyTitle}>Clerk nao configurado</Text>
          <Text style={styles.missingKeyMessage}>
            Defina EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY no arquivo .env ou app.config.js para iniciar o
            provedor de autenticacao.
          </Text>
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <SafeAreaProvider>
        <NavigationContainer>
          <SignedIn>
            <AppNavigator />
          </SignedIn>
          <SignedOut>
            <AuthNavigator />
          </SignedOut>
        </NavigationContainer>
      </SafeAreaProvider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  missingKeyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    backgroundColor: "#0f172a"
  },
  missingKeyTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 12
  },
  missingKeyMessage: {
    fontSize: 16,
    color: "#cbd5f5",
    textAlign: "center"
  }
});
