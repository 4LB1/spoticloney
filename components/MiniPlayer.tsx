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
      <Image source={{ uri: imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCva-w-oDVHKWpg90Rh8TUnY1_GnzxoDnlLam-8ItqcQ&s=10" }} style={styles.cover} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
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