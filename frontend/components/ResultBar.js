import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import PercentageBar from "./PercentageBar";

const { width } = Dimensions.get("window");

const ResultBar = ({ name, chances }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.diseaseAndChances}>
          <View style={styles.diseaseContainer}>
            <Text style={styles.diseaseText}>{name}</Text>
          </View>
          <View style={styles.chancesContainer}>
            <Text style={styles.chancesText}>{chances}%</Text>
          </View>
        </View>
        <View style={styles.percentageBarContainer}>
          <PercentageBar percentage={40} />
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Image
          source={require("../assets/candidateImages/eczema.png")}
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  leftContainer: {
    flex: 1,
    paddingRight: 10,
  },
  diseaseAndChances: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  diseaseContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  diseaseText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
  },
  chancesContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 2,
  },
  chancesText: {
    fontSize: RFValue(13),
    fontWeight: "600",
  },
  percentageBarContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 5,
  },
  rightContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
  },
});

export default ResultBar;
