import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";

const { width, height } = Dimensions.get("window");

const onboardingData = [
  {
    title: "Welcome to HealthDetect AI",
    image: require("../assets/OnboardingImages/OnboardingFirst.png"),
  },
  {
    title: "Take a Picture of your Skin",
    image: require("../assets/OnboardingImages/OnboardingSecond.png"),
  },
  {
    title: "Get Real Insights by AI",
    image: require("../assets/OnboardingImages/OnboardingThird.png"),
  },
];

const OnboardingScreen = ({ navigation }) => {
  const progress = useSharedValue(0);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={item.image} style={styles.image} />
    </View>
  );

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={{ flex: 3 }}>
          <Carousel
            width={width}
            height={height * 0.6}
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

        <View style={styles.lowerContainer}>
          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Create an Account</Text>
          </TouchableOpacity>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account ? </Text>
            <Text style={styles.footerLoginText} onPress={handleLogin}>
              Login
            </Text>
          </View>
        </View>
      </View>
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
    backgroundColor: "white",
    justifyContent: "center",
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
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
    marginHorizontal: 5,
  },
  activeDot: {
    width: 10,
    height: 10,
    backgroundColor: "black",
    borderRadius: 5,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
  },
  lowerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signupButton: {
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "black",
    paddingVertical: 15,
    width: width * 0.6,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  signupButtonText: {
    fontSize: RFValue(14),
    color: "white",
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: RFValue(12),
  },
  footerLoginText: {
    fontSize: RFValue(12),
    fontWeight: "600",
  },
});

export default OnboardingScreen;
