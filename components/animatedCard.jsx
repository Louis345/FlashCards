import React from 'react';

import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class animatedCard extends React.Component {
  transitionAnimation = index => {
    return {
      transform: [
        { perspective: 800 },
        {
          scale: xOffset.interpolate({
            inputRange: [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH
            ],
            outputRange: [0.25, 1, 0.25]
          })
        },
        {
          rotateX: xOffset.interpolate({
            inputRange: [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH
            ],
            outputRange: ['45deg', '0deg', '45deg']
          })
        },
        {
          rotateY: xOffset.interpolate({
            inputRange: [
              (index - 1) * SCREEN_WIDTH,
              index * SCREEN_WIDTH,
              (index + 1) * SCREEN_WIDTH
            ],
            outputRange: ['-45deg', '0deg', '45deg']
          })
        }
      ]
    };
  };
  render() {
    return (
      <View style={styles.scrollPage}>
        <Animated.View
          style={[styles.screen, transitionAnimation(props.index)]}
        >
          <Text style={styles.text}>{props.text}</Text>
        </Animated.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  scrollPage: {
    width: SCREEN_WIDTH,
    padding: 20
  },
  screen: {
    height: 600,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'white'
  },
  text: {
    fontSize: 45,
    fontWeight: 'bold'
  }
});
