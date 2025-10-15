import React, { useCallback, useMemo, useState } from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/clerk-expo";
import * as Location from "expo-location";

import { dashboardStyles as styles } from "../styles/DashboardStyles";
import { DashboardInfoModal } from "../components/DashboardInfoModal";

const backgroundSource = require('../../assets/images/background_dashboard.png');
const logoSource = require('../../assets/images/app-logo.png');

const WEATHER_CODE_DESCRIPTIONS = {
  0: "Ceu limpo",
  1: "Predominantemente limpo",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Nevoeiro",
  48: "Neve com nevoeiro",
  51: "Garoa fraca",
  53: "Garoa moderada",
  55: "Garoa intensa",
  56: "Garoa congelante leve",
  57: "Garoa congelante forte",
  61: "Chuva fraca",
  63: "Chuva moderada",
  65: "Chuva intensa",
  66: "Chuva congelante leve",
  67: "Chuva congelante forte",
  71: "Neve fraca",
  73: "Neve moderada",
  75: "Neve intensa",
  77: "Cristais de gelo",
  80: "Pancadas de chuva fracas",
  81: "Pancadas de chuva moderadas",
  82: "Pancadas de chuva fortes",
  85: "Pancadas de neve fracas",
  86: "Pancadas de neve fortes",
  95: "Trovoadas",
  96: "Trovoadas com granizo leve",
  99: "Trovoadas com granizo"
};

const PRECIPITATION_WEATHER_CODES = new Set([
  51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99
]);

const getWeatherDescription = (code) => {
  const numericCode = typeof code === "number" ? code : Number(code);
  return WEATHER_CODE_DESCRIPTIONS[numericCode] || "Condicao desconhecida";
};

const getWeatherIconName = (temperature, weatherCode) => {
  const numericCode = typeof weatherCode === "number" ? weatherCode : Number(weatherCode);

  if (PRECIPITATION_WEATHER_CODES.has(numericCode)) {
    return "cloud-rain";
  }

  if (typeof temperature === "number" && temperature >= 28) {
    return "sun";
  }

  return "cloud";
};

