import { createStackNavigator } from "@react-navigation/stack";
import BlankHeaderOptions from "../components/BlankHeaderOptions";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import EnterOTPScreen from "../screens/EnterOTPScreen";

const Stack = createStackNavigator();

const UnauthorizedStack = ({ setAuthenticated }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Login"
        options={() => ({
          headerShown: false,
        })}
      >
        {(props) => (
          <LoginScreen {...props} setAuthenticated={setAuthenticated} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="Signup"
        options={() => ({
          headerShown: false,
        })}
      >
        {(props) => (
          <SignupScreen {...props} setAuthenticated={setAuthenticated} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={({ navigation }) => ({
          ...BlankHeaderOptions(navigation),
        })}
      />
      <Stack.Screen
        name="EnterOTP"
        options={({ navigation }) => ({
          ...BlankHeaderOptions(navigation),
        })}
      >
        {(props) => (
          <EnterOTPScreen {...props} setAuthenticated={setAuthenticated} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default UnauthorizedStack;
