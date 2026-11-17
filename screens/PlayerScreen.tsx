import {
  View,
  Text,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Player">;

export function PlayerScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Обложка трека */}

        <Image
          source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCva-w-oDVHKWpg90Rh8TUnY1_GnzxoDnlLam-8ItqcQ&s=10"}}
          style={styles.albumArt}
        />

        {/* Название и автор */}
        <View style={styles.trackMeta}>
          <Text style={styles.trackTitle}>Название</Text>
          <Text style={styles.trackAuthor}>Автор</Text>
        </View>

        {/* Полоса прогресса на Flexbox */}
        <View style={styles.progressContainer}>
          <View style={styles.progressFilled} />
          <View style={styles.progressThumb} />
          <View style={styles.progressEmpty} />
        </View>

        {/* Кнопки управления воспроизведением */}
        <View style={styles.controlsRow}>
          <Pressable>
            <Text style={styles.skipIcon}>⏮</Text>
          </Pressable>

          <Pressable style={styles.playCircle}>
            <Text style={styles.playTriangle}>▶</Text>
          </Pressable>

          <Pressable>
            <Text style={styles.skipIcon}>⏭</Text>
          </Pressable>
        </View>
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
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 4,
  },
  backIcon: {
    fontSize: 32,
    color: "#E4E4E7",
    fontWeight: "700",
  },
  albumArt: {
    marginTop: 32,
    marginHorizontal: 'auto',
    width: 400,
    height: 400,
    borderRadius: 12,
    backgroundColor: "#525252",
  },
  trackMeta: {
    marginTop: 12,
  },
  trackTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#E4E4E7",
  },
  trackAuthor: {
    fontSize: 15,
    color: "#E4E4E7",
    marginTop: 4,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  progressFilled: {
    flex: 6,
    height: 4,
    backgroundColor: "#7F00FF",
    borderRadius: 2,
  },
  progressThumb: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#E4E4E7",
  },
  progressEmpty: {
    flex: 4,
    height: 4,
    backgroundColor: "#525252",
    borderRadius: 2,
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 44,
    marginBottom: 16,
  },
  skipIcon: {
    fontSize: 28,
    color: "#E4E4E7",
  },
  playCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#E4E4E7",
    justifyContent: "center",
    alignItems: "center",
  },
  playTriangle: {
    fontSize: 26,
    color: "#171717",
    marginLeft: 4,
  },
});