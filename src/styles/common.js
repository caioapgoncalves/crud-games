import { StyleSheet } from "react-native";

export const colors = {
  primary: "#5b3cc4",
  danger: "#b00020",
  success: "#087f23",
  border: "#ccc",
};

export const common = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  form: { padding: 16, gap: 12 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12 },
  error: { color: colors.danger },
  success: { color: colors.success },
});
