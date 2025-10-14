import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { useSignIn, useOAuth } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";

import { SocialSignInButton } from "../components/SocialSignInButton";
import styles from "../styles/LoginScreenStyles";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

const logoSource = require("../../assets/images/app-logo.png");

const Container = Platform.OS === "ios" ? KeyboardAvoidingView : View;

export const LoginScreen = ({ navigation }) => {
  const redirectUrl = useMemo(() => {
    const scheme = Constants.expoConfig?.scheme ?? "parmatec-app";
    return AuthSession.makeRedirectUri({
      path: "oauth-native-callback",
      scheme,
      useProxy: Constants.appOwnership === "expo"
    });
  }, []);

  useWarmUpBrowser();

  const { signIn, setActive, isLoaded } = useSignIn();
  const { startOAuthFlow: startGoogleOAuth } = useOAuth({ strategy: "oauth_google", redirectUrl });
  const { startOAuthFlow: startFacebookOAuth } = useOAuth({ strategy: "oauth_facebook", redirectUrl });

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
      console.log('handleOauthSignIn invoked', { isLoaded, isSubmitting });
      if (!isLoaded) {
        Alert.alert('Autenticação', 'Clerk ainda está carregando, tente novamente em instantes.');
        return;
      }
      if (isSubmitting) {
        return;
      }

      setIsSubmitting(true);

      try {
        console.log('Starting OAuth flow');
        const result = await startFlow();
        const redirectURL = result?.signIn?.firstFactorVerification?.externalVerificationRedirectURL;
        console.log('OAuth flow resolved', { type: result?.authSessionResult?.type, createdSessionId: result?.createdSessionId, redirectURL: redirectURL ? redirectURL.toString() : null });

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
        console.error('Facebook OAuth failed', JSON.stringify(err));
        const message = err?.errors?.[0]?.message ?? "Unable to authenticate";
        Alert.alert("Social login failed", message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [isLoaded, isSubmitting, setActive]
  );

  return (
    <Container
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image source={logoSource} style={styles.logo} />
        </View>

        <View style={styles.card}>
          <View style={styles.heroSection}>
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
              provider="google"
              onPress={() => handleOauthSignIn(startGoogleOAuth)}
            />
            <SocialSignInButton
              label="Facebook"
              backgroundColor="#1877f2"
              provider="facebook"
              onPress={() => handleOauthSignIn(startFacebookOAuth)}
            />
          </View>

          <TouchableOpacity style={styles.switchAuth} onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.switchAuthText}>Nao tem conta? Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};










