import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import { MiniPlayer } from "../components/MiniPlayer";
import { ErrorView } from "../components/ErrorView";
import { useFetch } from "../hooks/useFetch";
import { imageUrl } from "../api/client";
import type { Track } from "../api/types";

type Props = NativeStackScreenProps<RootStackParamList, "Search">;

const categories = [
  { id: "c1", title: "Чарты", color: "#00B368" },
  { id: "c2", title: "Новинки", color: "#EF4444" },
  { id: "c3", title: "Подкасты", color: "#7F00FF" },
  { id: "c4", title: "Для тренировок", color: "#00B368" },
  { id: "c5", title: "В дорогу", color: "#00B368" },
  { id: "c6", title: "Вечеринка", color: "#EF4444" },
  { id: "c7", title: "Хиты 2000-х", color: "#EF4444" },
  { id: "c8", title: "Релакс", color: "#7F00FF" },
];

const genres = [
  { id: "g1", title: "Рок" },
  { id: "g2", title: "Электроника" },
  { id: "g3", title: "Альтернатива" },
  { id: "g4", title: "Инди" },
];

export function SearchScreen({ navigation }: Props) {
  const [query, setQuery] = useState("");
  const search = encodeURIComponent(query.trim());
  const {
    data: tracks,
    loading,
    error,
    reload,
  } = useFetch<Track[]>(`/tracks?search=${search}`);

  const results = tracks ?? [];
  const currentTrack = results[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Pressable
            style={styles.homeButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.homeIcon}>⌂</Text>
          </Pressable>

          <View style={styles.searchBar}>
            <Text style={styles.searchBarIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              value={query}
              onChangeText={setQuery}
              placeholder="Поиск трека"
              placeholderTextColor="#71717A"
            />
          </View>
        </View>

        {loading && !tracks ? (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#7F00FF" />
          </View>
        ) : error ? (
          <ErrorView message={error} onRetry={reload} />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {query.trim().length > 0 ? (
              <>
                <Text style={styles.sectionTitle}>Результаты</Text>
                {results.length === 0 ? (
                  <Text style={styles.emptyText}>Ничего не найдено</Text>
                ) : (
                  results.map((item) => (
                    <Pressable
                      key={item.id}
                      style={styles.resultRow}
                      onPress={() =>
                        navigation.navigate("Player", { id: item.id })
                      }
                    >
                      <Text style={styles.resultTitle}>{item.title}</Text>
                      <Text style={styles.resultAuthor}>{item.author}</Text>
                    </Pressable>
                  ))
                )}
              </>
            ) : (
              <>
                <Text style={styles.sectionTitle}>Категории</Text>
                <View style={styles.grid}>
                  {categories.map((item) => (
                    <View
                      key={item.id}
                      style={[styles.gridTile, { backgroundColor: item.color }]}
                    >
                      <Text style={styles.tileText}>{item.title}</Text>
                    </View>
                  ))}
                </View>

                <Text style={styles.sectionTitle}>Жанры</Text>
                <View style={styles.grid}>
                  {genres.map((genre) => (
                    <View
                      key={genre.id}
                      style={[styles.gridTile, { backgroundColor: "#525252" }]}
                    >
                      <Text style={styles.tileText}>{genre.title}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </ScrollView>
        )}

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
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 12,
  },
  homeButton: {
    padding: 4,
  },
  homeIcon: {
    fontSize: 32,
    color: "#E4E4E7",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#9A9A9A",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
  },
  searchBarIcon: {
    fontSize: 16,
    color: "#9A9A9A",
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#E4E4E7",
    paddingVertical: 2,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#E4E4E7",
    marginTop: 20,
    marginBottom: 12,
  },
  emptyText: {
    color: "#9A9A9A",
    fontSize: 14,
  },
  resultRow: {
    backgroundColor: "#262626",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  resultTitle: {
    color: "#E4E4E7",
    fontSize: 15,
    fontWeight: "600",
  },
  resultAuthor: {
    color: "#9A9A9A",
    fontSize: 13,
    marginTop: 2,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 14,
  },
  gridTile: {
    width: "47.5%",
    height: 92,
    borderRadius: 8,
    padding: 12,
    justifyContent: "flex-end",
  },
  tileText: {
    color: "#E4E4E7",
    fontSize: 14,
    fontWeight: "600",
  },
});