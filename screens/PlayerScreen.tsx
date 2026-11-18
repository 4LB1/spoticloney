import { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button } from "../components/Button";
import { ErrorView } from "../components/ErrorView";
import { useAuth } from "../contexts/AuthContext";
import { useFetch } from "../hooks/useFetch";
import { imageUrl, postJson } from "../api/client";
import type { Like, NewLike, Track } from "../api/types";
import type { RootStackParamList } from "../App";

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

type Props = NativeStackScreenProps<RootStackParamList, "Player">;

export function PlayerScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const { user } = useAuth();
  const { data: track, loading, error, reload } = useFetch<Track>(
    `/tracks/${id}`
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatCount, setRepeatCount] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [likeResult, setLikeResult] = useState<Like | null>(null);
  const [likeError, setLikeError] = useState<string | null>(null);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#7F00FF" />
          <Text style={styles.hint}>Загружаем трек…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !track) {
    const message = error ?? "Трек не найден";
    return (
      <SafeAreaView style={styles.safeArea}>
        <ErrorView message={message} onRetry={reload} />
      </SafeAreaView>
    );
  }

  function decrease() {
    setRepeatCount((prev) => Math.max(1, prev - 1));
  }

  function increase() {
    setRepeatCount((prev) => Math.min(10, prev + 1));
  }

  async function handleAddToLikes() {
    setSubmitting(true);
    setLikeError(null);
    try {
      const newLike: NewLike = {
        trackId: id,
        user: user ?? "гость",
      };
      const created = await postJson<Like>("/likes", newLike);
      setLikeResult(created);
    } catch (e) {
      setLikeError(
        e instanceof Error ? e.message : "Не удалось добавить в «Любимые»"
      );
    } finally {
      setSubmitting(false);
    }
  }

  const totalSeconds = track.durationSec * repeatCount;
  const formattedTotalTime = formatDuration(totalSeconds);
  const formattedTrackTime = formatDuration(track.durationSec);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: imageUrl(track.imageUrl) }} style={styles.cover} />

        <View style={styles.trackMeta}>
          <Text style={styles.trackTitle}>{track.title}</Text>
          <Text style={styles.trackAuthor}>
            {track.author} · {track.genre}
          </Text>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
            <View style={styles.progressThumb} />
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>0:00</Text>
            <Text style={styles.timeText}>{formattedTrackTime}</Text>
          </View>
        </View>

        <View style={styles.controlsRow}>
          <Pressable style={styles.skipButton}>
            <Text style={styles.skipText}>|◀</Text>
          </Pressable>

          <Pressable
            style={styles.playButton}
            onPress={() => setIsPlaying((prev) => !prev)}
          >
            <Text style={styles.playButtonText}>{isPlaying ? "⏸" : "▶"}</Text>
          </Pressable>

          <Pressable style={styles.skipButton}>
            <Text style={styles.skipText}>▶|</Text>
          </Pressable>
        </View>

        {/* Главное действие варианта 4: POST /api/likes */}
        <View style={styles.likeActionBox}>
          <Button
            variant="primary"
            onPress={handleAddToLikes}
            disabled={submitting}
          >
            {submitting ? "Добавляем…" : "Добавить в «Любимые»"}
          </Button>

          {likeResult ? (
            <Text style={styles.successText}>
              Трек «{likeResult.trackTitle}» добавлен в «Любимые» (№{" "}
              {likeResult.id})
            </Text>
          ) : null}

          {likeError ? (
            <Text style={styles.errorText}>{likeError}</Text>
          ) : null}

          <View style={styles.historyLinkWrap}>
            <Button
              variant="secondary"
              onPress={() => navigation.navigate("Likes")}
            >
              Открыть «Любимые»
            </Button>
          </View>
        </View>

        {/* Карточка очереди повторов + статус пользователя */}
        <View style={styles.queueCard}>
          <Text style={styles.counterLabel}>Повторов в очереди</Text>

          <View style={styles.counterRow}>
            <Pressable
              onPress={decrease}
              disabled={repeatCount === 1}
              style={[
                styles.counterButton,
                repeatCount === 1 && styles.counterButtonDisabled,
              ]}
            >
              <Text style={styles.counterButtonText}>−</Text>
            </Pressable>

            <Text style={styles.counterValue}>{repeatCount}</Text>

            <Pressable
              onPress={increase}
              disabled={repeatCount === 10}
              style={[
                styles.counterButton,
                repeatCount === 10 && styles.counterButtonDisabled,
              ]}
            >
              <Text style={styles.counterButtonText}>+</Text>
            </Pressable>
          </View>

          <Text style={styles.totalTime}>
            Общее время: {formattedTotalTime}
          </Text>

          {repeatCount > 1 && (
            <Text style={styles.repeatHint}>
              Режим повтора активен ({repeatCount}× подряд)
            </Text>
          )}

          <View style={styles.divider} />

          {user ? (
            <Text style={styles.ownerBadge}>Очередь слушателя: {user}</Text>
          ) : (
            <View style={styles.guestRow}>
              <Text style={styles.guestText}>Гостевая очередь</Text>
              <Pressable
                onPress={() => navigation.navigate("Login")}
                hitSlop={8}
              >
                <Text style={styles.loginLink}>Войти</Text>
              </Pressable>
            </View>
          )}

          {repeatCount > 1 && (
            <View style={styles.resetButtonWrap}>
              <Button variant="secondary" onPress={() => setRepeatCount(1)}>
                Сбросить повторы
              </Button>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#171717",
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
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  cover: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    marginBottom: 20,
    backgroundColor: "#262626",
  },
  trackMeta: {
    marginBottom: 18,
  },
  trackTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#E4E4E7",
    marginBottom: 4,
  },
  trackAuthor: {
    fontSize: 15,
    color: "#9A9A9A",
  },
  progressSection: {
    marginBottom: 20,
  },
  progressTrack: {
    height: 4,
    backgroundColor: "#525252",
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  progressFill: {
    width: "40%",
    height: 4,
    backgroundColor: "#7F00FF",
    borderRadius: 2,
  },
  progressThumb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E4E4E7",
    marginLeft: -6,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 12,
    color: "#9A9A9A",
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 28,
    marginBottom: 24,
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    color: "#E4E4E7",
    fontSize: 18,
    fontWeight: "700",
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E4E4E7",
    alignItems: "center",
    justifyContent: "center",
  },
  playButtonText: {
    color: "#171717",
    fontSize: 22,
    fontWeight: "700",
  },
  likeActionBox: {
    marginBottom: 20,
  },
  successText: {
    color: "#34D399",
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "600",
  },
  errorText: {
    color: "#F87171",
    fontSize: 13,
    textAlign: "center",
    marginTop: 10,
    fontWeight: "600",
  },
  historyLinkWrap: {
    marginTop: 10,
  },
  queueCard: {
    backgroundColor: "#262626",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  counterLabel: {
    fontSize: 14,
    color: "#9A9A9A",
    marginBottom: 12,
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    marginBottom: 12,
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#7F00FF",
    alignItems: "center",
    justifyContent: "center",
  },
  counterButtonDisabled: {
    backgroundColor: "#525252",
    opacity: 0.5,
  },
  counterButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "700",
  },
  counterValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#E4E4E7",
    minWidth: 28,
    textAlign: "center",
  },
  totalTime: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E4E4E7",
  },
  repeatHint: {
    marginTop: 6,
    fontSize: 12,
    color: "#A855F7",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#3F3F46",
    marginVertical: 12,
  },
  ownerBadge: {
    fontSize: 13,
    color: "#A855F7",
    fontWeight: "600",
    textAlign: "center",
  },
  guestRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  guestText: {
    fontSize: 13,
    color: "#9A9A9A",
  },
  loginLink: {
    fontSize: 13,
    color: "#A855F7",
    fontWeight: "700",
  },
  resetButtonWrap: {
    width: "100%",
    marginTop: 12,
  },
});