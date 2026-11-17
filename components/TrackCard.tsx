import { View, Text, Image, Pressable, StyleSheet } from "react-native";

type TrackCardProps = {
  title: string;
  author: string;
  imageUrl: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export function TrackCard({
  title,
  author,
  imageUrl,
  isFavorite,
  onToggleFavorite,
}: TrackCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.cover} />

      <View style={styles.titleRow}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Pressable onPress={onToggleFavorite} hitSlop={8}>
          <Text style={isFavorite ? styles.heartActive : styles.heartInactive}>
            {isFavorite ? "♥" : "♡"}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.author} numberOfLines={1}>
        {author}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 140,
    marginRight: 16,
  },
  cover: {
    width: 140,
    height: 140,
    borderRadius: 8,
    backgroundColor: "#525252",
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 6,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#E4E4E7",
  },
  author: {
    fontSize: 14,
    color: "#9A9A9A",
    marginTop: 2,
  },
  heartActive: {
    fontSize: 18,
    color: "#EF4444",
  },
  heartInactive: {
    fontSize: 18,
    color: "#9A9A9A",
  },
});