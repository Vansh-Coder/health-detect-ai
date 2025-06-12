import { TouchableOpacity } from "react-native";
import { Octicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const DrawerHeaderOptions = (navigation) => ({
  headerLeft: () => (
    <TouchableOpacity
      style={{ marginLeft: 15 }}
      onPress={() => navigation.toggleDrawer()}
    >
      <Octicons name="three-bars" size={RFValue(18)} color="black" />
    </TouchableOpacity>
  ),
  headerTitle: "HealthDetect AI",
  headerTitleStyle: {
    fontSize: RFValue(15),
    fontWeight: "600",
  },
});

export default DrawerHeaderOptions;
