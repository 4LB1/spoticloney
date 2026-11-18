import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider } from "./contexts/AuthContext";
import { HomeScreen } from "./screens/HomeScreen";
import { SearchScreen } from "./screens/SearchScreen";
import { PlayerScreen } from "./screens/PlayerScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { LikesScreen } from "./screens/LikesScreen";

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Player: { id: number };
  Login: undefined;
  Likes: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: "#171717" },
            headerTintColor: "#E4E4E7",
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Главная" }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ title: "Поиск" }}
          />
          <Stack.Screen
            name="Player"
            component={PlayerScreen}
            options={{ title: "Плеер" }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Вход" }}
          />
          <Stack.Screen
            name="Likes"
            component={LikesScreen}
            options={{ title: "Любимые треки" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}