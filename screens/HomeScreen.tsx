import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TrackCard } from "../components/TrackCard";
import { MiniPlayer } from "../components/MiniPlayer";
import { Button } from "../components/Button";
import { ErrorView } from "../components/ErrorView";
import { useAuth } from "../contexts/AuthContext";
import { useFetch } from "../hooks/useFetch";
import { imageUrl, postJson } from "../api/client";
import type { Like, NewLike, Track } from "../api/types";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "favorites">("all");
  const [likeError, setLikeError] = useState<string | null>(null);

  const search = encodeURIComponent(query.trim());
  const encodedUser = encodeURIComponent(user ?? "гость");

  const {
    data: tracks,
    loading,
    error,
    reload: reloadTracks,
  } = useFetch<Track[]>(`/tracks?search=${search}`);

  const { data: likes, reload: reloadLikes } = useFetch<Like[]>(
    `/likes?user=${encodedUser}`
  );

  const isFirstFocus = useRef(true);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (isFirstFocus.current) {
        isFirstFocus.current = false;
        return;
      }
      reloadLikes();
    });
    return unsubscribe;
  }, [navigation]);

  const allTracks = tracks ?? [];
  const favoriteIds = (likes ?? []).map((item) => item.trackId);
  const visibleTracks =
    activeTab === "all"
      ? allTracks
      : allTracks.filter((track) => favoriteIds.includes(track.id));

  async function handleLikeFromCard(trackId: number) {
    setLikeError(null);
    try {
      const payload: NewLike = { trackId, user: user ?? "гость" };
      await postJson<Like>("/likes", payload);
      reloadLikes();
    } catch (e) {
      setLikeError(
        e instanceof Error ? e.message : "Не удалось добавить в «Любимые»"
      );
    }
  }

  function renderContent() {
    if (loading && !tracks) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#7F00FF" />
          <Text style={styles.hint}>Загружаем треки…</Text>
        </View>
      );
    }

    if (error) {
      return (
        <ErrorView
          message={error}
          onRetry={() => {
            reloadTracks();
            reloadLikes();
          }}
        />
      );
    }

    return (
      <View style={styles.listWrapper}>
        <FlatList
          horizontal
          data={visibleTracks}
          keyExtractor={(item) => String(item.id)}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            visibleTracks.length === 0 ? styles.emptyListContainer : undefined
          }
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.navigate("Player", { id: item.id })}
            >
              <TrackCard
                title={item.title}
                author={item.author}
                imageUrl={imageUrl(item.imageUrl)}
                isFavorite={favoriteIds.includes(item.id)}
                onToggleFavorite={() => handleLikeFromCard(item.id)}
              />
            </Pressable>
          )}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>
                {activeTab === "favorites"
                  ? "В «Любимых» пока нет треков — нажмите ♡ или добавьте в плеере."
                  : "По вашему запросу ничего не найдено."}
              </Text>
              {activeTab === "favorites" && (
                <Button variant="secondary" onPress={() => setActiveTab("all")}>
                  Показать все треки
                </Button>
              )}
            </View>
          }
        />
      </View>
    );
  }

  const currentTrack = allTracks[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Панель авторизации */}
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

          {/* Поле поиска (передаёт ?search= на сервер) */}
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Поиск трека или исполнителя"
            placeholderTextColor="#6B6B7B"
          />

          {/* Вкладки + переход в Историю лайков и Поиск */}
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
                {favoriteIds.length > 0 ? ` (${favoriteIds.length})` : ""}
              </Text>
            </Pressable>

            <Pressable
              style={styles.likesLinkWrap}
              onPress={() => navigation.navigate("Likes")}
              hitSlop={8}
            >
              <Text style={styles.likesLink}>История</Text>
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

          {likeError ? <Text style={styles.likeError}>{likeError}</Text> : null}

          {renderContent()}
        </View>

        {currentTrack ? (
          <MiniPlayer
            title={currentTrack.title}
            author={currentTrack.author}
            imageUrl={imageUrl(currentTrack.imageUrl)}
            onPress={() =>
              navigation.navigate("Player", { id: currentTrack.id })
            }
          />
        ) : null}
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
    marginBottom: 14,
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
  searchInput: {
    backgroundColor: "#1E1E24",
    borderWidth: 1,
    borderColor: "#2E2E38",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: "#FFFFFF",
    marginBottom: 14,
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
  likesLinkWrap: {
    marginLeft: "auto",
    paddingHorizontal: 6,
  },
  likesLink: {
    color: "#A855F7",
    fontSize: 13,
    fontWeight: "700",
  },
  searchButton: {
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
  likeError: {
    color: "#F87171",
    fontSize: 13,
    marginBottom: 10,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  hint: {
    color: "#9A9A9A",
    fontSize: 14,
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