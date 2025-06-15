import "react-native-gesture-handler";
import "react-native-reanimated";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import OptionsDrawer from "./navigation/OptionsDrawer";
import UnauthorizedStack from "./navigation/UnauthorizedStack";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

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
