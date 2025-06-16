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

const { width } = Dimensions.get("window");

const ResultScreen = ({ navigation, route }) => {
  const { question } = route.params || "";
  const viewRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const dataResults = [
    { name: "Disease 1", score: "60.7" },
    { name: "Disease 2", score: "25.4" },
    { name: "Disease 3", score: "14.5" },
  ];

  const dataAnswer = [{ answer: "Okay" }];

  const showFailToast = () => {
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
        quality: 1,
      });

      const fileName = imageUri.split("/").pop();
      const fileType = "image/jpeg";

      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        name: fileName,
        type: fileType,
      });

      const response = await fetch(
        "http://192.168.1.10:8000/api/convert/image-to-pdf",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Server error while converting image to PDF");
      }

      const blob = await response.blob();

      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result.split(",")[1];

        const pdfUri = FileSystem.documentDirectory + "Diagnosis_Results.pdf";
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
      showFailToast();
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <ViewShot
        ref={viewRef}
        options={{ format: "jpg", quality: 0.9 }}
        style={styles.container}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Diagnosis Results</Text>
        </View>
        <View style={styles.resultContainer}>
          <ResultBar name={"Disease 1"} chances={"60.7"} />
          <ResultBar name={"Disease 2"} chances={"25.4"} />
          <ResultBar name={"Disease 3"} chances={"14.5"} />
          {question && question.length > 0 && (
            <View style={styles.QAContainer}>
              <View style={styles.innerContainer}>
                <View style={styles.markerContainer}>
                  <Text style={styles.questionText}>Q.</Text>
                </View>
                <View style={styles.sentenceContainer}>
                  <Text style={styles.questionText}>{question}</Text>
                </View>
              </View>
              <View style={styles.innerContainer}>
                <View style={styles.markerContainer}>
                  <Text style={styles.answerText}>A.</Text>
                </View>
                <View style={styles.sentenceContainer}>
                  <Text style={styles.answerText}>Answer here</Text>
                </View>
              </View>
            </View>
          )}
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
              New Diagnosis
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
  QAContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 30,
  },
  innerContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  markerContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  sentenceContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  questionText: {
    fontSize: RFValue(15),
    fontWeight: "600",
    color: "#787878",
  },
  answerText: {
    fontSize: RFValue(15),
    fontWeight: "600",
    color: "black",
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
