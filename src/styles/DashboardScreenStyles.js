import { StyleSheet } from "react-native";

const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    backgroundColor: "#f9fafb"
  },
  greeting: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827"
  },
  detail: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 8
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    marginTop: 32,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    color: "#1f2937"
  },
  cardContent: {
    fontSize: 16,
    color: "#4b5563"
  },
  signOutButton: {
    marginTop: 40,
    backgroundColor: "#ef4444",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center"
  },
  signOutLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600"
  }
});

export default dashboardStyles;
