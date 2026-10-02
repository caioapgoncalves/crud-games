import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";
import { AuthContext } from "../contexts/AuthContext";
import { common } from "../styles/common";

export default function RootNavigator() {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={common.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
