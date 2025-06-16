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

const LoginScreen = ({ navigation, setAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const handleLogin = () => {
    // Backend code to perform login
    setAuthenticated(true);
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
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
            <Text style={styles.titleText}>Login</Text>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.emailFieldContainer}>
              <TextInput
                style={styles.field}
                placeholder="Email address"
                onChangeText={(val) => setEmail(val)}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.passwordFieldContainer}>
              <TextInput
                style={styles.field}
                placeholder="Password"
                secureTextEntry
                onChangeText={(val) => setPassword(val)}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={handleForgotPassword}
              >
                <Text style={styles.forgotPasswordText}>Forgot password ?</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.lowerContainer}>
            <Text style={styles.disclaimerText}>
              By continuing, you agree to our Terms of Service and Privacy
              Policy.
            </Text>
            <TouchableOpacity style={styles.signupButton} onPress={handleLogin}>
              <Text style={styles.signupButtonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account ? </Text>
              <Text style={styles.footerLoginText} onPress={handleSignup}>
                Signup
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
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  emailFieldContainer: {
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
  passwordFieldContainer: {
    borderWidth: 2,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "white",
    marginBottom: 10,
  },
  forgotPasswordContainer: {
    width: width * 0.75,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  forgotPasswordButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordText: {
    fontSize: RFValue(13),
    fontWeight: "600",
  },
  lowerContainer: {
    flex: 3,
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

export default LoginScreen;
