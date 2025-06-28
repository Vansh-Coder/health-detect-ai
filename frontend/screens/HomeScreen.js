import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { ImageManipulator, SaveFormat } from "expo-image-manipulator";
import Toast from "react-native-toast-message";
import { RFValue } from "react-native-responsive-fontsize";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import LoadingScreen from "./LoadingScreen";
import { auth, storage } from "../firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [image, setImage] = useState("");
  const [imageAdded, setImageAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = auth.currentUser;

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

  const isImageTooLarge = async (image) => {
    try {
      const limitMB = 5;
      const info = await FileSystem.getInfoAsync(image);
      const sizeInMB = info.size / (1024 * 1024);

      return sizeInMB > limitMB;
    } catch (error) {
      console.log("Error occured:", error);
      return true;
    }
  };

  const handleCamera = async () => {
    // Asking for permission
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      showToast("Camera access is required !");
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
      const uri = result.assets[0].uri;
      const tooLarge = await isImageTooLarge(uri);

      if (tooLarge) {
        showToast("Please share an image under 5MB !");
        return;
      }

      setImage(uri);
      setImageAdded(true);
      showToast("Image uploaded successfully !");
    }
  };

  const handleGallery = async () => {
    // Asking for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      showToast("Gallery access is required !");
      return;
    }

    // Launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Saving the image
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const tooLarge = await isImageTooLarge(uri);

      if (tooLarge) {
        showToast("Please share an image under 5MB !");
        return;
      }

      setImage(uri);
      setImageAdded(true);
      showToast("Image uploaded successfully !");
    }
  };

  const handleRemove = () => {
    setImage("");
    setImageAdded(false);
  };

  const resizeAndCompressImage = async (image) => {
    try {
      const manipulator = ImageManipulator.manipulate(image);
      manipulator.resize({ width: 800 });

      const rendered = await manipulator.renderAsync();
      const saved = await rendered.saveAsync({
        compress: 0.7,
        format: SaveFormat.JPEG,
      });

      return saved.uri;
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  const uploadImage = async (image) => {
    try {
      const manipulatedImage = await resizeAndCompressImage(image);

      const response = await fetch(manipulatedImage);
      const blob = await response.blob();

      const path = `${user.email}/${Date.now()}.jpg`;
      const storageRef = ref(storage, `images/${path}`);

      await uploadBytes(storageRef, blob);
      await FileSystem.deleteAsync(manipulatedImage, { idempotent: true });
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  const getMimeandName = (image) => {
    const extension = image.split(".").pop().toLowerCase();
    const photoName = `photo.${extension}`;

    let photoType = "image/jpeg";
    if (extension === "png") {
      photoType = "image/png";
    }

    return { photoType, photoName };
  };

  const fetchResults = async (image) => {
    try {
      const { photoType, photoName } = getMimeandName(image);
      const token = await user.getIdToken();
      const formData = new FormData();

      formData.append("file", {
        uri: image,
        name: photoName,
        type: photoType,
      });

      const response = await fetch(`${BACKEND_URL}/api/diagnosis/image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (!response.ok) {
        console.log("Response not OK:", response);
        return;
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await uploadImage(image);
      const result = await fetchResults(image);

      if (result) {
        navigation.navigate("HomeStack", {
          screen: "Result",
          params: { result },
        });
      } else {
        showToast("Error, please try again !");
      }
    } catch (error) {
      console.log("Error occured:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return LoadingScreen("Analyzing results, please wait...");
  }

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
                Run Diagnosis
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
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: RFValue(22),
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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 40,
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
