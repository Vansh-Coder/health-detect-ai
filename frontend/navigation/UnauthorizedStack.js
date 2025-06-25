import { createStackNavigator } from "@react-navigation/stack";
import BlankHeaderOptions from "../components/BlankHeaderOptions";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import VerifyEmailScreen from "../screens/VerifyEmailScreen";
import EnterEmailScreen from "../screens/EnterEmailScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

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
        component={SignupScreen}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="VerifyEmail"
        options={({ navigation }) => BlankHeaderOptions({ navigation })}
      >
        {(props) => (
          <VerifyEmailScreen {...props} setAuthenticated={setAuthenticated} />
        )}
      </Stack.Screen>
      <Stack.Screen
        name="EnterEmail"
        component={EnterEmailScreen}
        options={({ navigation }) => BlankHeaderOptions({ navigation })}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={({ navigation }) =>
          BlankHeaderOptions({ navigation, useCustomBack: true })
        }
      />
    </Stack.Navigator>
  );
};

export default UnauthorizedStack;
