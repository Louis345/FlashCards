import React from 'react';

import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { EvilIcons, Feather, MaterialIcons } from '@expo/vector-icons';
const SCREEN_WIDTH = Dimensions.get('window').width;
const xOffset = new Animated.Value(0);
export default class SwipeCard extends React.Component {
  renderCard = index => {
    console.log(this.props.index);
    card = 'test';
    return (
      <View style={styles.scrollPage}>
        <Animated.View
          style={[styles.screen, this.transitionAnimation(this.props.index)]}
        >
          <Text style={styles.text}>{card}</Text>
        </Animated.View>
        <View style={styles.iconStyle}>
          <TouchableOpacity>
            <EvilIcons name="check" size={80} color={'#5CAF25'} />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="cancel" size={70} color={'#b71621'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
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
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: xOffset } } }],
          { useNativeDriver: true }
        )}
        horizontal
        pagingEnabled
        style={styles.scrollView}
      >
        {this.renderCard()}
      </Animated.ScrollView>
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
    backgroundColor: 'white',
    backfaceVisibility: 'hidden'
  },
  text: {
    fontSize: 45,
    fontWeight: 'bold'
  },
  iconStyle: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
