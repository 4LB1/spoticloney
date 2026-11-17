import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import { TrackCard } from "../components/TrackCard";
import { MiniPlayer } from "../components/MiniPlayer";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");

  function toggleFavorite(id: string) {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  }

  const visibleTracks =
    activeTab === "all"
      ? recommendedTracks
      : recommendedTracks.filter((track) => favoriteIds.includes(track.id));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.leftControls}>
            <Pressable
              style={styles.avatarButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.avatarIcon}>👤</Text>
            </Pressable>

            <Pressable
              style={activeTab === "all" ? styles.chipActive : styles.chipInactive}
              onPress={() => setActiveTab("all")}
            >
              <Text
                style={
                  activeTab === "all"
                    ? styles.chipTextActive
                    : styles.chipTextInactive
                }
              >
                Все
              </Text>
            </Pressable>

            <Pressable
              style={
                activeTab === "favorites"
                  ? styles.chipActive
                  : styles.chipInactive
              }
              onPress={() => setActiveTab("favorites")}
            >
              <Text
                style={
                  activeTab === "favorites"
                    ? styles.chipTextActive
                    : styles.chipTextInactive
                }
              >
                Избранное
              </Text>
              {favoriteIds.length > 0 && (
                <Text
                  style={
                    activeTab === "favorites"
                      ? styles.chipTextActive
                      : styles.chipTextInactive
                  }
                >
                  {" "}({favoriteIds.length})
                </Text>
              )}
            </Pressable>
          </View>

          <Pressable
            style={styles.searchButton}
            onPress={() => navigation.navigate("Search")}
          >
            <Text style={styles.searchIcon}>🔍</Text>
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Рекомендации</Text>

          <FlatList
            horizontal
            data={visibleTracks}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.horizontalList,
              visibleTracks.length === 0 && styles.emptyListContainer,
            ]}
            renderItem={({ item }) => (
              <Pressable onPress={() => navigation.navigate("Player")}>
                <TrackCard
                  title={item.title}
                  author={item.author}
                  imageUrl={item.imageUrl}
                  isFavorite={favoriteIds.includes(item.id)}
                  onToggleFavorite={() => toggleFavorite(item.id)}
                />
              </Pressable>
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                Пока нет избранных треков — нажмите ♡ на карточке.
              </Text>
            }
          />
        </View>

        <MiniPlayer
          title="Название"
          author="Автор"
          imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCva-w-oDVHKWpg90Rh8TUnY1_GnzxoDnlLam-8ItqcQ&s=10"
          onPress={() => navigation.navigate("Player")}
        />
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
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  leftControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatarButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#E4E4E7",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarIcon: {
    fontSize: 18,
    color: "#171717",
  },
  chipActive: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6100C5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipTextActive: {
    color: "#E4E4E7",
    fontSize: 14,
    fontWeight: "600",
  },
  chipInactive: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#525252",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipTextInactive: {
    color: "#9A9A9A",
    fontSize: 14,
  },
  searchButton: {
    padding: 6,
  },
  searchIcon: {
    fontSize: 22,
    color: "#E4E4E7",
  },
  content: {
    flex: 1,
    paddingTop: 28,
    paddingLeft: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#E4E4E7",
    marginBottom: 16,
  },
  horizontalList: {
    paddingRight: 16,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingRight: 16,
  },
  emptyText: {
    color: "#9A9A9A",
    fontSize: 15,
    maxWidth: 280,
    lineHeight: 22,
  },
});

const recommendedTracks = [
  {
    id: "1",
    title: "Follow the Leader",
    author: "Korn",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCva-w-oDVHKWpg90Rh8TUnY1_GnzxoDnlLam-8ItqcQ&s=10",
  },
  {
    id: "2",
    title: "The Dark Side",
    author: "Pink Floyd",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMVfxsRuGrLq7PIL5RD9J85M9uw1NoAaIIB7BQHHLuOw&s",
  },
  {
    id: "3",
    title: "In the Court",
    author: "King Crimson",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZnBrlb5wdUZBa7yClvwXzlub6DmKVHGzhwefXG1QGSA&s=10",
  },
  {
    id: "4",
    title: "Meteora",
    author: "Linkin Park",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKNeoTxUk1C1NYsqfLxJDMsZLCnb8wipMzymny-IuAAA&s=10",
  },
  {
    id: "5",
    title: "Awake and alive",
    author: "Skillet",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-zSfKrJ8rKhrUoDOIA8Nywknya1HC-DihMM0Q_d79Cw&s",
  },
];