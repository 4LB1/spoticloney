import { useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";

const TRACK_DURATION_SEC = 215; // 3:35

function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function PlayerScreen() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [repeatCount, setRepeatCount] = useState(1);

  function decrease() {
    setRepeatCount((prev) => Math.max(1, prev - 1));
  }

  function increase() {
    setRepeatCount((prev) => Math.min(10, prev + 1));
  }

  // Производное (derived) значение — не хранится в отдельном useState
  const totalSeconds = TRACK_DURATION_SEC * repeatCount;
  const formattedTotalTime = formatDuration(totalSeconds);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCva-w-oDVHKWpg90Rh8TUnY1_GnzxoDnlLam-8ItqcQ&s=10" }}
          style={styles.albumArt}
        />

        <View style={styles.infoBlock}>
          <Text style={styles.trackTitle}>Follow the Leader</Text>
          <Text style={styles.trackAuthor}>Korn</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
              <View style={styles.progressFill} />
              <View style={styles.progressThumb} />
            </View>
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>1:24</Text>
              <Text style={styles.timeText}>
                {formatDuration(TRACK_DURATION_SEC)}
              </Text>
            </View>
          </View>

          <View style={styles.controlsRow}>
            <Pressable style={styles.skipButton} onPress={decrease}>
              <Text style={styles.skipIcon}>|◀</Text>
            </Pressable>

            <Pressable
              style={styles.playButton}
              onPress={() => setIsPlaying((prev) => !prev)}
            >
              <Text style={styles.playIcon}>{isPlaying ? "⏸" : "▶"}</Text>
            </Pressable>

            <Pressable style={styles.skipButton} onPress={increase}>
              <Text style={styles.skipIcon}>▶|</Text>
            </Pressable>
          </View>

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
          </View>
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
  scrollContent: {
    paddingBottom: 32,
  },
  albumArt: {
    marginTop: 32,
    marginHorizontal: "auto",
    width: 400,
    height: 400,
    borderRadius: 12,
    backgroundColor: "#525252",
  },
  infoBlock: {
    paddingHorizontal: 24,
    marginTop: 28,
  },
  trackTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#E4E4E7",
  },
  trackAuthor: {
    fontSize: 16,
    color: "#9A9A9A",
    marginTop: 4,
  },
  progressContainer: {
    marginTop: 24,
  },
  progressTrack: {
    height: 4,
    backgroundColor: "#525252",
    borderRadius: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  progressFill: {
    width: "40%",
    height: 4,
    backgroundColor: "#6100C5",
    borderRadius: 2,
  },
  progressThumb: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#E4E4E7",
    marginLeft: -7,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  timeText: {
    fontSize: 12,
    color: "#9A9A9A",
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
    marginTop: 24,
  },
  skipButton: {
    padding: 10,
  },
  skipIcon: {
    fontSize: 22,
    color: "#E4E4E7",
    fontWeight: "700",
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E4E4E7",
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    fontSize: 24,
    color: "#171717",
  },
  queueCard: {
    marginTop: 28,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#222222",
    borderWidth: 1,
    borderColor: "#333333",
  },
  counterLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#9A9A9A",
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 12,
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#6100C5",
    justifyContent: "center",
    alignItems: "center",
  },
  counterButtonDisabled: {
    backgroundColor: "#3A3A3A",
  },
  counterButtonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#E4E4E7",
  },
  counterValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#E4E4E7",
    minWidth: 28,
    textAlign: "center",
  },
  totalTime: {
    fontSize: 16,
    fontWeight: "700",
    color: "#E4E4E7",
    marginTop: 14,
  },
  repeatHint: {
    fontSize: 13,
    color: "#A855F7",
    marginTop: 4,
  },
});