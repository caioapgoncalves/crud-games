import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { colors } from "../styles/common";

export default function GameItem({ game, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.title}>{game.title}</Text>
        <Text>{game.platform}{game.genre ? ` • ${game.genre}` : ""}</Text>
        <Text style={styles.rating}>⭐ {game.rating}/10</Text>
      </View>
      <View style={styles.actions}>
        <Button title="Editar" color={colors.primary} onPress={() => onEdit(game)} />
        <Button title="Excluir" color="tomato" onPress={() => onDelete(game.id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, marginBottom: 8,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
  },
  info: { flex: 1, paddingRight: 8 },
  title: { fontWeight: "600", fontSize: 16 },
  rating: { marginTop: 4 },
  actions: { gap: 6 },
});
