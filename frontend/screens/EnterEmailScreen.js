import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { RFValue } from "react-native-responsive-fontsize";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

const { width } = Dimensions.get("window");

const EnterEmailScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const showToast = (text) => {
    Toast.show({
      type: "info",
      text1: text,
      position: "top",
      topOffset: 60,
      text1Style: {
        fontSize: RFValue(13),
        fontWeight: "600",
      },
    });
  };

  const handleSendEmail = async () => {
    setLoading(true);
    await sendPasswordResetEmail(auth, email);
    showToast("Email with password reset link sent !");
    setLoading(false);
    navigation.navigate("ResetPassword", { email: email });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <View style={styles.upperContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Enter your email</Text>
            </View>
            <View style={styles.fieldContainer}>
              <TextInput
                style={styles.field}
                placeholder="Email address"
                value={email}
                onChangeText={(val) => setEmail(val.trim())}
                editable={!loading}
                autoCapitalize="none"
              />
            </View>
          </View>
          <View style={styles.lowerContainter}>
            <TouchableOpacity
              style={[
                styles.sendEmailButton,
                {
                  borderColor: email.length === 0 ? "#D3D3D3" : "black",
                  backgroundColor: email.length === 0 ? "#999999" : "black",
                },
              ]}
              onPress={handleSendEmail}
              disabled={loading || email.length === 0}
            >
              <Text
                style={[
                  styles.sendEmailButtonText,
                  {
                    color: email.length === 0 ? "#7D7D7D" : "white",
                  },
                ]}
              >
                {loading ? "Sending" : "Send Email"}
              </Text>
              {loading && (
                <ActivityIndicator
                  size="small"
                  color="white"
                  style={{ marginLeft: 10 }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  upperContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginVertical: 20,
    width: width * 0.75,
  },
  titleText: {
    fontSize: RFValue(24),
    fontWeight: "bold",
  },
  fieldContainer: {
    borderWidth: 2,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "white",
  },
  field: {
    width: width * 0.75,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: RFValue(17),
  },
  lowerContainter: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  sendEmailButton: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 15,
    width: width * 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  sendEmailButtonText: {
    fontSize: RFValue(16),
    fontWeight: "bold",
  },
});

export default EnterEmailScreen;
