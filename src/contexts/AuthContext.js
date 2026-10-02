import React, { createContext, useEffect, useState, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginReqRes } from "../services/authApi";

export const AuthContext = createContext({
  token: null,
  userEmail: null,
  loading: true,
  signIn: async (_email, _password) => {},
  signOut: async () => {},
});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ao abrir o app, recupera o login salvo no dispositivo
  useEffect(() => {
    (async () => {
      const [savedToken, savedEmail] = await Promise.all([
        AsyncStorage.getItem("@token"),
        AsyncStorage.getItem("@email"),
      ]);
      if (savedToken) {
        setToken(savedToken);
        setUserEmail(savedEmail);
      }
      setLoading(false);
    })();
  }, []);

  const signIn = async (email, password) => {
    const tk = await loginReqRes({ email, password });
    setToken(tk);
    setUserEmail(email);
    await AsyncStorage.setItem("@token", tk);
    await AsyncStorage.setItem("@email", email);
  };

  const signOut = async () => {
    setToken(null);
    setUserEmail(null);
    await AsyncStorage.multiRemove(["@token", "@email"]);
  };

  const value = useMemo(
    () => ({ token, userEmail, loading, signIn, signOut }),
    [token, userEmail, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
