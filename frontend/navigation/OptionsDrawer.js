import { useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import DrawerHeaderOptions from "../components/DrawerHeaderOptions";
import HomeStack from "./HomeStack";
import DeveloperScreen from "../screens/DeveloperScreen";
import AboutScreen from "../screens/AboutScreen";
import CitationsScreen from "../screens/CitationsScreen";
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
          labelStyle={{
            fontSize: RFValue(13),
          }}
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
      screenOptions={({ navigation }) => ({
        drawerType: "front",
        drawerLabelStyle: {
          fontSize: RFValue(13),
        },
        ...DrawerHeaderOptions(navigation),
      })}
    >
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          // don't show drawer header for entire nested stack
          headerShown: false,
          drawerLabel: "Home",
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size + 2} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Developer"
        component={DeveloperScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="logo-github" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="info-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Citations"
        component={CitationsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="book-open" size={size} color={color} />
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
