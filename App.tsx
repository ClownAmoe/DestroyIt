import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import StartScreen from "./app/screens/StartScreen";
import { useState } from "react";
import GameScreen from "./app/screens/gameScreen";

export default function App() {
  const [scene, setScene] = useState<"start" | "game" | "endGame">("game");
  return (
    <View style={styles.container}>
      {scene === "start" && <StartScreen func={setScene} />}
      {scene === "game" && <GameScreen func={setScene} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
