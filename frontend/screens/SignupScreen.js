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
  Linking,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import Toast from "react-native-toast-message";
import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";

const legalPolicyURL = "https://app-pp-and-tos.vercel.app/legal";
const { width } = Dimensions.get("window");

const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

  const handlePrivacyPolicy = async () => {
    try {
      const policyLink = `${legalPolicyURL}/privacy-policy`;
      const supported = await Linking.canOpenURL(policyLink);

      if (supported) {
        await Linking.openURL(policyLink);
      } else {
        showToast("Error opening Privacy Policy, try again later !");
      }
    } catch (error) {
      showToast("Error opening Privacy Policy, try again later !");
      console.log("Error occured:", error);
    }
  };

  const handleTermsOfService = async () => {
    try {
      const policyLink = `${legalPolicyURL}/terms-of-service`;
      const supported = await Linking.canOpenURL(policyLink);

      if (supported) {
        await Linking.openURL(policyLink);
      } else {
        showToast("Error opening ToS, try again later !");
      }
    } catch (error) {
      showToast("Error opening ToS, try again later !");
      console.log("Error occured:", error);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      if (firstName.length === 0) {
        showToast("Please enter valid first name !");
      } else if (lastName.length === 0) {
        showToast("Please enter valid last name !");
      } else if (email.length === 0) {
        showToast("Please enter valid email address !");
      } else if (password !== confirmPassword) {
        showToast("Passwords do not match !");
      } else if (password.length < 8) {
        showToast("Minimum 8 characters for password !");
      } else if (/\s/.test(password)) {
        showToast("Password shouldn't have any spaces !");
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;
        await updateProfile(user, {
          displayName: firstName,
        });

        await sendEmailVerification(user);
        showToast("Email verification link sent !");
        navigation.navigate("VerifyEmail", { firstName, lastName, email });
      }
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        showToast("Please enter valid email address !");
      } else if (error.code === "auth/email-already-in-use") {
        showToast("Email already in use, choose another !");
      } else {
        showToast("An error occurred, try again later !");
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
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
                value={firstName}
                maxLength={15}
                onChangeText={(val) => setFirstName(val.trim())}
              />
            </View>
            <View style={styles.fieldContainer}>
              <TextInput
                style={styles.field}
                placeholder="Last name"
                value={lastName}
                maxLength={15}
                onChangeText={(val) => setLastName(val.trim())}
              />
            </View>
            <View style={styles.fieldContainer}>
              <TextInput
                style={styles.field}
                placeholder="Email address"
                value={email}
                onChangeText={(val) => setEmail(val.trim())}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.fieldContainer}>
              <TextInput
                style={styles.field}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(val) => setPassword(val.trim())}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.fieldContainer}>
              <TextInput
                style={styles.field}
                placeholder="Confirm password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={(val) => setConfirmPassword(val.trim())}
                autoCapitalize="none"
              />
            </View>
          </View>
          <View style={styles.lowerContainer}>
            <Text style={styles.disclaimerText}>
              By continuing, you agree to our{" "}
              <Text
                style={styles.disclaimerTextBold}
                onPress={handlePrivacyPolicy}
              >
                Privacy Policy
              </Text>{" "}
              and{" "}
              <Text
                style={styles.disclaimerTextBold}
                onPress={handleTermsOfService}
              >
                Terms of Service
              </Text>
              .
            </Text>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignup}
              disabled={loading}
            >
              <Text style={styles.signupButtonText}>
                {loading ? "Signing Up" : "Sign Up"}
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
              <Text style={styles.footerText}>Already have an account ? </Text>
              <Text
                style={styles.footerLoginText}
                onPress={handleLogin}
                disabled={loading}
              >
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
    color: "black",
  },
  disclaimerTextBold: {
    fontSize: RFValue(10),
    fontWeight: "bold",
    color: "black",
  },
  signupButton: {
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
