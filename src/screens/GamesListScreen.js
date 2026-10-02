import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View, Text, TextInput, FlatList, RefreshControl, Modal, Pressable,
  ActivityIndicator, Button, StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { listGames, deleteGame } from "../services/gamesApi";
import GameItem from "../components/GameItem";
import { common, colors } from "../styles/common";

export default function GamesListScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [gameToDelete, setGameToDelete] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setError("");
    try {
      const list = await listGames();
      setData(list);
    } catch {
      setError("Não foi possível carregar os jogos.");
    } finally {
      setLoading(false);
    }
  }

  async function refresh() {
    setRefreshing(true);
    await load();
    setRefreshing(false);
  }

  // Recarrega sempre que a tela ganha foco (ex.: ao voltar do formulário)
  useFocusEffect(useCallback(() => { load(); }, []));

  // Mostra a mensagem enviada pelo formulário e limpa o parâmetro
  useEffect(() => {
    if (route.params?.message) {
      setMessage(route.params.message);
      navigation.setParams({ message: undefined });
    }
  }, [route.params?.message]);

  // Busca por título (filtra só na tela, sem nova requisição)
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return data;
    return data.filter((g) => (g.title || "").toLowerCase().includes(term));
  }, [data, search]);

  const handleEdit = (game) => {
    setMessage("");
    navigation.navigate("GameForm", { game });
  };

  const handleDelete = (id) => {
    setMessage("");
    const game = data.find((item) => item.id === id);
    setGameToDelete(game || { id });
  };

  const removeGame = async (id) => {
    try {
      await deleteGame(id);
      setData((prev) => prev.filter((g) => g.id !== id));
      setMessage("Jogo excluído com sucesso.");
    } catch {
      setError("Falha ao excluir o jogo.");
    } finally {
      setGameToDelete(null);
    }
  };

  if (loading) {
    return (
      <View style={common.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={common.container}>
      <TextInput placeholder="🔍 Buscar por título" value={search} onChangeText={setSearch}
        style={common.input} />
      <Button title="+ Cadastrar jogo" color={colors.primary}
        onPress={() => navigation.navigate("GameForm")} />

      {!!message && <Text style={common.success}>{message}</Text>}
      {!!error && <Text style={common.error}>{error}</Text>}
      <Text style={styles.count}>{filtered.length} jogo(s)</Text>

      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <GameItem game={item} onEdit={handleEdit} onDelete={handleDelete} />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
        ListEmptyComponent={
          <Text>{search ? "Nenhum jogo encontrado." : "Nenhum jogo cadastrado."}</Text>
        }
      />

      <Modal
        visible={!!gameToDelete}
        transparent
        animationType="fade"
        onRequestClose={() => setGameToDelete(null)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Confirmar exclusão</Text>
            <Text style={{ marginBottom: 20 }}>
              Deseja excluir {gameToDelete?.title || "este jogo"}?
            </Text>
            <View style={styles.modalActions}>
              <Pressable onPress={() => setGameToDelete(null)}>
                <Text style={{ padding: 10 }}>Cancelar</Text>
              </Pressable>
              <Pressable onPress={() => removeGame(gameToDelete.id)}>
                <Text style={styles.deleteText}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  count: { color: "#666" },
  overlay: {
    flex: 1, justifyContent: "center", alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  modal: { width: "85%", padding: 20, borderRadius: 8, backgroundColor: "white" },
  modalTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  modalActions: { flexDirection: "row", justifyContent: "flex-end", gap: 12 },
  deleteText: { padding: 10, color: colors.danger, fontWeight: "600" },
});
