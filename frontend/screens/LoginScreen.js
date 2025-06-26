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
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import Toast from "react-native-toast-message";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation, setAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleForgotPassword = () => {
    navigation.navigate("EnterEmail");
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      showToast(`Welcome back, ${user.displayName} !`);
      setAuthenticated(true);
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        showToast("Invalid credentials, please try again !");
      } else {
        showToast("An error occurred, try again later !");
        console.log("Error occured:", error);
      }
    } finally {
      setLoading(false);
    }
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
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity
                style={styles.forgotPasswordButton}
                onPress={handleForgotPassword}
                disabled={loading}
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
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? "Logging in" : "Login"}
              </Text>
              {loading && (
                <ActivityIndicator
                  size="small"
                  color="white"
                  style={{ marginLeft: 10 }}
                />
              )}
            </TouchableOpacity>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account ? </Text>
              <Text
                style={styles.footerLoginText}
                onPress={handleSignup}
                disabled={loading}
              >
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
  loginButton: {
    flexDirection: "row",
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
  loginButtonText: {
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
