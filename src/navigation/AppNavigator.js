import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import GamesListScreen from "../screens/GamesListScreen";
import GameFormScreen from "../screens/GameFormScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Início" }} />
      <Stack.Screen name="GamesList" component={GamesListScreen} options={{ title: "Meus Jogos" }} />
      <Stack.Screen
        name="GameForm"
        component={GameFormScreen}
        // Mesmo formulário para cadastrar e editar: o título muda conforme o parâmetro
        options={({ route }) => ({ title: route.params?.game ? "Editar Jogo" : "Novo Jogo" })}
      />
    </Stack.Navigator>
  );
}
