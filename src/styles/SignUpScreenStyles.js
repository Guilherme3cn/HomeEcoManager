import { StyleSheet } from "react-native";

const signUpStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecfdf3"
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: "center",
  },
 
  logo: {
    width: 230,
    height: 230,
    resizeMode: "contain"
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 10
  },
  title: {
    fontSize: 22,
    fontWeight: "400",
    color: "#047857",
    textAlign: "center"
  },
  subtitle: {
    fontSize: 14,
    color: "#15803d",
    textAlign: "center",
    fontWeight:300,
  },
  card: {
    width: "100%",
    backgroundColor: "#f2faf4ff",
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 22,
    shadowColor: "#0f172a",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6
  },
  form: {
    width: "100%",
    marginBottom: 15,
    elevation: 6
  },
  input: {
    backgroundColor: "#f2faf4ff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    elevation: 2,
    borderWidth: 1,
    borderColor:  "#86dfb1ff",
    fontWeight:200,
  },
  inputSpacing: {
    marginBottom: 12
  },
  primaryButton: {
    backgroundColor: "#16a34a",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#16a34a",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4
  },
  primaryButtonLabel: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600"
  },
  instruction: {
    fontSize: 15,
    color: "#4b5563",
    
    textAlign: "center"
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  dividerLabel: {
    marginHorizontal: 12,
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "300"
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#e2e8f0"
  },
  socialButtons: {
    width: "100%",
    flexDirection: "row",
    columnGap: 12,
    gap: 12
  },
  switchAuth: {
    marginTop: 30,
    alignItems: "center"
  },
  switchAuthText: {
    color: "#047857",
    fontSize: 15,
    fontWeight: "600"
  }
});

export default signUpStyles;
