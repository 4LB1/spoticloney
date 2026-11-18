import { View, Text, TextInput, StyleSheet, SafeAreaView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FormField } from "../components/FormField";
import { Button } from "../components/Button";
import { useForm } from "../hooks/useForm";
import { useAuth } from "../contexts/AuthContext";
import type { RootStackParamList } from "../App";

type LoginValues = {
  email: string;
  password: string;
};

function validate(values: LoginValues) {
  const errors: Record<string, string> = {};
  const email = values.email.trim();

  if (!email) {
    errors.email = "Введите email слушателя";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Некорректный формат email (пример: user@music.by)";
  }

  if (!values.password) {
    errors.password = "Введите пароль";
  } else if (values.password.length < 6) {
    errors.password = "Пароль должен содержать не менее 6 символов";
  }

  return errors;
  }

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const { login } = useAuth();
  const { values, errors, handleChange, handleSubmit } = useForm<LoginValues>(
    { email: "", password: "" },
    validate
  );

  function goToApp() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate("Home");
    }
  }

  function onSubmit() {
    handleSubmit((validValues) => {
      login(validValues.email);
      goToApp();
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Вход в аккаунт</Text>
      <Text style={styles.subtitle}>
        Войдите, чтобы сохранять избранные треки и синхронизировать очередь
        прослушивания.
      </Text>

      <FormField label="Email" error={errors.email}>
        <TextInput
          style={[styles.input, errors.email ? styles.inputError : null]}
          value={values.email}
          onChangeText={(text) => handleChange("email", text)}
          placeholder="listener@music.by"
          placeholderTextColor="#6B6B7B"
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </FormField>

      <FormField label="Пароль" error={errors.password}>
        <TextInput
          style={[styles.input, errors.password ? styles.inputError : null]}
          value={values.password}
          onChangeText={(text) => handleChange("password", text)}
          placeholder="Минимум 6 символов"
          placeholderTextColor="#6B6B7B"
          secureTextEntry
        />
      </FormField>

      <View style={styles.actions}>
        <Button variant="primary" onPress={onSubmit}>
          Войти
        </Button>

        <View style={styles.spacer} />

        <Button variant="secondary" onPress={goToApp}>
          Продолжить как гость
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121216",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 24,
    lineHeight: 20,
  },
  input: {
    backgroundColor: "#1E1E24",
    borderWidth: 1,
    borderColor: "#2E2E38",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#FFFFFF",
  },
  inputError: {
    borderColor: "#F87171",
  },
  actions: {
    marginTop: 8,
  },
  spacer: {
    height: 12,
  },
});