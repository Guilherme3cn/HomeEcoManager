
import React, { useMemo, useState } from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/clerk-expo";

import { dashboardStyles as styles } from "../styles/DashboardStyles";
import { DashboardInfoModal } from "../components/DashboardInfoModal";

const backgroundSource = require('../../assets/images/background_dashboard.png');
const logoSource = require('../../assets/images/app-logo.png');

const summaryCardSource = require('../../assets/images/card1.png');

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
        <TouchableOpacity style={styles.menuButtonLeft} onPress={openModal}>
          <Feather name="menu" size={24} style={styles.menuIcon} />
        </TouchableOpacity>
        <View style={styles.menuButtonRight}>
          <Image source={logoSource} style={styles.logoBadge} />
        </View>

        <View style={styles.content}>
          <View style={styles.cardImageWrapper}>
            <ImageBackground source={summaryCardSource} style={styles.cardImage} imageStyle={styles.cardImageInner} resizeMode="cover">
                <Text style={styles.cardOverlayTitle}>Alerta</Text>
                <Text style={styles.cardOverlayText}>
                 Conecte com a Tuya para acessar dados dos dispositivos IOT no menu conexão
                </Text>
            </ImageBackground>
          </View>

          <View style={styles.greetingWrapper}>
            <Text style={styles.headerTitle}>Painel principal</Text>
            <Text style={styles.headerSubtitle}>
              Acompanhe o que esta acontecendo com o lar inteligente e seus objetivos de economia.
            </Text>
          </View>

          <Text style={styles.greeting}>Ola{greetingSuffix}</Text>
          <Text style={styles.detail}>Email: {email}</Text>

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













