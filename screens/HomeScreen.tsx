import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TrackCard } from "../components/TrackCard";
import { MiniPlayer } from "../components/MiniPlayer";
import { Button } from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import type { RootStackParamList } from "../App";

type Track = {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
};

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const { user, logout } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");

  function toggleFavorite(id: string) {
    setFavoriteIds((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
  }

  const visibleTracks =
    activeTab === "all"
      ? recommendedTracks
      : recommendedTracks.filter((track) => favoriteIds.includes(track.id));

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Панель авторизации из Context */}
          <View style={styles.authBar}>
            <Pressable
              style={styles.avatarCircle}
              onPress={() => {
                if (!user) {
                  navigation.navigate("Login");
                }
              }}
            >
              <Text style={styles.avatarIcon}>👤</Text>
            </Pressable>

            {user ? (
              <>
                <Text style={styles.authText} numberOfLines={1}>
                  Слушатель: {user}
                </Text>
                <Pressable onPress={logout} hitSlop={8}>
                  <Text style={styles.authLink}>Выйти</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={styles.authText}>Гостевой режим</Text>
                <Pressable
                  onPress={() => navigation.navigate("Login")}
                  hitSlop={8}
                >
                  <Text style={styles.authLink}>Войти</Text>
                </Pressable>
              </>
            )}
          </View>

          {/* Вкладки фильтрации (ЛР4) + иконка перехода в Поиск (ЛР3) */}
          <View style={styles.tabsRow}>
            <Pressable
              style={
                activeTab === "all" ? styles.chipActive : styles.chipInactive
              }
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
              </Text>
            </Pressable>

            <Pressable
              style={styles.searchButton}
              onPress={() => navigation.navigate("Search")}
              hitSlop={8}
            >
              <Text style={styles.searchIcon}>🔍</Text>
            </Pressable>
          </View>

          <Text style={styles.sectionTitle}>Рекомендации</Text>

          {/* Виртуализированный список FlatList из ЛР4 */}
          <View style={styles.listWrapper}>
            <FlatList
              horizontal
              data={visibleTracks}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={
                visibleTracks.length === 0
                  ? styles.emptyListContainer
                  : undefined
              }
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
                <View style={styles.emptyBox}>
                  <Text style={styles.emptyText}>
                    Пока нет избранных треков — нажмите ♡ на карточке.
                  </Text>
                  <Button
                    variant="secondary"
                    onPress={() => setActiveTab("all")}
                  >
                    Показать все треки
                  </Button>
                </View>
              }
            />
          </View>
        </View>

        {/* Ваш существующий переиспользуемый MiniPlayer */}
        <MiniPlayer
          title="Follow the Leader"
          author="Korn"
          imageUrl="https://picsum.photos/id/1011/200"
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  authBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#262626",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  avatarCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E0F2FE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarIcon: {
    fontSize: 15,
  },
  authText: {
    flex: 1,
    color: "#E4E4E7",
    fontSize: 13,
    fontWeight: "500",
    marginRight: 10,
  },
  authLink: {
    color: "#A855F7",
    fontSize: 13,
    fontWeight: "700",
  },
  tabsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  chipActive: {
    backgroundColor: "#7F00FF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipInactive: {
    backgroundColor: "#262626",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipTextActive: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  chipTextInactive: {
    color: "#9A9A9A",
    fontSize: 13,
    fontWeight: "600",
  },
  searchButton: {
    marginLeft: "auto",
    padding: 6,
  },
  searchIcon: {
    fontSize: 18,
    color: "#E4E4E7",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#E4E4E7",
    marginBottom: 14,
  },
  listWrapper: {
    minHeight: 210,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 14,
  },
  emptyText: {
    color: "#9A9A9A",
    fontSize: 14,
    textAlign: "center",
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