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
import { useSignUp } from "@clerk/clerk-expo";

export const SignUpScreen = ({ navigation }) => {
  const { isLoaded, signUp, setActive } = useSignUp();

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
  }, [email, password, isLoaded, isSubmitting, signUp]);

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crie sua conta</Text>
        <Text style={styles.subtitle}>Utilize um email valido para se cadastrar</Text>
      </View>

      {stage === "form" ? (
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
          <TouchableOpacity style={styles.primaryButton} onPress={handleSignUp} disabled={isSubmitting}>
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.primaryButtonLabel}>Continuar</Text>
            )}
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
            {isSubmitting ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.primaryButtonLabel}>Verificar</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.switchAuth} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.switchAuthText}>Ja tem conta? Fazer login</Text>
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
  instruction: {
    fontSize: 15,
    color: "#4b5563",
    marginBottom: 12
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
