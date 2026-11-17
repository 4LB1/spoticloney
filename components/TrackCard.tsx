import { View, Text, Image, StyleSheet } from "react-native";

type TrackCardProps = {
  title: string;
  author: string;
  imageUrl: string;
};

export function TrackCard({ title, author, imageUrl }: TrackCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.cover} />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
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
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E4E4E7",
  },
  author: {
    fontSize: 14,
    color: "#9A9A9A",
    marginTop: 2,
  },
});