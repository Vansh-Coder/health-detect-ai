import { View, Text, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import FeedbackScreen from "../screens/FeedbackScreen";

const Drawer = createDrawerNavigator();

const OptionsDrawer = ({ setAuthenticated }) => {
  const handleLogout = () => {
    setAuthenticated(false);
  };

  const CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <DrawerItem
        label="Logout"
        onPress={handleLogout}
        icon={({ color, size }) => (
          <MaterialIcons name="logout" size={size} color={color} />
        )}
      />
    </DrawerContentScrollView>
  );

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size + 2} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="feedback" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    fontSize: RFValue(12),
  },
});

export default OptionsDrawer;
