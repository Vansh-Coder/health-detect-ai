import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const [question, setQuestion] = useState("");

  const handleSubmit = () => {
    console.log("Submit button pressed!");
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
            <Text style={styles.titleText}>
              Share image for diagnosis below
            </Text>
          </View>
          <View style={styles.middleContainer}>
            <View style={styles.cameraButtonContainer}>
              <TouchableOpacity style={styles.cameraButton}>
                <MaterialIcons
                  name="add-a-photo"
                  size={RFValue(20)}
                  color="#ccc"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.galleryButtonContainer}>
              <TouchableOpacity style={styles.galleryButton}>
                <MaterialIcons
                  name="add-photo-alternate"
                  size={RFValue(20)}
                  color="#ccc"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.lowerContainer}>
            <Text style={styles.fieldLabel}>Ask related question</Text>
            <View style={styles.fieldContainer}>
              <TextInput
                placeholder="Optional"
                style={styles.field}
                onChangeText={(val) => setQuestion(val)}
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    flex: 1,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    textAlign: "center",
  },
  middleContainer: {
    flex: 4,
    borderWidth: 1,
  },
  cameraButtonContainer: {},
  cameraButton: {},
  galleryButtonContainer: {},
  galleryButton: {},
  lowerContainer: {
    flex: 1.5,
    borderWidth: 1,
  },
  fieldLabel: {},
  fieldContainer: {},
  field: {},
  submitButton: {},
  submitButtonText: {},
});

export default HomeScreen;
