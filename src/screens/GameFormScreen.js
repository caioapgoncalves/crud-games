import React, { useState } from "react";
import { ScrollView, Text, TextInput, Button, Alert } from "react-native";
import { createGame, updateGame } from "../services/gamesApi";
import { validateGame } from "../utils/validators";
import { common, colors } from "../styles/common";

export default function GameFormScreen({ navigation, route }) {
  // Se veio um jogo pelos parâmetros, a tela está em modo de edição
  const editing = route.params?.game;

  const [title, setTitle] = useState(editing?.title ?? "");
  const [platform, setPlatform] = useState(editing?.platform ?? "");
  const [genre, setGenre] = useState(editing?.genre ?? "");
  const [rating, setRating] = useState(editing ? String(editing.rating ?? "") : "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");
    const validationError = validateGame({ title, platform, rating });
    if (validationError) {
      setError(validationError);
      return;
    }

    const game = {
      title: title.trim(),
      platform: platform.trim(),
      genre: genre.trim(),
      rating: Number(rating.replace(",", ".")),
    };

    try {
      setSaving(true);
      if (editing) {
        await updateGame(editing.id, game);
      } else {
        await createGame(game);
      }
      // Volta para a lista (ou abre ela, se viemos da Home) levando a mensagem
      navigation.popTo("GamesList", {
        message: editing ? "Jogo atualizado com sucesso!" : "Jogo cadastrado com sucesso!",
      });
    } catch {
      setError("Não foi possível salvar o jogo.");
      Alert.alert("Erro", "Não foi possível salvar o jogo.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={common.form} keyboardShouldPersistTaps="handled">
      <Text style={common.title}>{editing ? "Editar jogo" : "Novo jogo"}</Text>
      <TextInput placeholder="Título *" value={title} onChangeText={setTitle} style={common.input} />
      <TextInput placeholder="Plataforma * (PC, PS5, Switch...)" value={platform}
        onChangeText={setPlatform} style={common.input} />
      <TextInput placeholder="Gênero (RPG, Ação...)" value={genre} onChangeText={setGenre}
        style={common.input} />
      <TextInput placeholder="Nota de 0 a 10 *" value={rating} onChangeText={setRating}
        keyboardType="decimal-pad" style={common.input} />
      <Button title={saving ? "Salvando..." : "Salvar"} color={colors.primary}
        onPress={handleSave} disabled={saving} />
      {!!error && <Text style={common.error}>{error}</Text>}
    </ScrollView>
  );
}
