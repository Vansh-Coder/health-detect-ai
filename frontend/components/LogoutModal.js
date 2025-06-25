import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

const { width, height } = Dimensions.get("window");

const LogoutModal = ({ setAuthenticated, modalVisible, setModalVisible }) => {
  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleLogoutConfirm = async () => {
    try {
      await signOut(auth);
      setModalVisible(false);
      setAuthenticated(false);
      console.log("Sign out successful!");
    } catch (error) {
      console.log("Error occured:", error);
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={handleCancel}
    >
      <TouchableWithoutFeedback onPress={handleCancel}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalTextContainer}>
              <Text style={styles.modalText}>
                Are you sure you want to logout ?
              </Text>
            </View>
            <View style={styles.modalButtonsContainer}>
              <View style={styles.cancelButtonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancel}
                >
                  <Text style={styles.cancelButtonText}>Go Back</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.confirmButtonContainer}>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleLogoutConfirm}
                >
                  <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  modalTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  modalText: {
    fontSize: RFValue(14),
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
    alignItems: "center",
  },
  cancelButton: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "black",
  },
  cancelButtonText: {
    fontSize: RFValue(13),
    fontWeight: "bold",
    color: "white",
  },
  confirmButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "gray",
  },
  confirmButtonText: {
    fontSize: RFValue(13),
    fontWeight: "bold",
    color: "white",
  },
});

export default LogoutModal;
