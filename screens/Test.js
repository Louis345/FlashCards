import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import FlashCard from "../components/FlashCard";
import anim from "../assets/emoji_shock.json";
import Animation from "lottie-react-native";
export default class Test extends React.Component {
  componentDidMount() {
    this.animation.play();
  }
  render() {
    return (
      <View
        style={{
          backgroundColor: "#F84D43",
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <FlashCard />
        <Animation
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            width: 80,
            height: 80
          }}
          loop={true}
          source={anim}
        />

      </View>
    );
  }
}
