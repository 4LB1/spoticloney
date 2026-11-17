import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import { TrackCard } from "../components/TrackCard";
import { MiniPlayer } from "../components/MiniPlayer";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

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

export function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Верхняя панель навигации и фильтров */}
        <View style={styles.topBar}>
          <View style={styles.leftControls}>
            <Pressable
              style={styles.avatarButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.avatarIcon}>👤</Text>
            </Pressable>

            <View style={styles.chipActive}>
              <Text style={styles.chipTextActive}>All</Text>
            </View>

            <View style={styles.chipInactive}>
              <Text style={styles.chipTextInactive}>Music</Text>
            </View>
          </View>

          <Pressable
            style={styles.searchButton}
            onPress={() => navigation.navigate("Search")}
          >
            <Text style={styles.searchIcon}>🔍</Text>
          </Pressable>
        </View>

        {/* Основной контент со списком через map */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Рекоммендации</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          >
            {recommendedTracks.map((track) => (
              <Pressable
                key={track.id}
                onPress={() => navigation.navigate("Player")}
              >
                <TrackCard
                  title={track.title}
                  author={track.author}
                  imageUrl={track.imageUrl}
                />
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Нижний мини-плеер */}
        <MiniPlayer
          title="Follow the leader"
          author="Korn"
          imageUrl=""
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
});