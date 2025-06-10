import { View, Text, StyleSheet } from "react-native";

const SignupScreen = ({ setAuthenticated }) => {
  return (
    <View style={styles.container}>
      <Text>Sign up screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SignupScreen;
