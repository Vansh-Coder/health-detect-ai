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

const { width, height } = Dimensions.get("window");

const DisclaimerModal = ({ modalVisible, setModalVisible }) => {
  const handleUnderstand = () => {
    setModalVisible(false);
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={modalVisible}
      onRequestClose={false}
    >
      <TouchableWithoutFeedback disabled={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalTextContainer}>
              <Text style={styles.modalTitle}>Medical Disclaimer</Text>
              <Text style={styles.modalText}>
                Health Detect AI is not a medical device. It is for
                educational/reference purposes only. Always consult a qualified
                healthcare professional.
              </Text>
            </View>
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleUnderstand}
              >
                <Text style={styles.buttonText}>I understand</Text>
              </TouchableOpacity>
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
    height: height * 0.4,
    width: width * 0.75,
    borderRadius: 12,
    backgroundColor: "white",
    padding: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: RFValue(17),
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 25,
  },
  modalText: {
    fontSize: RFValue(14),
    fontWeight: "600",
    color: "grey",
    textAlign: "center",
  },
  modalButtonsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "black",
  },
  buttonText: {
    fontSize: RFValue(14),
    fontWeight: "bold",
    color: "white",
  },
});

export default DisclaimerModal;
