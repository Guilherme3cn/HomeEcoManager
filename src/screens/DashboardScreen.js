import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useUser, useAuth } from "@clerk/clerk-expo";

import styles from "../styles/DashboardScreenStyles";

export const DashboardScreen = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  const greetingSuffix = fullName ? `, ${fullName}` : "!";

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Ola{greetingSuffix}</Text>
      <Text style={styles.detail}>Email: {user?.primaryEmailAddress?.emailAddress}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Dashboard</Text>
        <Text style={styles.cardContent}>
          Este e um painel simples para mostrar como voce pode iniciar sua aplicacao logada.
        </Text>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={() => signOut()}>
        <Text style={styles.signOutLabel}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
};
