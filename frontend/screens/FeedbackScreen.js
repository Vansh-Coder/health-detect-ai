import React, { useState } from "react";
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
import { RFValue } from "react-native-responsive-fontsize";

const { width } = Dimensions.get("window");

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState("");
  const isDisabled = feedback.trim().length === 0;

  const handleSubmit = () => {
    // Add toast here
    console.log(feedback.trim());
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <View style={styles.upperContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Any Feedback is Welcome !</Text>
            </View>
            <View style={styles.fieldContainer}>
              <TextInput
                style={styles.field}
                placeholder="Type your feedback here..."
                onChangeText={(val) => setFeedback(val)}
                multiline={true}
                numberOfLines={9}
                maxLength={600}
              />
            </View>
          </View>
          <View style={styles.lowerContainer}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                {
                  borderColor: isDisabled ? "#D3D3D3" : "black",
                  backgroundColor: isDisabled ? "#999999" : "black",
                },
              ]}
              onPress={handleSubmit}
              disabled={isDisabled}
            >
              <Text
                style={[
                  styles.submitButtonText,
                  {
                    color: isDisabled ? "#7D7D7D" : "white",
                  },
                ]}
              >
                Submit
              </Text>
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
  upperContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  titleText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
  },
  fieldContainer: {
    width: width * 0.75,
    borderWidth: 2,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "white",
    marginBottom: 20,
  },
  field: {
    width: width * 0.75,
    height: RFValue(216),
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: RFValue(17),
    textAlignVertical: "top",
  },
  lowerContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 15,
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.75,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 15,
  },
  submitButtonText: {
    fontSize: RFValue(17),
    fontWeight: "bold",
  },
});

export default FeedbackScreen;
