import React, { useMemo, useState } from "react";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/clerk-expo";

import { dashboardStyles as styles } from "../styles/DashboardStyles";
import { DashboardInfoModal } from "../components/DashboardInfoModal";

const backgroundSource = require('../../assets/images/background_dashboard.png');

export const DashboardScreen = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);

  const fullName = useMemo(
    () => [user?.firstName, user?.lastName].filter(Boolean).join(" "),
    [user?.firstName, user?.lastName]
  );
  const displayName = fullName || user?.username || "Usuario";
  const greetingSuffix = fullName ? `, ${fullName}` : "!";
  const email = user?.primaryEmailAddress?.emailAddress ?? "-";

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <ImageBackground source={backgroundSource} style={styles.background} resizeMode="cover">
      <View style={styles.backgroundOverlay} />

      <View style={styles.container}>
        <TouchableOpacity style={styles.menuButton} onPress={openModal}>
          <Feather name="menu" size={24} style={styles.menuIcon} />
        </TouchableOpacity>

        <View style={styles.content}>
          <View style={styles.greetingWrapper}>
            <Text style={styles.headerTitle}>Painel principal</Text>
            <Text style={styles.headerSubtitle}>
              Acompanhe o que esta acontecendo com o lar inteligente e seus objetivos de economia.
            </Text>
          </View>

          <Text style={styles.greeting}>Ola{greetingSuffix}</Text>
          <Text style={styles.detail}>Email: {email}</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Resumo rapido</Text>
            <Text style={styles.cardContent}>
              Consulte indicadores de consumo, configure dispositivos conectados e veja o impacto das acoes de economia em tempo
              real.
            </Text>
          </View>
        </View>
      </View>

      <DashboardInfoModal
        visible={isModalVisible}
        onClose={closeModal}
        onSignOut={signOut}
        userName={displayName}
        email={email}
      />
    </ImageBackground>
  );
};