export const DashboardScreen = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSyncingLocation, setIsSyncingLocation] = useState(false);
  const [locationLabel, setLocationLabel] = useState("Aguardando sincronizacao");
  const [weatherLabel, setWeatherLabel] = useState("-- C / --%");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasSyncedLocation, setHasSyncedLocation] = useState(false);
  const [weatherIconName, setWeatherIconName] = useState("cloud");

  const fullName = useMemo(
    () => [user?.firstName, user?.lastName].filter(Boolean).join(" "),
    [user?.firstName, user?.lastName]
  );
  const displayName = fullName || user?.username || "Usuario";
  const greetingSuffix = fullName ? ", " + fullName : "!";
  const email = user?.primaryEmailAddress?.emailAddress ?? "-";

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const handleAddIoTDevice = () => {
    console.log("Add IoT device button pressed");
  };
  const handleSyncLocation = useCallback(async () => {
    if (isSyncingLocation) {
      return;
    }

    try {
      setIsSyncingLocation(true);
      setErrorMessage("");
      setHasSyncedLocation(false);
      setLocationLabel("Solicitando permissao...");
      setWeatherLabel("Atualizando clima...");

      const permissionResponse = await Location.requestForegroundPermissionsAsync();
      const isGranted =
        permissionResponse?.status === "granted" || permissionResponse?.granted === true;

      if (!isGranted) {
        setLocationLabel("Permissao negada");
        setWeatherLabel("-- C / --%");
        setErrorMessage("Permissao de localizacao negada pelo usuario.");
        return;
      }

      setLocationLabel("Obtendo coordenadas...");
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced
      });

      const { latitude, longitude } = position.coords;
      let resolvedLocation = `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`;

      try {
        const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
        const parts = [
          place?.city || place?.subregion,
          place?.region || place?.country
        ].filter(Boolean);
        if (parts.length > 0) {
          resolvedLocation = parts.join(", ");
        }
      } catch (reverseError) {
        console.warn("Reverse geocode falhou:", reverseError);
      }

      setLocationLabel(resolvedLocation);

      const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        current: "temperature_2m,relative_humidity_2m,weather_code",
        timezone: "auto"
      });

      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
      if (!response.ok) {
        throw new Error("Falha ao obter clima");
      }

      const data = await response.json();
      const currentWeather = data?.current;

      if (currentWeather) {
        const temperatureValue =
          typeof currentWeather.temperature_2m === "number"
            ? Math.round(currentWeather.temperature_2m)
            : null;
        const humidityValue =
          typeof currentWeather.relative_humidity_2m === "number"
            ? Math.round(currentWeather.relative_humidity_2m)
            : null;
        const weatherDescription = getWeatherDescription(currentWeather.weather_code);

        const temperatureText = temperatureValue !== null ? `${temperatureValue} C` : "-- C";
        const humidityText = humidityValue !== null ? `${humidityValue}%` : "--%";

        setWeatherLabel(`${temperatureText} / ${humidityText} • ${weatherDescription}`);
        setWeatherIconName(
          getWeatherIconName(currentWeather.temperature_2m, currentWeather.weather_code)
        );
        setHasSyncedLocation(true);
      } else {
        setWeatherLabel("Dados de clima indisponiveis");
        setWeatherIconName("cloud");
      }
    } catch (syncError) {
      console.warn("Sincronizacao de localizacao falhou:", syncError);
      setLocationLabel("Erro ao sincronizar");
      setWeatherLabel("-- C / --%");
      setWeatherIconName("cloud");
      setErrorMessage("Nao foi possivel sincronizar localizacao e clima agora.");
    } finally {
      setIsSyncingLocation(false);
    }
  }, [isSyncingLocation]);

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
              <Text style={styles.primaryPanelTitle}>Temperatura Atual</Text>
              <View style={styles.primaryPanelBadge}>
                <Feather name="map-pin" size={14} style={styles.primaryPanelBadgeIcon} />
                <Text style={styles.primaryPanelBadgeText}>Localizacao inteligente</Text>
              </View>
            </View>

            <Text style={styles.primaryPanelSubtitle}>
              {isSyncingLocation
                ? "Sincronizando localizacao e clima..."
                : hasSyncedLocation
                  ? "Localizacao e clima atualizados com sucesso."
                  : "Sincronize a localizacao do lar para liberar previsoes de clima e rotinas conectadas."}
            </Text>

            <View style={styles.primaryPanelStatusRow}>
              <TouchableOpacity
                activeOpacity={0.85}
                style={[
                  styles.primaryPanelStatusItem,
                  isSyncingLocation ? styles.primaryPanelStatusItemDisabled : null
                ]}
                onPress={handleSyncLocation}
                disabled={isSyncingLocation}
              >
                <View style={styles.primaryPanelStatusIconWrapper}>
                  <Feather name="navigation" size={22} style={styles.primaryPanelStatusIcon} />
                </View>
                <View style={styles.primaryPanelStatusCopy}>
                  <Text style={styles.primaryPanelStatusLabel}>Localizacao</Text>
                  <Text style={styles.primaryPanelStatusValue}>
                    {isSyncingLocation ? "Sincronizando..." : locationLabel}
                  </Text>
                </View>
               </TouchableOpacity>

               
              <View style={styles.primaryPanelStatusItem}>
                <View style={styles.primaryPanelStatusIconWrapper}>
                  <Feather name={weatherIconName} size={22} style={styles.primaryPanelStatusIcon} />
                </View>
                <View style={styles.primaryPanelStatusCopy}>
                  <Text style={styles.primaryPanelStatusLabel}>Tempo</Text>
                  <Text style={styles.primaryPanelStatusValue}>{weatherLabel}</Text>
                </View>
              </View>
            </View>

            {Boolean(errorMessage) && (
              <Text style={styles.primaryPanelErrorText}>{errorMessage}</Text>
            )}
          </View>

          <View style={styles.primaryPanelCard}>
             <Text style={{ color: "#ffffffcc", fontSize: 14, fontWeight: "700", marginBottom:10 }}>
                Adicione dispositivos inteligentes
              </Text>
            <TouchableOpacity
              onPress={handleAddIoTDevice}
              activeOpacity={0.85}
              style={{
                width: "100%",
                paddingVertical: 16,
                paddingHorizontal: 20,
                borderRadius: 16,
                backgroundColor: "rgba(42, 146, 190, 0.86)",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Feather name="smartphone" size={20} color="#fff" style={{ marginRight: 10 }} />
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
                Adicionar dispositivo IoT
              </Text>
            </TouchableOpacity>
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



