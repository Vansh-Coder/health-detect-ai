import "react-native-gesture-handler";
import "react-native-reanimated";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import OptionsDrawer from "./navigation/OptionsDrawer";
import UnauthorizedStack from "./navigation/UnauthorizedStack";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const renderNavigationStack = () => {
    if (authenticated) {
      return <OptionsDrawer setAuthenticated={setAuthenticated} />;
    } else {
      return <UnauthorizedStack setAuthenticated={setAuthenticated} />;
    }
  };

  return <NavigationContainer>{renderNavigationStack()}</NavigationContainer>;
}
