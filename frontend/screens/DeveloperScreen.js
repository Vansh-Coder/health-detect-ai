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
import Toast from "react-native-toast-message";

const githubProfile = "github.com/Vansh-Coder";

const DeveloperScreen = () => {
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

  const handleGithubLink = async () => {
    try {
      const githubURL = `https://${githubProfile}`;
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
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Developer</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.developerName}>Vansh Gupta</Text>
          <Text style={styles.descriptionText}>
            Full-stack AI/ML engineer and software developer passionate about
            building end-to-end software solutions.
          </Text>
        </View>
        <View style={styles.githubLinkOuterContainer}>
          <TouchableOpacity
            style={styles.githubLinkInnerContainer}
            onPress={handleGithubLink}
          >
            <Ionicons name="logo-github" size={RFValue(23)} color="black" />
            <Text style={styles.githubLink}>{githubProfile}</Text>
          </TouchableOpacity>
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
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "white",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  titleText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
  },
  descriptionContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  developerName: {
    fontSize: RFValue(18),
    fontWeight: "600",
    fontStyle: "italic",
    marginBottom: 15,
  },
  descriptionText: {
    fontSize: RFValue(15),
    fontWeight: "500",
    marginBottom: 5,
  },
  githubLinkOuterContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
  githubLinkInnerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  githubLink: {
    fontSize: RFValue(15),
    fontWeight: "500",
    textDecorationLine: "underline",
    color: "blue",
    marginLeft: 10,
  },
});

export default DeveloperScreen;
