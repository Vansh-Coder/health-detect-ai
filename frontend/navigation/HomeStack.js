import { createStackNavigator } from "@react-navigation/stack";
import DrawerHeaderOptions from "../components/DrawerHeaderOptions";
import ResultHeaderOptions from "../components/ResultHeaderOptions";
import HomeScreen from "../screens/HomeScreen";
import ResultScreen from "../screens/ResultScreen";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          // showing drawer header only for home screen
          ...DrawerHeaderOptions(navigation),
        })}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={({ navigation }) => ({
          ...ResultHeaderOptions(navigation),
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
