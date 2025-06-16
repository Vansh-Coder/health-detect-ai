import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const ForgotPassHeaderOptions = (navigation) => ({
  headerTitle: "",
  headerShadowVisible: false,
  headerLeft: () => (
    <TouchableOpacity
      style={{ marginLeft: 15 }}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="chevron-back-outline" size={RFValue(22)} color="black" />
    </TouchableOpacity>
  ),
});

export default ForgotPassHeaderOptions;
