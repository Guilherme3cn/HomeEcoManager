import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from "react-native";
import { useSignIn, useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

import { SocialSignInButton } from "../components/SocialSignInButton";

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = ({ navigation }) => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { startOAuthFlow: startGoogleOAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: startFacebookOAuth } = useOAuth({ strategy: "oauth_facebook" });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSignIn = useCallback(async () => {
    if (!isLoaded || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { createdSessionId } = await signIn.create({
        identifier: email,
        password
      });

      if (createdSessionId) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      const message = err?.errors?.[0]?.message ?? "Unable to sign in";
      Alert.alert("Login failed", message);
    } finally {
      setIsSubmitting(false);
    }
  }, [email, password, isLoaded, isSubmitting, setActive, signIn]);

  const handleOauthSignIn = useCallback(
    async startFlow => {
      if (!isLoaded || isSubmitting) {
        return;
      }

      setIsSubmitting(true);

      try {
        const redirectUrl = Linking.createURL("/oauth") || undefined;
        const result = await startFlow({ redirectUrl });

        const createdSessionId = result?.createdSessionId;
        const externalSetActive = result?.setActive;
        const signInResult = result?.signIn;
        const signUpResult = result?.signUp;

        if (createdSessionId) {
          await externalSetActive?.({ session: createdSessionId });
          return;
        }

        const sessionId =
          signInResult?.createdSessionId ||
          signUpResult?.createdSessionId ||
          signInResult?.existingSessionId ||
          signUpResult?.existingSessionId;

        if (sessionId) {
          await setActive({ session: sessionId });
        }
      } catch (err) {
        const message = err?.errors?.[0]?.message ?? "Unable to authenticate";
        Alert.alert("Social login failed", message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [isLoaded, isSubmitting, setActive]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bem-vindo de volta</Text>
        <Text style={styles.subtitle}>Entre com sua conta para continuar</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          style={[styles.input, styles.inputSpacing]}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          secureTextEntry
          style={[styles.input, styles.inputSpacing]}
        />
        <TouchableOpacity style={styles.primaryButton} onPress={handleEmailSignIn} disabled={isSubmitting}>
          {isSubmitting ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.primaryButtonLabel}>Entrar</Text>}
        </TouchableOpacity>
      </View>

      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerLabel}>ou continue com</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialButtons}>
        <SocialSignInButton
          label="Google"
          backgroundColor="#db4437"
          onPress={() => handleOauthSignIn(startGoogleOAuth)}
        />
        <SocialSignInButton
          label="Facebook"
          backgroundColor="#1877f2"
          onPress={() => handleOauthSignIn(startFacebookOAuth)}
        />
      </View>

      <TouchableOpacity style={styles.switchAuth} onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.switchAuthText}>Nao tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    backgroundColor: "#f5f5f5"
  },
  header: {
    marginBottom: 32
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827"
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 8
  },
  form: {
    width: "100%",
    marginBottom: 24
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#d1d5db"
  },
  inputSpacing: {
    marginBottom: 12
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center"
  },
  primaryButtonLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600"
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 32
  },
  dividerLabel: {
    marginHorizontal: 12,
    color: "#6b7280"
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#e5e7eb"
  },
  socialButtons: {
    width: "100%"
  },
  switchAuth: {
    marginTop: 32,
    alignItems: "center"
  },
  switchAuthText: {
    color: "#2563eb",
    fontSize: 15,
    fontWeight: "500"
  }
});
