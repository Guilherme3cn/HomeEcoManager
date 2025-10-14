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
import { useSignUp, useOAuth } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";

import { SocialSignInButton } from "../components/SocialSignInButton";
import styles from "../styles/SignUpScreenStyles";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";

const logoSource = require("../../assets/images/app-logo.png");

const Container = Platform.OS === "ios" ? KeyboardAvoidingView : View;

export const SignUpScreen = ({ navigation }) => {
  const redirectUrl = useMemo(() => {
    const scheme = Constants.expoConfig?.scheme ?? "parmatec-app";
    return AuthSession.makeRedirectUri({
      path: "oauth-native-callback",
      scheme,
      useProxy: Constants.appOwnership === "expo"
    });
  }, []);

  useWarmUpBrowser();

  const { isLoaded, signUp, setActive } = useSignUp();
  const { startOAuthFlow: startGoogleOAuth } = useOAuth({ strategy: "oauth_google", redirectUrl });
  const { startOAuthFlow: startFacebookOAuth } = useOAuth({ strategy: "oauth_facebook", redirectUrl });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [stage, setStage] = useState("form");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = useCallback(async () => {
    if (!isLoaded || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await signUp.create({
        firstName: name,
        emailAddress: email,
        password
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setStage("verify");
      Alert.alert("Verifique seu email", "Enviamos um codigo para confirmar sua conta.");
    } catch (err) {
      const message = err?.errors?.[0]?.message ?? "Unable to sign up";
      Alert.alert("Cadastro falhou", message);
    } finally {
      setIsSubmitting(false);
    }
  }, [name, email, password, isLoaded, isSubmitting, signUp]);

  const handleVerify = useCallback(async () => {
    if (!isLoaded || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
      } else {
        Alert.alert("Verificacao pendente", "Finalize o cadastro para continuar.");
      }
    } catch (err) {
      const message = err?.errors?.[0]?.message ?? "Verification failed";
      Alert.alert("Codigo incorreto", message);
    } finally {
      setIsSubmitting(false);
    }
  }, [code, isLoaded, isSubmitting, setActive, signUp]);

  const handleOauthSignIn = useCallback(
    async startFlow => {
      console.log('handleOauthSignIn sign-up invoked', { isLoaded, isSubmitting });
      if (!isLoaded) {
        Alert.alert('Autenticação', 'Clerk ainda está carregando, tente novamente em instantes.');
        return;
      }
      if (isSubmitting) {
        return;
      }

      setIsSubmitting(true);

      try {
        console.log('Starting OAuth flow (sign-up)');
        const result = await startFlow();
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
            <Text style={styles.title}>Crie sua conta</Text>
            <Text style={styles.subtitle}>Utilize um email valido para se cadastrar</Text>
          </View>

          {stage === "form" ? (
            <View style={styles.form}>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Nome"
                autoCapitalize="words"
                style={[styles.input, styles.inputSpacing]}
              />
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
              <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp} disabled={isSubmitting}>
                {isSubmitting ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.primaryButtonLabel}>Continuar</Text>}
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              <Text style={styles.instruction}>Digite o codigo que recebeu por email</Text>
              <TextInput
                value={code}
                onChangeText={setCode}
                placeholder="Codigo de verificacao"
                autoCapitalize="none"
                style={[styles.input, styles.inputSpacing]}
              />
              <TouchableOpacity style={styles.primaryButton} onPress={handleVerify} disabled={isSubmitting}>
                {isSubmitting ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.primaryButtonLabel}>Verificar</Text>}
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerLabel}>ou utilize</Text>
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

          <TouchableOpacity style={styles.switchAuth} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.switchAuthText}>Ja tem conta? Fazer login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};









