import { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Text,
  Animated,
  Easing,
  Pressable,
} from "react-native";
import { styles } from "./styles";
export type StartScreenProps = {
  func: (scene: "start" | "game" | "endGame") => void;
};

export default function StartScreen({ func }: StartScreenProps) {
  const playerPositionX = useRef(new Animated.Value(0)).current;
  const playerPositionY = useRef(new Animated.Value(0)).current;
  const playerLeft = require("../assets/player.png");
  const playerRight = require("../assets/player1.png");
  const [img, setImg] = useState(playerLeft);
  const moveLeft = Animated.timing(playerPositionX, {
    toValue: -250,
    duration: 3000,
    useNativeDriver: true,
    easing: Easing.linear,
  });
  const moveUp = Animated.timing(playerPositionY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
    easing: Easing.linear,
  });
  const moveRight = Animated.timing(playerPositionX, {
    toValue: 0,
    duration: 3000,
    useNativeDriver: true,
    easing: Easing.linear,
  });
  const moveDown = Animated.timing(playerPositionY, {
    toValue: 50,
    duration: 300,
    useNativeDriver: true,
    easing: Easing.linear,
  });
  useEffect(() => {
    const pos = playerPositionY.addListener(({ value }) => {
      if (value > 0) {
        setImg(playerLeft);
      } else {
        setImg(playerRight);
      }
    });
    Animated.loop(
      Animated.sequence([moveDown, moveLeft, moveUp, moveRight])
    ).start();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.bgImg}
    >
      <View style={styles.darker}>
        <View style={styles.content}>
          <Image
            source={require("../assets/tree.png")}
            style={styles.tree}
            resizeMode="cover"
          ></Image>

          <Animated.Image
            source={img}
            style={[
              styles.player,
              {
                transform: [
                  { translateX: playerPositionX },
                  { translateY: playerPositionY },
                ],
              },
            ]}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.txtCont}>
        <Text style={styles.name}>Destroy It</Text>

        <Pressable style={styles.txt} onPress={() => func("game")}>
          Press To Play
        </Pressable>
        <Text style={styles.txt}>Choose Player</Text>
      </View>
    </ImageBackground>
  );
}
