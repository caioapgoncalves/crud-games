import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { common, colors } from "../styles/common";

export default function HomeScreen({ navigation }) {
  const { userEmail, signOut } = useContext(AuthContext);

  return (
    <View style={[common.container, { justifyContent: "center" }]}>
      <Text style={common.title}>Bem-vindo 👋</Text>
      {!!userEmail && <Text>Logado como {userEmail}</Text>}
      <Button title="Meus jogos" color={colors.primary}
        onPress={() => navigation.navigate("GamesList")} />
      <Button title="Cadastrar jogo" color={colors.primary}
        onPress={() => navigation.navigate("GameForm")} />
      <View style={{ height: 16 }} />
      <Button title="Sair" color="tomato" onPress={signOut} />
    </View>
  );
}
