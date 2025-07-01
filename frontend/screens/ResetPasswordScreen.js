import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { RFValue } from "react-native-responsive-fontsize";
import { auth } from "../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

const { width } = Dimensions.get("window");

const ResetPasswordScreen = ({ navigation, route }) => {
  const { email } = route.params || "";
  const [timer, setTimer] = useState(60);
  const [timerRunning, setTimerRunning] = useState(true);

  useEffect(() => {
    let interval = null;

    if (timerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setTimerRunning(false);
    }

    return () => clearInterval(interval);
  }, [timer, timerRunning]);

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

  const handleLogin = () => {
    navigation.replace("Login");
  };

  const handleResend = async () => {
    try {
      if (!timerRunning) {
        await sendPasswordResetEmail(auth, email);
        showToast("Email with password reset link sent !");
        setTimer(60);
        setTimerRunning(true);
      }
    } catch (error) {
      showToast("An error occurred, try again later !");
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Reset password</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Check your inbox for an email with password reset link !
          </Text>
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.loginButtonContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Go to Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              {timerRunning
                ? `Wait until ${timer} seconds to resend email with password reset link !`
                : "Click the button below to resend email with password reset link !"}
            </Text>
          </View>
          <View style={styles.resendButtonContainer}>
            <TouchableOpacity
              style={[
                styles.resendButton,
                {
                  borderColor: timerRunning ? "#D3D3D3" : "black",
                  backgroundColor: timerRunning ? "#999999" : "black",
                },
              ]}
              onPress={handleResend}
              disabled={timerRunning}
            >
              <Text
                style={[
                  styles.resendButtonText,
                  {
                    color: timerRunning ? "#7D7D7D" : "white",
                  },
                ]}
              >
                Resend Email
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    color: "black",
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.8,
  },
  descriptionText: {
    fontSize: RFValue(14),
    fontWeight: "500",
    color: "black",
    textAlign: "center",
  },
  lowerContainer: {
    flex: 4,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  loginButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  loginButton: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "black",
    backgroundColor: "black",
    paddingVertical: 15,
    width: width * 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: {
    fontSize: RFValue(16),
    fontWeight: "bold",
    color: "white",
  },
  timerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.8,
    marginBottom: 20,
  },
  timerText: {
    fontSize: RFValue(14),
    fontWeight: "500",
    color: "black",
    textAlign: "center",
  },
  resendButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  resendButton: {
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 15,
    width: width * 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  resendButtonText: {
    fontSize: RFValue(16),
    fontWeight: "bold",
  },
});

export default ResetPasswordScreen;
