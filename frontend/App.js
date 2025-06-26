import "react-native-gesture-handler";
import "react-native-reanimated";
import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import OptionsDrawer from "./navigation/OptionsDrawer";
import UnauthorizedStack from "./navigation/UnauthorizedStack";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
    return unsubscribe;
  }, []);

  if (authenticated === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color="#999999" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {authenticated ? (
        <OptionsDrawer setAuthenticated={setAuthenticated} />
      ) : (
        <UnauthorizedStack setAuthenticated={setAuthenticated} />
      )}
      <Toast />
    </NavigationContainer>
  );
}
