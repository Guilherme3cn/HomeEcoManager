import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const SocialSignInButton = ({ label, onPress, backgroundColor = "#1f2937" }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12
  },
  label: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600"
  }
});
