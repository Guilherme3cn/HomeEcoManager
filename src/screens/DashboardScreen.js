import React, { useMemo, useState } from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/clerk-expo";

import { dashboardStyles as styles } from "../styles/DashboardStyles";
import { DashboardInfoModal } from "../components/DashboardInfoModal";

const backgroundSource = require('../../assets/images/background_dashboard.png');
const logoSource = require('../../assets/images/app-logo.png');


export const DashboardScreen = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);

  const fullName = useMemo(
    () => [user?.firstName, user?.lastName].filter(Boolean).join(" "),
    [user?.firstName, user?.lastName]
  );
  const displayName = fullName || user?.username || "Usuario";
  const greetingSuffix = fullName ? ", " + fullName : "!";
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
          <View style={styles.primaryPanelCard}>
            <View style={styles.primaryPanelHeader}>
              <Text style={styles.primaryPanelTitle}>Painel principal</Text>
              <View style={styles.primaryPanelBadge}>
                <Feather name="map-pin" size={14} style={styles.primaryPanelBadgeIcon} />
                <Text style={styles.primaryPanelBadgeText}>Localizacao inteligente</Text>
              </View>
            </View>

            <Text style={styles.primaryPanelSubtitle}>
              Sincronize a localizacao do lar para liberar previsoes de clima e rotinas conectadas.
            </Text>

            <View style={styles.primaryPanelStatusRow}>
              <View style={styles.primaryPanelStatusItem}>
                <View style={styles.primaryPanelStatusIconWrapper}>
                  <Feather name="navigation" size={18} style={styles.primaryPanelStatusIcon} />
                </View>
                <View>
                  <Text style={styles.primaryPanelStatusLabel}>Localizacao</Text>
                  <Text style={styles.primaryPanelStatusValue}>Aguardando sincronizacao</Text>
                </View>
              </View>

              <View style={styles.primaryPanelStatusItem}>
                <View style={styles.primaryPanelStatusIconWrapper}>
                  <Feather name="cloud" size={18} style={styles.primaryPanelStatusIcon} />
                </View>
                <View>
                  <Text style={styles.primaryPanelStatusLabel}>Tempo</Text>
                  <Text style={styles.primaryPanelStatusValue}>-- C / --%</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.alertCard}>
            <View style={styles.alertCardHeader}>
              <Feather name="alert-triangle" size={18} style={styles.alertCardIcon} />
              <Text style={styles.alertCardTitle}>Alerta rapido</Text>
            </View>
            <Text style={styles.alertCardMessage}>
              Conecte com a Tuya para acessar dados dos dispositivos IoT na area de conexao.
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



