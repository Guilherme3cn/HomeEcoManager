import { Platform, StyleSheet } from "react-native";

const TOP_SPACING = Platform.OS === "android" ? 48 : 24;

export const dashboardStyles = StyleSheet.create({
  background: {
    flex: 1
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#5fd1be4d"
  },
  container: {
    flex: 1,
    paddingTop: TOP_SPACING,
    paddingHorizontal: 24
  },
  menuButton: {
    position: "absolute",
    top: Platform.OS === "android" ? 42 : 18,
    right: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#208840eb",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#208840eb",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
    zIndex: 2
  },
  menuIcon: {
    color: "#ffffff"
  },
  content: {
    marginTop: Platform.OS === "android" ? 96 : 74,
    flex: 1
  },
  greetingWrapper: {
    marginBottom: 24
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a"
  },
  headerSubtitle: {
    marginTop: 6,
    fontSize: 16,
    color: "#334155"
  },
  greeting: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0f172a"
  },
  detail: {
    fontSize: 16,
    color: "#475569",
    marginTop: 8
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    marginTop: 32,
    gap: 8,
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#0f172a"
  },
  cardContent: {
    fontSize: 16,
    color: "#334155",
    lineHeight: 22
  }
});

export const dashboardModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(15, 23, 42, 0.25)"
  },
  panel: {
    width: "80%",
    maxWidth: 360,
    backgroundColor: "#0b275e",
    paddingTop: Platform.OS === "android" ? 60 : 48,
    paddingBottom: 36,
    paddingHorizontal: 28,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    elevation: 14,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 24,
    shadowOffset: { width: 6, height: 6 }
  },
  panelScroll: {
    flexGrow: 1,
    paddingBottom: 24
  },
  backdropTouchable: {
    flex: 1
  },
  profileWrapper: {
    alignItems: "flex-start",
    marginBottom: 24
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16
  },
  avatarInitials: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff"
  },
  profileGreeting: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff"
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 14,
    color: "#cbd5f5"
  },
  navList: {
    marginTop: 4,
    gap: 12
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16
  },
  navItemActive: {
    backgroundColor: "rgba(56, 189, 248, 0.22)"
  },
  navIcon: {
    color: "#38bdf8"
  },
  navIconActive: {
    color: "#ffffff"
  },
  navLabel: {
    fontSize: 16,
    color: "#e2e8f0",
    fontWeight: "500"
  },
  navLabelActive: {
    color: "#ffffff"
  },
  detailsWrapper: {
    marginTop: 24,
    gap: 16
  },
  detailsHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#bfdbfe"
  },
  detailsDescription: {
    color: "#dbeafe",
    fontSize: 14,
    lineHeight: 20
  },
  detailsCardList: {
    gap: 12
  },
  detailsCard: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 16,
    padding: 14
  },
  detailsCardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff"
  },
  detailsCardText: {
    marginTop: 6,
    fontSize: 13,
    color: "#dbeafe",
    lineHeight: 18
  },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(226, 232, 240, 0.2)"
  },
  exitButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },
  exitIcon: {
    color: "#f87171"
  },
  exitLabel: {
    fontSize: 16,
    color: "#f87171",
    fontWeight: "600"
  }
});
