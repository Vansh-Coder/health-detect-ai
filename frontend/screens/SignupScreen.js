import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";

const { width } = Dimensions.get("window");

const SignupScreen = ({ navigation, setAuthenticated }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    // Backend code to perform signup
    setAuthenticated(true);
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Sign Up</Text>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.fieldContainer}>
              <TextInput
                style={styles.field}
                placeholder="First name"
                onChangeText={(val) => setFirstName(val)}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.fieldContainer}>
              <TextInput
                style={styles.field}
                placeholder="Last name"
                onChangeText={(val) => setLastName(val)}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.fieldContainer}>
              <TextInput
                style={styles.field}
                placeholder="Email address"
                onChangeText={(val) => setEmail(val)}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.fieldContainer}>
              <TextInput
                style={styles.field}
                placeholder="Password"
                secureTextEntry
                onChangeText={(val) => setPassword(val)}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.fieldContainer}>
              <TextInput
                style={styles.field}
                placeholder="Confirm password"
                secureTextEntry
                onChangeText={(val) => setConfirmPassword(val)}
                autoCapitalize="none"
              />
            </View>
          </View>
          <View style={styles.lowerContainer}>
            <Text style={styles.disclaimerText}>
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </Text>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}
            >
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account ? </Text>
              <Text style={styles.footerLoginText} onPress={handleLogin}>
                Login
              </Text>
            </View>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: RFValue(30),
    fontWeight: "bold",
  },
  middleContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  fieldContainer: {
    borderWidth: 2,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "white",
    marginBottom: 20,
  },
  field: {
    width: width * 0.75,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: RFValue(17),
  },
  lowerContainer: {
    flex: 2,
    alignItems: "center",
  },
  disclaimerText: {
    fontSize: RFValue(10),
    fontWeight: "500",
    width: width * 0.8,
    textAlign: "center",
    marginBottom: 20,
  },
  signupButton: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "black",
    paddingVertical: 15,
    width: width * 0.6,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  signupButtonText: {
    fontSize: RFValue(14),
    color: "white",
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: RFValue(12),
  },
  footerLoginText: {
    fontSize: RFValue(12),
    fontWeight: "600",
  },
});

export default SignupScreen;
