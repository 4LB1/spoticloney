import { Pressable, Text, StyleSheet } from "react-native";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  children: string;
  variant?: ButtonVariant;
  onPress: () => void;
  disabled?: boolean;
};

export function Button({
  children,
  variant = "primary",
  onPress,
  disabled = false,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        variant === "primary" ? styles.primary : styles.secondary,
        disabled ? styles.disabled : null,
      ]}
    >
      <Text
        style={
          variant === "primary" ? styles.textPrimary : styles.textSecondary
        }
      >
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: "#6D28D9",
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#6D28D9",
  },
  disabled: {
    opacity: 0.5,
  },
  textPrimary: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  textSecondary: {
    color: "#A78BFA",
    fontSize: 16,
    fontWeight: "700",
  },
});