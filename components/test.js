import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import * as Progress from 'react-native-progress';
import fetchData from '../config/fetchData';
import { backgroundColor } from '../styles/colors';
import { EvilIcons, Feather, MaterialIcons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

const xOffset = new Animated.Value(0);

export default class QuizCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      flashcards: [
        ['hi', 'konichiwa'],
        ['how are you', 'genki desu'],
        ['hi', 'konichiwa'],
        ['how are you', 'genki desu']
      ],
      progress: null,
      timer: 0,
      isWaiting: false,
      loaded: false,
      value: null
    };
  }

  componentDidMount() {
    counter = 0;
    const quizCards = fetchData.getDeck(this.props.navigation.state.params[0]);
    quizCards.then(card => {
      const quizData = JSON.parse(card);
      this.setState({ flashcards: quizData.question });
    });
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.value = 0;
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
      this.setState({ value });
    });
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    });
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 180],
      outputRange: [0, 1]
    });
  }
  flipCard() {
    if (90 <= this.value) {
      this.setState({ isWaiting: true });

      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start(() => this.setState({ isWaiting: false }));
    } else {
      this.setState({ isWaiting: true });

      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start(() => this.setState({ isWaiting: false }));
    }
  }

  renderCard() {
    let frontAnimatedStyle = {
      transform: [{ rotateY: this.frontInterpolate }]
    };
    let backAnimatedStyle = {
      transform: [{ rotateY: this.backInterpolate }]
    };

    return this.state.flashcards.map((question, index) => {
      return (
        <View key={index}>
          <TouchableOpacity onPress={() => this.flipCard()}>
            <View style={styles.scrollPage}>
              <Animated.View
                style={[
                  styles.screen,
                  frontAnimatedStyle,
                  { opacity: this.frontOpacity },
                  this.transitionAnimation(index)
                ]}
              >
                <Text style={styles.text}>{question.answer}</Text>
              </Animated.View>
              <Animated.View
                style={[
                  styles.screen,
                  styles.back,
                  backAnimatedStyle,
                  { opacity: this.backOpacity },
                  this.transitionAnimation(index)
                ]}
              >
                <Text style={styles.text}>{question.question}</Text>
              </Animated.View>
            </View>
            <View style={styles.iconStyle}>
              <TouchableOpacity>
                <EvilIcons name="check" size={80} color={'#5CAF25'} />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="cancel" size={70} color={'#b71621'} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
  }

  transitionAnimation = index => {
    if (!this.state.isWaiting)
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
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'flex-end',
            marginTop: 10
          }}
        >
          <Progress.Circle
            size={70}
            showsText
            progress={this.state.timer}
            formatText={text => {
              return (this.state.timer * 100).toFixed(0);
            }}
          />
        </View>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: xOffset } } }],
            { useNativeDriver: false }
          )}
          horizontal
          pagingEnabled
          style={styles.scrollView}
        >
          {this.state.flashcards && this.renderCard()}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  scrollView: {
    flexDirection: 'row',
    backgroundColor: backgroundColor
  },
  scrollPage: {
    width: SCREEN_WIDTH,
    padding: 20
  },
  screen: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'white',
    width: 300,
    backfaceVisibility: 'hidden'
  },
  text: {
    fontSize: 45,
    fontWeight: 'bold'
  },
  iconStyle: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 20
  }
});
