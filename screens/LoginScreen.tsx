import { View, Text, Pressable, SafeAreaView, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Вход в аккаунт</Text>

        <View style={styles.formBlock}>
          <Text style={styles.logoIcon}>♪</Text>

          <View style={styles.inputBox}>
            <Text style={styles.inputPlaceholder}>Введите email...</Text>
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.inputPlaceholder}>Введите пароль...</Text>
          </View>

          <Pressable
            style={styles.loginButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.loginButtonText}>Войти</Text>
          </Pressable>
        </View>

        <View style={styles.bottomSpacer} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#171717",
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#E4E4E7",
    marginTop: 16,
  },
  formBlock: {
    width: "100%",
    alignItems: "center",
    gap: 16,
  },
  logoIcon: {
    fontSize: 72,
    color: "#7F00FF",
    marginBottom: 24,
  },
  inputBox: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#525252",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  inputPlaceholder: {
    fontSize: 15,
    color: "#9A9A9A",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#7F00FF",
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#E4E4E7",
  },
  bottomSpacer: {
    height: 40,
  },
});