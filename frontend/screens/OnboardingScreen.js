// import { View, Text, StyleSheet } from "react-native";
// import { RFValue } from "react-native-responsive-fontsize";

// const OnboardingScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.body}>Onboarding screen!</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   body: {
//     fontSize: RFValue(14),
//   },
// });

// export default OnboardingScreen;
import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const onboardingData = [
  {
    title: "Welcome to HealthDetect",
    image: require("../assets/pic.png"),
  },
  {
    title: "Track Your Health",
    image: require("../assets/pic.png"),
  },
  {
    title: "Get AI Insights",
    image: require("../assets/pic.png"),
  },
];

export default function OnboardingScreen() {
  const progress = useSharedValue(0);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        width={SCREEN_WIDTH}
        height={SCREEN_WIDTH * 1.2}
        data={onboardingData}
        loop={false}
        onProgressChange={progress}
        scrollAnimationDuration={500}
        renderItem={renderItem}
      />

      <Pagination.Basic
        progress={progress}
        data={onboardingData}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        containerStyle={styles.paginationContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  slide: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 32,
    textAlign: "center",
    color: "#333",
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
  },
  activeDot: {
    width: 10,
    height: 10,
    backgroundColor: "#000",
    borderRadius: 5,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
});
