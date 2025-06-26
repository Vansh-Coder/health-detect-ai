import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import PercentageBar from "./PercentageBar";

const { width } = Dimensions.get("window");

const ResultBar = ({ name, chances }) => {
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const formattedPercentage = (chances * 100).toFixed(2);

  const imageSource = {
    Eczema: require("../assets/candidateImages/Eczema.png"),
    Psoriasis: require("../assets/candidateImages/Psoriasis.png"),
    Acne: require("../assets/candidateImages/Acne.png"),
    Rash: require("../assets/candidateImages/Rash.png"),
    Infection: require("../assets/candidateImages/Infection.png"),
    "Allergic reaction": require("../assets/candidateImages/AllergicReaction.png"),
    Bruise: require("../assets/candidateImages/Bruise.png"),
    Cut: require("../assets/candidateImages/Cut.png"),
    Laceration: require("../assets/candidateImages/Laceration.png"),
    Swelling: require("../assets/candidateImages/Swelling.png"),
    Abrasion: require("../assets/candidateImages/Abrasion.png"),
    Hematoma: require("../assets/candidateImages/Hematoma.png"),
    Burn: require("../assets/candidateImages/Burn.png"),
    Fallback: require("../assets/candidateImages/Fallback.png"),
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.diseaseAndChances}>
          <View style={styles.diseaseContainer}>
            <Text style={styles.diseaseText}>{capitalizedName}</Text>
          </View>
          <View style={styles.chancesContainer}>
            <Text style={styles.chancesText}>{formattedPercentage}%</Text>
          </View>
        </View>
        <View style={styles.percentageBarContainer}>
          <PercentageBar percentage={formattedPercentage} />
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Image
          source={imageSource[capitalizedName] || imageSource["Fallback"]}
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
