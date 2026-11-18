import { View, Text, Image, Pressable, StyleSheet } from "react-native";

type MiniPlayerProps = {
  title: string;
  author: string;
  imageUrl: string;
  onPress: () => void;
};

export function MiniPlayer({ title, author, imageUrl, onPress }: MiniPlayerProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.cover} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          {author}
        </Text>
      </View>
      <Text style={styles.playIcon}>▶</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6100C5",
    borderRadius: 16,
    padding: 10,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  cover: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: "#3F3F46",
  },
  info: {
    flex: 1,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E4E4E7",
  },
  author: {
    fontSize: 13,
    color: "#E4E4E7",
    marginTop: 2,
  },
  playIcon: {
    fontSize: 22,
    color: "#E4E4E7",
    marginRight: 8,
  },
});