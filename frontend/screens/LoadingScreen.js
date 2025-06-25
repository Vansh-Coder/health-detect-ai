import { View, Text, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import LottieView from "lottie-react-native";

const { width } = Dimensions.get("window");

const LoadingScreen = (text) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <View style={styles.container}>
        <LottieView
          source={require("../assets/resultsLoader.json")}
          autoPlay
          loop
          style={styles.loader}
        />
        <Text style={styles.text}>{text}</Text>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  loader: {
    width: width * 0.7,
    height: width * 0.7,
    marginTop: -40,
    marginBottom: 40,
  },
  text: {
    fontSize: RFValue(16),
    fontWeight: "600",
    color: "black",
    textAlign: "center",
  },
});

export default LoadingScreen;
