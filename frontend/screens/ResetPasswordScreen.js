import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { RFValue } from "react-native-responsive-fontsize";

const { width } = Dimensions.get("window");

const ResetPasswordScreen = ({ setAuthenticated }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handleConfirm = () => {
    if (password !== confirmPassword) {
      showToast("Passwords do not match !");
    } else if (password.length < 8) {
      showToast("Minimum 8 characters required!");
    } else if (/\s/.test(password)) {
      showToast("No spaces allowed !");
    } else {
      showToast("Password reset successfully !");
      setAuthenticated(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Reset password</Text>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.fieldContainer}>
              <TextInput
                style={styles.field}
                value={password}
                placeholder="New password"
                onChangeText={(val) => setPassword(val.trim())}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.fieldContainer}>
              <TextInput
                style={styles.field}
                value={confirmPassword}
                placeholder="Confirm new password"
                onChangeText={(val) => setConfirmPassword(val.trim())}
                autoCapitalize="none"
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
              <Text style={styles.buttonText}>Confirm</Text>
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
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: RFValue(24),
    fontWeight: "bold",
  },
  middleContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  fieldContainer: {
    borderWidth: 2,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "white",
    marginVertical: 10,
  },
  field: {
    width: width * 0.75,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: RFValue(17),
  },
  buttonContainer: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  button: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "black",
    backgroundColor: "black",
    paddingVertical: 15,
    width: width * 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    color: "white",
  },
});

export default ResetPasswordScreen;
