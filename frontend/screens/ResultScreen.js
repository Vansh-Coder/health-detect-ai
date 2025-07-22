import { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ViewShot, { captureRef } from "react-native-view-shot";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import Toast from "react-native-toast-message";
import { RFValue } from "react-native-responsive-fontsize";
import ResultBar from "../components/ResultBar";
import { auth } from "../firebaseConfig";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

const { width } = Dimensions.get("window");

const ResultScreen = ({ navigation, route }) => {
  const { result } = route.params || "";
  const viewRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const user = auth.currentUser;

  const showToast = () => {
    Toast.show({
      type: "error",
      text1: "Error downloading, try again later !",
      position: "top",
      topOffset: 60,
      text1Style: {
        fontSize: RFValue(13),
        fontWeight: "600",
      },
    });
  };

  const handleDiagnosis = () => {
    navigation.replace("Home");
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const imageUri = await captureRef(viewRef, {
        format: "jpg",
        quality: 0.8,
      });

      const fileName = imageUri.split("/").pop();
      const fileType = "image/jpeg";

      const token = await user.getIdToken();
      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        name: fileName,
        type: fileType,
      });

      const response = await fetch(`${BACKEND_URL}/api/convert/image-to-pdf`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server error while converting image to PDF");
      }

      const blob = await response.blob();

      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64data = reader.result.split(",")[1];

        const timestamp = new Date()
          .toLocaleString("sv-SE", { hour12: false })
          .replace(" ", "_")
          .replace(/:/g, "-");
        const fileName = `Analysis_Results_${timestamp}.pdf`;

        const pdfUri = FileSystem.documentDirectory + fileName;
        await FileSystem.writeAsStringAsync(pdfUri, base64data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        await Sharing.shareAsync(pdfUri);
      };

      reader.onerror = (error) => {
        throw new Error("Failed to read PDF blob", error);
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      showToast();
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <ViewShot ref={viewRef} style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Analysis Results</Text>
        </View>
        <View style={styles.resultContainer}>
          {result.classification.labels.map((label, index) => (
            <ResultBar
              key={label}
              name={label}
              chances={result.classification.scores[index]}
            />
          ))}
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { borderColor: "black", backgroundColor: "black" },
            ]}
            onPress={handleDiagnosis}
            disabled={loading}
          >
            <Text style={[styles.buttonText, { color: "white" }]}>
              New Analysis
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              {
                borderColor: "#c0c0c0",
                backgroundColor: "#c0c0c0",
                flexDirection: "row",
              },
            ]}
            onPress={handleDownload}
            disabled={loading}
          >
            <Text style={[styles.buttonText, { color: "black" }]}>
              {loading ? "Downloading" : "Download PDF"}
            </Text>
            {loading && (
              <ActivityIndicator
                size="small"
                color="black"
                style={{ marginLeft: 10 }}
              />
            )}
          </TouchableOpacity>
        </View>
      </ViewShot>
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
    fontSize: RFValue(26),
    fontWeight: "bold",
  },
  resultContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.8,
  },
  buttonsContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: width * 0.8,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: RFValue(17),
    fontWeight: "600",
  },
});

export default ResultScreen;
