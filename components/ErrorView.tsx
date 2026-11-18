import { View, Text, StyleSheet } from "react-native";
import { Button } from "./Button";

type ErrorViewProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Не удалось загрузить данные</Text>
      <Text style={styles.message}>{message}</Text>
      <Button variant="secondary" onPress={onRetry}>
        Повторить
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#E4E4E7",
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: "#9A9A9A",
    textAlign: "center",
    marginBottom: 4,
  },
});