import React, { useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import LogoutModal from "../components/LogoutModal";

const Drawer = createDrawerNavigator();

const OptionsDrawer = ({ setAuthenticated }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogoutOption = () => {
    setModalVisible(true);
  };

  const CustomDrawerContent = (props) => (
    <>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        <DrawerItem
          label="Logout"
          onPress={handleLogoutOption}
          icon={({ color, size }) => (
            <MaterialIcons name="logout" size={size} color={color} />
          )}
        />
      </DrawerContentScrollView>

      <LogoutModal
        setAuthenticated={setAuthenticated}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: "front",
      }}
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

export default OptionsDrawer;
