import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import Toast from "react-native-toast-message";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");

const DeleteAccountModal = ({ modalVisible, setModalVisible }) => {
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
    try {
      console.log("Delete option pressed !");
    } catch (error) {
      showToast("Error deleting account, try again later !");
      console.log("Error occured:", error);
    } finally {
      setModalVisible(false);
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
                Are you sure you want to delete your account and all related
                information ?
              </Text>
            </View>
            <View style={styles.modalButtonsContainer}>
              <View style={styles.cancelButtonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancel}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.deleteButtonContainer}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleDelete}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
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
