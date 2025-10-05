import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ICONS = {
  google: {
    name: "google",
    color: "#ffffff"
  },
  facebook: {
    name: "facebook",
    color: "#ffffff"
  }
};

export const SocialSignInButton = ({ label, onPress, backgroundColor = "#1f2937", provider }) => {
  const icon = provider ? ICONS[provider] : undefined;

  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <View style={styles.content}>
        {icon ? <FontAwesome name={icon.name} size={20} color={icon.color} style={styles.icon} /> : null}
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    marginRight: 10
  },
  label: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600"
  }
});
