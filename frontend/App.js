import "react-native-gesture-handler";
import "react-native-reanimated";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import LoadingScreen from "./screens/LoadingScreen";
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
    // return LoadingScreen("Loading, please wait");
    return null;
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
