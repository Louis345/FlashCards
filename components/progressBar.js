import React, { Component } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

class ProgressBar extends Component {
  componentWillMount() {
    this.animation = new Animated.Value(this.props.progress);
  }
  componentDidUpdate(prevProps, nextProps) {
    if (prevProps.progress !== this.props.progress) {
      Animated.timing(this.animation, {
        toValue: this.props.progress,
        duration: this.props.duration
      }).start();
    }
  }

  render() {
    console.log(this.props.progress);
    const {
      height,
      borderColor,
      borderWidth,
      borderRadius,
      barColor,
      fillColor
    } = this.props;

    const widthInterpolated = this.animation.interpolate({
      outputRange: ['0%', '100%'],
      inputRange: [0, 1],
      extrapolate: 'clamp'
    });

    return (
      <View style={{ flex: 1, flexDirection: 'row', height }}>
        <View style={{ flex: 1, borderColor, borderWidth, borderRadius }}>
          <View
            style={[StyleSheet.absoluteFill, { backgroundColor: fillColor }]}
          />
          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              backgroundColor: barColor,
              width: widthInterpolated
            }}
          />
        </View>
      </View>
    );
  }
}

ProgressBar.defaultProps = {
  height: 10,
  borderColor: '#000',
  borderWidth: 2,
  borderRadius: 4,
  barColor: 'tomato',
  fillColor: 'rgba(0,0,0,0.5)',
  duration: 100
};

export default ProgressBar;
