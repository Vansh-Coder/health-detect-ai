import { View, Text, StyleSheet } from "react-native";

const PercentageBar = ({ percentage }) => {
  const barWidth = `${percentage}%`;

  return (
    <View style={styles.container}>
      <View style={[styles.fill, { width: barWidth }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 3,
    overflow: "hidden",
    backgroundColor: "#e0e0e0",
    height: 5,
  },
  fill: {
    height: "100%",
    backgroundColor: "#71797E",
  },
});

export default PercentageBar;
