import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const BlankHeaderOptions = ({ navigation, useCustomBack = false }) => ({
  headerTitle: "",
  headerShadowVisible: false,
  headerLeft: () => (
    <TouchableOpacity
      style={{ marginLeft: 15 }}
      onPress={() => {
        if (useCustomBack) {
          navigation.replace("Login");
        } else {
          navigation.goBack();
        }
      }}
    >
      <Ionicons name="chevron-back-outline" size={RFValue(22)} color="black" />
    </TouchableOpacity>
  ),
});

export default BlankHeaderOptions;
