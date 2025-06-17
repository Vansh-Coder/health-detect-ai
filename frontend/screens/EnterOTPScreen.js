import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OtpInput } from "react-native-otp-entry";
import { RFValue } from "react-native-responsive-fontsize";

const { width } = Dimensions.get("window");

const EnterOTPScreen = ({ navigation, route }) => {
  const { email } = route.params || "";

  const [OTP, setOTP] = useState("");
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

  const handleContinue = () => {
    navigation.navigate("ResetPassword");
  };

  const handleResend = () => {
    if (!timerRunning) {
      setTimer(60);
      setTimerRunning(true);
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
            <Text style={styles.titleText}>Enter your OTP</Text>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>
                An OTP has been sent to your email {email}
              </Text>
            </View>
            <View style={styles.OTPContainer}>
              <OtpInput
                numberOfDigits={4}
                type="numeric"
                onTextChange={(val) => setOTP(val)}
                theme={{
                  pinCodeContainerStyle: styles.pinCodeContainer,
                  pinCodeTextStyle: styles.pinCodeText,
                  focusedPinCodeContainerStyle: styles.focusedPinCodeContainer,
                  focusStickStyle: styles.focusStick,
                }}
              />
            </View>
          </View>
          <View style={styles.lowerContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    borderColor: OTP.length !== 4 ? "#D3D3D3" : "black",
                    backgroundColor: OTP.length !== 4 ? "#999999" : "black",
                  },
                ]}
                onPress={handleContinue}
                disabled={OTP.length !== 4}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: OTP.length !== 4 ? "#7D7D7D" : "white",
                    },
                  ]}
                >
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>
                {timerRunning
                  ? `Wait until ${timer} seconds to resend OTP!`
                  : "Click the below button to resend OTP!"}
              </Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
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
                    styles.buttonText,
                    {
                      color: timerRunning ? "#7D7D7D" : "white",
                    },
                  ]}
                >
                  Resend OTP
                </Text>
              </TouchableOpacity>
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
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  },
  titleText: {
    fontSize: RFValue(24),
    fontWeight: "bold",
  },
  middleContainer: {
    flex: 2,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 10,
  },
  descriptionContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.8,
  },
  descriptionText: {
    fontSize: RFValue(14),
    fontWeight: "500",
    textAlign: "center",
  },
  OTPContainer: {
    width: width * 0.65,
  },
  pinCodeContainer: {
    aspectRatio: 1,
    borderWidth: 2,
  },
  pinCodeText: {
    fontSize: RFValue(16),
  },
  focusedPinCodeContainer: {
    borderColor: "darkgrey",
  },
  focusStick: {
    backgroundColor: "darkgrey",
  },
  lowerContainer: {
    flex: 3,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 15,
    width: width * 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: RFValue(16),
    fontWeight: "bold",
  },
  timerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  timerText: {
    fontSize: RFValue(14),
    fontWeight: "500",
  },
});

export default EnterOTPScreen;
