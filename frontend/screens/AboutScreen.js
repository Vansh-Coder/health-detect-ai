import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Constants from "expo-constants";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

const githubURL = "https://github.com/Vansh-Coder";
const appVersion = Constants.expoConfig.version;

const AboutScreen = () => {
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

  const handleContactLink = async () => {
    try {
      const supported = await Linking.canOpenURL(githubURL);

      if (supported) {
        await Linking.openURL(githubURL);
      } else {
        showToast("Error opening Github, try again later !");
      }
    } catch (error) {
      showToast("Error opening Github, try again later !");
      console.log("Error occured:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <View style={styles.container}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>About</Text>
          <Text style={styles.descriptionText}>
            HealthDetect AI is designed to help with quick and accurate image
            diagnosis for skin diseases and common visible injuries !
          </Text>
        </View>
        <View style={styles.developerContainer}>
          <Text style={styles.developerTitle}>Developer</Text>
          <Text style={styles.developerDescription}>
            <Text style={styles.developerName}>Vansh Gupta</Text> - An indie
            developer passionate about creating impactful tools.
          </Text>
        </View>
        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Contact</Text>
          <View style={styles.contactDescription}>
            <TouchableOpacity
              style={styles.contactLinkContainer}
              onPress={handleContactLink}
            >
              <Ionicons name="logo-github" size={RFValue(22)} color="black" />
              <Text style={styles.contactLink}>github.com/Vansh-Coder</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.versionContainer}>
          <Text style={styles.versionTitle}>App Version</Text>
          <Text style={styles.versionNumber}>{appVersion}</Text>
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
    paddingHorizontal: 30,
    paddingVertical: 30,
  },
  descriptionContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 25,
  },
  descriptionTitle: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: RFValue(14),
    fontWeight: "500",
  },
  developerContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 25,
  },
  developerTitle: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
  },
  developerDescription: {
    fontSize: RFValue(14),
    fontWeight: "500",
  },
  developerName: {
    fontSize: RFValue(14),
    fontWeight: "bold",
  },
  contactContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 25,
  },
  contactTitle: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
  },
  contactDescription: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  contactLinkContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  contactLink: {
    fontSize: RFValue(14),
    fontWeight: "500",
    textDecorationLine: "underline",
    color: "blue",
    marginLeft: 10,
  },
  versionContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  versionTitle: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
  },
  versionNumber: {
    fontSize: RFValue(15),
    fontWeight: "500",
    letterSpacing: 1,
  },
});

export default AboutScreen;
