import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  Dimensions
} from "react-native";

import {
  Ionicons,
  MaterialIcons,
  Entypo,
  FontAwesome
} from "@expo/vector-icons";

import pass from "../assets/emoji_shock.json";
import fail from "../assets/empty_list.json";
import { Button } from "react-native-elements";
import Animation from "lottie-react-native";

export default class FlashCard extends React.Component {
  componentDidMount() {
    this.animation.play();
  }
  render() {
    const { wrong, right, length } = this.props;
    const percentage = right / length * 100;
    return (
      <View style={styles.container}>

        <View style={styles.iconContainer}>
          <View style={styles.scoreCardContainer}>
            <Text style={styles.scoreText}>Right</Text>
            <Text style={styles.scoreText}>Wrong</Text>
            <Text style={styles.scoreText}>Percentage</Text>
          </View>
          <View style={styles.scoreCardContainer}>
            <Text style={styles.scoreText}>{right}</Text>
            <Text style={styles.scoreText}>{wrong}</Text>
            <Text style={styles.scoreText}>%{percentage}</Text>
          </View>
          <Animation
            ref={animation => {
              this.animation = animation;
            }}
            style={{
              width: 180,
              height: 180,
              marginLeft: 35,
              marginRight: 50,
              marginTop: 0
            }}
            loop={true}
            source={percentage > 60 ? pass : fail}
          />

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FCB652",
    height: 400,
    width: 320,
    borderWidth: 1,
    borderColor: "#FCB652",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    shadowOffset: { width: 5, height: 20 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 10
  },
  scoreCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    padding: 0
  },
  scoreText: {
    color: "#fff",
    marginRight: 5,
    fontSize: 20,
    paddingLeft: 5,
    paddingRight: 5
  },
  buttonStyle: {
    marginBottom: 10
  }
});
