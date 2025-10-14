import { Platform, StyleSheet } from "react-native";

const TOP_SPACING = Platform.OS === "android" ? 48 : 24;

export const dashboardStyles = StyleSheet.create({
  background: {
    flex: 1
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(209, 235, 219, 0.6)"
  },
  container: {
    flex: 1,
    paddingTop: TOP_SPACING,
    paddingHorizontal: 24
  },
  menuButtonLeft: {
    position: "absolute",
    top: Platform.OS === "android" ? 42 : 18,
    left: 24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(65, 97, 79, 0.94)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#208840eb",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
    zIndex: 2
  },
  menuButtonRight: {
    position: "absolute",
    top: Platform.OS === "android" ? 42 : 18,
    right: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  menuIcon: {
    color: "#ffffff"
  },
  logoBadge: {
    width: 80,
    height: 80,
    resizeMode: "contain"
  },
  content: {
    marginTop: Platform.OS === "android" ? 96 : 74,
    flex: 1
  },
  primaryPanelCard: {
    backgroundColor: "rgba(81, 146, 127, 0.5)",
    borderRadius: 20,
    padding: 20,
    gap: 5,
    marginBottom: 20,
   
  },
  primaryPanelHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  primaryPanelTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#eff4f7ff"
  },
  primaryPanelBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(49, 170, 223, 0.58)",
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 999
  },
  primaryPanelBadgeIcon: {
    color: "#eff4f7b2"
  },
  primaryPanelBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#ffffffbe"
  },
  primaryPanelSubtitle: {
    fontSize: 14,
    color: "#eff4f7ec",
    lineHeight: 20,
  },
  primaryPanelStatusRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,

  },
  primaryPanelStatusItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "rgba(81, 146, 127, 0.3)",
    flexBasis: "50%"
  },
  primaryPanelStatusIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(49, 170, 223, 0.58)",
    alignItems: "center",
    justifyContent: "center",
    padding:10
  },
  primaryPanelStatusIcon: {
    color: "#eff4f7b2",
  },
  primaryPanelStatusLabel: {
    fontSize: 12,
    margin:10,
    textTransform: "uppercase",
    color: "#eff4f7b2",
  
  },
  primaryPanelStatusValue: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#eff4f7b2",
  },
  greeting: {
    fontSize: 26,
    fontWeight: "700",
    color: "#eff4f7b2",
  },
  detail: {
    fontSize: 16,
    color: "#475569",
    marginTop: 8
  },
  alertCard: {
    marginBottom: 24,
    borderRadius: 18,
    backgroundColor: "rgba(81, 146, 127, 0.5)",
    padding: 20,
    
  },
  alertCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  alertCardIcon: {
    color: "#f87171"
  },
  alertCardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f8fafc"
  },
  alertCardMessage: {
    fontSize: 14,
    color: "#e2e8f0",
    lineHeight: 20
  }
});

export const dashboardModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent"
  },
  panel: {
    width: "80%",
    maxWidth: 360,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    overflow: "hidden"
  },
  panelImageWrapper: {
    flex: 1
  },
  panelImage: {
    width: "100%",
    height: "100%"
  },
  panelInner: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 60 : 48,
    paddingBottom: 36,
    paddingHorizontal: 28,
    backgroundColor: "rgba(65, 97, 79, 0.94)"
  },
  panelScroll: {
    flexGrow: 1,
    paddingBottom: 24
  },
  backdropTouchable: {
    flex: 1,
    backgroundColor: "transparent"
  },
  profileWrapper: {
    alignItems: "flex-start",
    marginBottom: 24
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(114, 151, 130, 0.43)",
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
  detailsCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6
  },
  detailsCardAction: {
    padding: 6,
    borderRadius: 999,
    backgroundColor: "rgba(226, 232, 240, 0.12)"
  },
  detailsCardActionImage: {
    width: 50,
    height: 50,
    marginStart: 3
  },
  detailsCardTuyaButton: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "rgba(56, 189, 248, 0.22)",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16
  },
  detailsCardTuyaIcon: {
    width: 48,
    height: 48
  },
  detailsCardTuyaLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#e0f2fe"
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
