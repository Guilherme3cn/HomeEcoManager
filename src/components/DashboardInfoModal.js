import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, ImageBackground, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { dashboardModalStyles as styles } from "../styles/DashboardStyles";
const modalBackground = require("../../assets/images/background_modal.png");

const MENU_ITEMS = [
  { id: "connection", label: "Conexao", icon: "link-2" },
  { id: "charts", label: "Graficos", icon: "bar-chart-2" },
  { id: "about", label: "Sobre", icon: "info" }
];

const MENU_DETAILS = {
  connection: {
    title: "Conectividade inteligente",
    description:
      "Gerencie integracoes com dispositivos IoT, configure credenciais seguras e monitore o status de sincronizacao em tempo real.",
    cards: [
      {
        title: "Vinculacao de dispositivos",
        description: "Cadastre sensores e medidores para acompanhar consumo em cada ambiente."
      },
      {
        title: "Monitoramento continuo",
        description: "Receba alertas quando houver picos ou interrupcoes de comunicacao."
      },
      {
        title: "Automacao proativa",
        description: "Crie rotinas de economia ajustando limites personalizados e automacoes residenciais."
      }
    ]
  },
  charts: {
    title: "Visao analitica",
    description: "Visualize tendencias de consumo, compare periodos e personalize dashboards com indicadores chave.",
    cards: [
      {
        title: "Tendencias em tempo real",
        description: "Graficos dinamicos de energia, agua e gas para identificar horarios de maior gasto."
      },
      {
        title: "Comparativos inteligentes",
        description: "Compare consumo por comodo, periodo ou metas de economia."
      },
      {
        title: "Relatorios rapidos",
        description: "Exporte dados em CSV ou compartilhe insights diretamente pelo app."
      }
    ]
  },
  about: {
    title: "Sobre o EcoHomeManager",
    description:
      "Central que combina tecnologia Expo, autenticacao Clerk e metricas para promover habitos sustentaveis.",
    cards: [
      {
        title: "Arquitetura segura",
        description: "Dados protegidos com criptografia moderna e suporte a autenticacao multifator."
      },
      {
        title: "Experiencia hibrida",
        description: "Aplicativo leve com atualizacoes OTA e suporte amplo a dispositivos moveis."
      },
      {
        title: "Rumo a sustentabilidade",
        description: "Roadmap inclui integracao com energia solar e dispositivos de automacao verde."
      }
    ]
  }
};

const PANEL_OFFSET = -420;

const makeInitials = name => {
  if (!name) {
    return "EH";
  }
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

export const DashboardInfoModal = ({ visible, onClose, onSignOut, userName, email }) => {
  const displayName = userName && userName.trim().length > 0 ? userName.trim() : "EcoHome";
  const subtitle = email && email.length > 0 ? email : "Contato nao informado";

  const [activeItem, setActiveItem] = useState("connection");
  const panelTranslate = useRef(new Animated.Value(PANEL_OFFSET)).current;

  useEffect(() => {
    if (visible) {
      panelTranslate.setValue(PANEL_OFFSET);
      Animated.timing(panelTranslate, {
        toValue: 0,
        duration: 240,
        useNativeDriver: true
      }).start();
    }
  }, [visible, panelTranslate]);

  const runCloseAnimation = callback => {
    Animated.timing(panelTranslate, {
      toValue: PANEL_OFFSET,
      duration: 200,
      useNativeDriver: true
    }).start(({ finished }) => {
      if (finished) {
        callback?.();
      }
    });
  };

  const handleRequestClose = () => {
    runCloseAnimation(onClose);
  };

  const handleSignOutPress = () => {
    runCloseAnimation(() => {
      onClose?.();
      onSignOut?.();
    });
  };

  const content = useMemo(() => MENU_DETAILS[activeItem], [activeItem]);
  const initials = useMemo(() => makeInitials(displayName), [displayName]);

  return (
    <Modal transparent animationType="none" visible={visible} onRequestClose={handleRequestClose}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.panel, { transform: [{ translateX: panelTranslate }] }]}>
          <ImageBackground
            source={modalBackground}
            style={styles.panelImageWrapper}
            imageStyle={styles.panelImage}
          >
            <View style={styles.panelInner}>
              <ScrollView contentContainerStyle={styles.panelScroll} showsVerticalScrollIndicator={false}>
                <View style={styles.profileWrapper}>
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarInitials}>{initials}</Text>
                  </View>
                  <Text style={styles.profileGreeting}>Ola, {displayName}</Text>
                  <Text style={styles.profileEmail}>{subtitle}</Text>
                </View>

                <View style={styles.navList}>
                  {MENU_ITEMS.map(item => {
                    const isActive = item.id === activeItem;
                    return (
                      <Pressable
                        key={item.id}
                        style={[styles.navItem, isActive && styles.navItemActive]}
                        onPress={() => setActiveItem(item.id)}
                      >
                        <Feather
                          name={item.icon}
                          size={18}
                          style={[styles.navIcon, isActive && styles.navIconActive]}
                        />
                        <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{item.label}</Text>
                      </Pressable>
                    );
                  })}
                </View>

                <View style={styles.detailsWrapper}>
                  <Text style={styles.detailsHeader}>{content.title}</Text>
                  <Text style={styles.detailsDescription}>{content.description}</Text>

                  <View style={styles.detailsCardList}>
                    {content.cards.map(card => (
                      <View key={card.title} style={styles.detailsCard}>
                        <Text style={styles.detailsCardTitle}>{card.title}</Text>
                        <Text style={styles.detailsCardText}>{card.description}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </ScrollView>

              <View style={styles.footer}>
                <Pressable style={styles.exitButton} onPress={handleSignOutPress}>
                  <Feather name="log-out" size={18} style={styles.exitIcon} />
                  <Text style={styles.exitLabel}>Sair</Text>
                </Pressable>
              </View>
            </View>
          </ImageBackground>
        </Animated.View>

        <Pressable style={styles.backdropTouchable} onPress={handleRequestClose} />
      </View>
    </Modal>
  );
};







