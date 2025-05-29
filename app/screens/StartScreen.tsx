import { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Image,
  View,
  Text,
  Animated,
  Easing,
} from "react-native";
function StartScreen() {
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

        <Text style={styles.txt}>Press To Play</Text>
        <Text style={styles.txt}>Choose Player</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgImg: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  darker: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 10,
  },
  tree: {
    height: "75%",
    width: "35%",
    borderRadius: 10,
  },
  player: {
    width: "25%",
    height: "20%",
    bottom: "20%",
    right: "10%",
    position: "absolute",
  },
  content: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    position: "relative",
    opacity: 0.85,
  },
  txt: {
    fontSize: 40,
    color: "#fff",
    paddingBottom: 20,
  },
  txtCont: {
    width: "100%",
    height: "100%",
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  name: {
    fontSize: 60,
    color: "#fff",
    top: "-20%",
    zIndex: 20,
    opacity: 1,
    textAlign: "center",
  },
});

export default StartScreen;
