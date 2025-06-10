import { View, Text, StyleSheet } from "react-native";

const LoginScreen = ({ setAuthenticated }) => {
  return (
    <View style={styles.container}>
      <Text>Login screen!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LoginScreen;
