// MAKE FIXES

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
import { RFValue } from "react-native-responsive-fontsize";

const { width } = Dimensions.get("window");

const EnterEmailScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    setLoading(true);
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
              style={styles.sendOTPButton}
              onPress={handleSendOTP}
              disabled={loading || email.length === 0}
            >
              <Text style={styles.sendOTPButtonText}>
                {loading ? "Sending" : "Send OTP"}
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
  sendOTPButton: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "black",
    paddingVertical: 15,
    width: width * 0.6,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  sendOTPButtonText: {
    fontSize: RFValue(16),
    color: "white",
    fontWeight: "bold",
  },
});

export default EnterEmailScreen;
