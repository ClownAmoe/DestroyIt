import { ImageBackground, View, Image } from "react-native";
import { StartScreenProps } from "./StartScreen";
import { styles } from "./styles";

export default function GameScreen({ func }: StartScreenProps) {
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

          <Image
            source={require("../assets/player.png")}
            resizeMode="contain"
            style={styles.player}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
