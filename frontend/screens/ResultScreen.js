import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import ResultBar from "../components/ResultBar";

const { width } = Dimensions.get("window");

const ResultScreen = ({ navigation, route }) => {
  const { question } = route.params || "";

  const dataResults = [
    { name: "Disease 1", score: "60.7" },
    { name: "Disease 2", score: "25.4" },
    { name: "Disease 3", score: "14.5" },
  ];

  const dataAnswer = [{ answer: "Okay" }];

  const handleDiagnosis = () => {
    console.log("Diagnosis pressed!");
  };

  const handleDownload = () => {
    console.log("Download pressed!");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <View style={styles.container}>
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
          >
            <Text
              style={[styles.buttonText, { color: "white" }]}
              onPress={handleDiagnosis}
            >
              New Diagnosis
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { borderColor: "#c0c0c0", backgroundColor: "#c0c0c0" },
            ]}
          >
            <Text
              style={[styles.buttonText, { color: "black" }]}
              onPress={handleDownload}
            >
              Download PDF
            </Text>
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
