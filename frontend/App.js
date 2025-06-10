import "react-native-gesture-handler";
import "react-native-reanimated";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthorizedStack from "./stacks/AuthorizedStack";
import UnauthorizedStack from "./stacks/UnauthorizedStack";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const renderNavigationStack = () => {
    if (authenticated) {
      return <AuthorizedStack />;
    } else {
      return <UnauthorizedStack setAuthenticated={setAuthenticated} />;
    }
  };

  return <NavigationContainer>{renderNavigationStack()}</NavigationContainer>;
}
