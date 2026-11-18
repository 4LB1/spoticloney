import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ErrorView } from "../components/ErrorView";
import { useAuth } from "../contexts/AuthContext";
import { useFetch } from "../hooks/useFetch";
import type { Like } from "../api/types";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Likes">;

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function LikesScreen({ navigation }: Props) {
  const { user } = useAuth();
  const encodedUser = encodeURIComponent(user ?? "гость");
  const {
    data: likes,
    loading,
    error,
    reload,
  } = useFetch<Like[]>(`/likes?user=${encodedUser}`);

  if (loading && !likes) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#7F00FF" />
          <Text style={styles.hint}>Загружаем «Любимые»…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ErrorView message={error} onRetry={reload} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.list}
        data={likes ?? []}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() => navigation.navigate("Player", { id: item.trackId })}
          >
            <View style={styles.info}>
              <Text style={styles.name}>
                № {item.id} · {item.trackTitle}
              </Text>
              <Text style={styles.author}>
                {item.trackAuthor} ·{" "}
                {new Date(item.createdAt).toLocaleTimeString("ru-RU")}
              </Text>
            </View>
            <Text style={styles.duration}>
              {formatDuration(item.durationSec)}
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.hint}>В «Любимых» пока нет треков</Text>
        }
      />
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
  list: {
    padding: 16,
    gap: 12,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#262626",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    color: "#E4E4E7",
  },
  author: {
    fontSize: 13,
    color: "#9A9A9A",
    marginTop: 2,
  },
  duration: {
    fontSize: 13,
    fontWeight: "700",
    color: "#A855F7",
  },
  hint: {
    fontSize: 14,
    color: "#9A9A9A",
    textAlign: "center",
  },
});