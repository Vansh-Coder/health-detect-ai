import { View, Text, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { RFValue } from "react-native-responsive-fontsize";
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

      <DrawerItem label="Logout" onPress={handleLogout} />
    </DrawerContentScrollView>
  );

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Feedback" component={FeedbackScreen} />
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
