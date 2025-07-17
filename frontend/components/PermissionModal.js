import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Linking,
  Dimensions,
} from "react-native";
import Toast from "react-native-toast-message";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");

const PermissionModal = ({ modalVisible, setModalVisible, modalText }) => {
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

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      showToast("Error opening settings, try again later !");
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
      onRequestClose={handleOk}
    >
      <TouchableWithoutFeedback onPress={handleOk}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalTextContainer}>
              <Text style={styles.modalTextStyle}>{modalText}</Text>
            </View>
            <View style={styles.modalButtonsContainer}>
              <View style={styles.okButtonContainer}>
                <TouchableOpacity style={styles.okButton} onPress={handleOk}>
                  <Text style={styles.okButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.settingsButtonContainer}>
                <TouchableOpacity
                  style={styles.settingsButton}
                  onPress={handleSettings}
                >
                  <Text style={styles.settingsButtonText}>Go to Settings</Text>
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
  modalTextStyle: {
    fontSize: RFValue(15),
    fontWeight: "600",
    textAlign: "center",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  },
  okButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  okButton: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "black",
  },
  okButtonText: {
    fontSize: RFValue(13),
    fontWeight: "bold",
    color: "white",
  },
  settingsButtonContainer: {
    flex: 2.25,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
  },
  settingsButton: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "gray",
  },
  settingsButtonText: {
    fontSize: RFValue(13),
    fontWeight: "bold",
    color: "white",
  },
});

export default PermissionModal;
