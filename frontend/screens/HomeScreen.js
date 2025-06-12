import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [image, setImage] = useState("");
  const [imageAdded, setImageAdded] = useState(false);
  const [question, setQuestion] = useState("");

  const handleCamera = async () => {
    // Asking for permission
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      // Add toast here
      alert("Camera access is required!");
      return;
    }

    // Launching camera
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Saving the image
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageAdded(true);
    }
  };

  const handleGallery = async () => {
    // Launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Saving the image
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageAdded(true);
    }
  };

  const handleRemove = () => {
    // Add toast here
    setImage("");
    setImageAdded(false);
  };

  const handleSubmit = () => {
    // save image, run results, and navigate
    console.log("Submit button pressed!");
    navigation.navigate("HomeStack", {
      screen: "Result",
      params: { question },
    });
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
            <Text style={styles.titleText}>Share Image for Diagnosis</Text>
          </View>
          {imageAdded ? (
            <View style={styles.middleContainerWithImage}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: image }} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={handleRemove}
                >
                  <FontAwesome name="remove" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.middleContainerWithoutImage}>
              <View style={styles.middleButtonContainer}>
                <TouchableOpacity
                  style={styles.middleButton}
                  onPress={handleCamera}
                >
                  <MaterialIcons
                    name="add-a-photo"
                    size={RFValue(30)}
                    color="#ccc"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.middleButtonContainer}>
                <TouchableOpacity
                  style={styles.middleButton}
                  onPress={handleGallery}
                >
                  <MaterialIcons
                    name="add-photo-alternate"
                    size={RFValue(32)}
                    color="#ccc"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View style={styles.lowerContainer}>
            <Text style={styles.fieldLabel}>
              Ask related question (optional)
            </Text>
            <View style={styles.fieldContainer}>
              <TextInput
                placeholder='Ex. "Is this eczema ?"'
                style={styles.field}
                onChangeText={(val) => setQuestion(val.trim())}
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity
              style={[
                styles.submitButton,
                {
                  borderColor: imageAdded ? "black" : "#D3D3D3",
                  backgroundColor: imageAdded ? "black" : "#999999",
                },
              ]}
              onPress={handleSubmit}
              disabled={!imageAdded}
            >
              <Text
                style={[
                  styles.submitButtonText,
                  { color: imageAdded ? "white" : "#7D7D7D" },
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
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: RFValue(21),
    fontWeight: "bold",
    textAlign: "center",
  },
  middleContainerWithImage: {
    flex: 4,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    width: width * 0.7,
    height: width * 0.7,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  removeButton: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: width * 0.05,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "100%",
    marginTop: 20,
    left: "50%",
    transform: [{ translateX: -((width * 0.1) / 2) }], // centers horizontally
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.65,
    elevation: 3,
  },
  middleContainerWithoutImage: {
    flex: 4,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  middleButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  middleButton: {
    borderRadius: 20,
    width: width * 0.3,
    height: width * 0.3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.65,
    elevation: 3,
  },
  lowerContainer: {
    flex: 2,
    alignItems: "center",
  },
  fieldLabel: {
    width: width * 0.8,
    fontSize: RFValue(15),
    fontWeight: "500",
    marginBottom: 5,
    paddingLeft: 5,
  },
  fieldContainer: {
    width: width * 0.8,
    borderWidth: 2,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "white",
    marginBottom: 20,
  },
  field: {
    width: width * 0.8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: RFValue(16),
  },
  submitButton: {
    width: width * 0.8,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: RFValue(17),
    fontWeight: "600",
  },
});

export default HomeScreen;
