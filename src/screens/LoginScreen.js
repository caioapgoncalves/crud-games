import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { AuthContext } from "../contexts/AuthContext";
import { isValidEmail } from "../utils/validators";
import { common } from "../styles/common";

export default function LoginScreen() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!isValidEmail(email.trim()) || !password) {
      setError("Informe um email válido e a senha.");
      return;
    }
    try {
      setLoading(true);
      await signIn(email.trim(), password);
    } catch {
      setError("Falha no login. Use as credenciais de teste do ReqRes.");
      Alert.alert("Falha no login", "Use as credenciais de teste do ReqRes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[common.container, { justifyContent: "center" }]}>
      <Text style={[common.title, { fontSize: 28 }]}>🎮 GameList</Text>
      <Text>Entre para gerenciar sua coleção de jogos.</Text>
      <TextInput placeholder="email" value={email} onChangeText={setEmail}
        autoCapitalize="none" keyboardType="email-address" style={common.input} />
      <TextInput placeholder="senha" value={password} onChangeText={setPassword}
        secureTextEntry style={common.input} />
      <Button title={loading ? "Entrando..." : "Entrar"} onPress={handleLogin} disabled={loading} />
      {!!error && <Text style={common.error}>{error}</Text>}
    </View>
  );
}
