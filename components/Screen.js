import React, { Component } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const xOffset = new Animated.Value(0);

const Card = props => (
  <View style={styles.scrollPage}>
    <Animated.View style={[styles.screen, transitionAnimation(props.index)]}>
      <Text style={styles.text}>{props.text}</Text>
    </Animated.View>
  </View>
);

const transitionAnimation = index => ({
  transform: [
    { perspective: 800 },
    {
      scale: xOffset.interpolate({
        inputRange: [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        outputRange: [0.25, 1, 0.25],
      }),
    },
    {
      rotateX: xOffset.interpolate({
        inputRange: [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        outputRange: ['45deg', '0deg', '45deg'],
      }),
    },
    {
      rotateY: xOffset.interpolate({
        inputRange: [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        outputRange: ['-45deg', '0deg', '45deg'],
      }),
    },
  ],
});

export default class Screen extends Component {
  render() {
    return (
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: xOffset } } }], {
          useNativeDriver: true,
        })}
        horizontal
        pagingEnabled
        style={styles.scrollView}
      >
        <Card text="Card 1" index={0} />
        <Card text="Card 2" index={1} />
        <Card text="Screen 3" index={2} />
        <Card text="Screen 4" index={3} />
      </Animated.ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'row',
    backgroundColor: '#00d4ff',
  },
  scrollPage: {
    width: SCREEN_WIDTH,
    padding: 20,
  },
  screen: {
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 45,
    fontWeight: 'bold',
  },
});
