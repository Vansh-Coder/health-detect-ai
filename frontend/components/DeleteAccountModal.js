import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import Toast from "react-native-toast-message";
import { RFValue } from "react-native-responsive-fontsize";
import { auth } from "../firebaseConfig";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

const { width, height } = Dimensions.get("window");

const DeleteAccountModal = ({ modalVisible, setModalVisible }) => {
  const [firstLoading, setFirstLoading] = useState(false);
  const [secondLoading, setSecondLoading] = useState(false);
  const [needPassword, setNeedPassword] = useState(false);
  const [password, setPassword] = useState("");
  const isMounted = useRef(true);

  const user = auth.currentUser;

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

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

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleDelete = async () => {
    setFirstLoading(true);
    try {
      await deleteUser(user);
      showToast("Account deleted successfully.");
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        setNeedPassword(true);
      } else {
        showToast("Error, please email your request !");
        console.log("Error occured:", error);
      }
    } finally {
      if (isMounted.current) {
        setFirstLoading(false);
        if (error.code !== "auth/requires-recent-login") {
          setModalVisible(false);
        }
      }
    }
  };

  const handlePasswordVerification = async () => {
    setSecondLoading(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      showToast("Account deleted successfully.");
    } catch (error) {
      showToast("Error, please email your request !");
      console.log("Error occured:", error);
    } finally {
      if (isMounted.current) {
        setSecondLoading(false);
        setModalVisible(false);
      }
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={handleCancel}
    >
      <TouchableWithoutFeedback
        onPress={handleCancel}
        disabled={firstLoading || secondLoading}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {needPassword ? (
              <>
                <View style={styles.instructionTitleContainer}>
                  <Text style={styles.instructionTitleText}>
                    Please enter your password
                  </Text>
                </View>
                <View style={styles.instructionFieldContainer}>
                  <TextInput
                    style={styles.instructionField}
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={(val) => setPassword(val)}
                    autoCapitalize="none"
                  />
                </View>
                <View style={styles.instructionButtonContainer}>
                  <TouchableOpacity
                    style={styles.instructionButton}
                    onPress={handlePasswordVerification}
                    disabled={secondLoading}
                  >
                    <Text style={styles.instructionButtonText}>
                      {secondLoading ? "Confirming" : "Confirm"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <View style={styles.modalTextContainer}>
                  <Text style={styles.modalText}>
                    Are you sure you want to delete your account? This action
                    cannot be undone.
                  </Text>
                </View>
                <View style={styles.modalButtonsContainer}>
                  <View style={styles.cancelButtonContainer}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={handleCancel}
                      disabled={firstLoading}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.deleteButtonContainer}>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={handleDelete}
                      disabled={firstLoading}
                    >
                      <Text style={styles.deleteButtonText}>
                        {firstLoading ? "Deleting" : "Delete"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    height: height * 0.2,
    width: width * 0.7,
    borderRadius: 12,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  instructionTitleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  instructionTitleText: {
    fontSize: RFValue(14),
    fontWeight: "600",
  },
  instructionFieldContainer: {
    borderWidth: 2,
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "white",
    marginBottom: 15,
  },
  instructionField: {
    width: width * 0.55,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: RFValue(14),
  },
  instructionButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  instructionButton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "black",
    padding: 10,
  },
  instructionButtonText: {
    fontSize: RFValue(13),
    fontWeight: "bold",
    color: "white",
  },
  modalTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  modalText: {
    fontSize: RFValue(15),
    fontWeight: "600",
    textAlign: "center",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  cancelButton: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
    padding: 10,
    backgroundColor: "black",
  },
  cancelButtonText: {
    fontSize: RFValue(13),
    fontWeight: "bold",
    color: "white",
  },
  deleteButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "red",
    padding: 10,
    backgroundColor: "white",
  },
  deleteButtonText: {
    fontSize: RFValue(13),
    fontWeight: "bold",
    color: "red",
  },
});

export default DeleteAccountModal;
