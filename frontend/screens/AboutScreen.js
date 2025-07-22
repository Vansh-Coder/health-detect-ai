import { useState } from "react";
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
import { MaterialIcons } from "@expo/vector-icons";
import DeleteAccountModal from "../components/DeleteAccountModal";

const contactEmail = "healthdetectai@gmail.com";
const legalPolicyURL = "https://app-pp-and-tos.vercel.app/legal";
const appVersion = Constants.expoConfig.version;

const AboutScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

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
      const contactLink = `mailto:${contactEmail}?subject=Support Request`;
      await Linking.openURL(contactLink);
    } catch (error) {
      showToast("Error opening email, try again later !");
      console.log("Error occured:", error);
    }
  };

  const handleDeleteAccount = () => {
    setModalVisible(true);
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

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <View style={styles.container}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>About</Text>
          <Text style={styles.descriptionText}>
            Health Detect AI is an educational tool that uses AI to identify
            possible skin conditions and common visible injuries in photos.
          </Text>
        </View>
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerTitle}>Medical Disclaimer</Text>
          <Text style={styles.disclaimerText}>
            Always consult a qualified medical professional for diagnosis and
            treatment.
          </Text>
        </View>
        <View style={styles.contactContainer}>
          <Text style={styles.contactTitle}>Contact</Text>
          <TouchableOpacity
            style={styles.contactLinkContainer}
            onPress={handleContactLink}
          >
            <MaterialIcons name="email" size={RFValue(22)} color="black" />
            <Text style={styles.contactLink}>{contactEmail}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.policyContainer}>
          <Text style={styles.policyTitle}>Privacy Policy & ToS</Text>
          <Text
            style={[styles.policyText, { marginBottom: 5 }]}
            onPress={handlePrivacyPolicy}
          >
            Privacy Policy
          </Text>
          <Text style={styles.policyText} onPress={handleTermsOfService}>
            Terms of Service
          </Text>
        </View>
        <View style={styles.deleteAccountContainer}>
          <Text style={styles.deleteAccountTitle}>Delete Account</Text>
          <TouchableOpacity
            style={styles.deleteAccountButton}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.deleteAccountText}>Delete my account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.versionContainer}>
          <Text style={styles.versionTitle}>App Version</Text>
          <Text style={styles.versionNumber}>{appVersion}</Text>
        </View>
      </View>

      <DeleteAccountModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
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
    padding: 25,
  },
  descriptionContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 20,
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
  disclaimerContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  disclaimerTitle: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
  },
  disclaimerText: {
    fontSize: RFValue(14),
    fontWeight: "500",
  },
  contactContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  contactTitle: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
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
  policyContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  policyTitle: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
  },
  policyText: {
    fontSize: RFValue(14),
    fontWeight: "500",
    textDecorationLine: "underline",
    color: "blue",
  },
  deleteAccountContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  deleteAccountTitle: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 10,
  },
  deleteAccountButton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  deleteAccountText: {
    fontSize: RFValue(14),
    color: "red",
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
