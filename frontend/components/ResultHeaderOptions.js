import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

const ResultHeaderOptions = (navigation) => ({
  headerLeft: () => (
    <TouchableOpacity
      style={{ marginLeft: 15 }}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="chevron-back-outline" size={RFValue(22)} color="black" />
    </TouchableOpacity>
  ),
  headerTitle: "HealthDetect AI",
  headerTitleStyle: {
    fontSize: RFValue(15),
    fontWeight: "600",
  },
});

export default ResultHeaderOptions;
