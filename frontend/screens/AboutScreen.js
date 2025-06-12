import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

const githubURL = "https://github.com/Vansh-Coder";

const AboutScreen = () => {
  const handleContactLink = async () => {
    const supported = await Linking.canOpenURL(githubURL);
    if (supported) {
      await Linking.openURL(githubURL);
    } else {
      // Add toast here
      console.log("Error! Cant open the github url.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <View style={styles.container}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            HealthDetect AI is designed to help with quick and accurate image
            diagnosis !
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
          <Text style={styles.versionNumber}>1.0.0</Text>
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
