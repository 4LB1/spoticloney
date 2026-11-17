import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "./screens/LoginScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { PlayerScreen } from "./screens/PlayerScreen";
import { SearchScreen } from "./screens/SearchScreen";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Player: undefined;
  Search: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: "#171717" },
          headerTintColor: "#E4E4E7",
          headerTitleStyle: { fontWeight: "600" },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Вход" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Главная" }}
        />
        <Stack.Screen
          name="Player"
          component={PlayerScreen}
          options={{ title: "Плеер" }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: "Поиск" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}