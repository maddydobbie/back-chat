

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useFonts } from 'expo-font';

import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import ResetPwd from './screens/ResetPwd';
import ConfirmResetPwd from './screens/ConfirmResetPwd';
import Start from './screens/Start';
import ChatBot from './screens/ChatBot';
import Test from './screens/Test';
import Goals from './screens/Goals';
import Favourite from './screens/Favourite';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
}

const App = () => {
  const [loaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
  });

  if (!loaded) return null;
  
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ResetPwd" component={ResetPwd} />
        <Stack.Screen name="ConfirmResetPwd" component={ConfirmResetPwd} />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="ChatBot" component={ChatBot} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Goals" component={Goals} />
        <Stack.Screen name="Favourite" component={Favourite} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;