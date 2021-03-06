import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Modal
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  FontAwesome
} from '@expo/vector-icons';
import fetchData from '../config/fetchData';
import scoreCard from '../components/scoreCard';
import ProgressBar from '../components/progressBar';
import { backgroundColor } from '../styles/colors';
import {
  clearLocalNotification,
  setLocalNotification
} from '../config/notifications';

export default class Cards extends React.Component {
  componentDidMount() {
    const quizCards = fetchData.getDeck(this.props.navigation.state.params[0]);
    quizCards.then(card => {
      const quizData = JSON.parse(card);
      this.setState({ data: quizData.question });
    });
  }
  componentWillMount() {
    this.animatedValue = new Animated.ValueXY(0, 0);
  }

  state = {
    index: 0,
    data: [],
    showAnswer: true,
    quizTracker: 1,
    right: 0,
    wrong: 0,
    progress: 0
  };

  showAnswer = () => {
    this.setState({ showAnswer: !this.state.showAnswer });
  };

  renderCards = () => {
    const animatedHideText = { opacity: this.hideText };
    const animatedShowText = { opacity: this.showText };
    const { data } = this.state;

    return data
      .map((cards, idx) => {
        if (idx < this.state.index) {
          return null;
        }

        if (idx === this.state.index) {
          return (
            <View key={idx} style={styles.card1}>
              <ProgressBar progress={this.state.progress} />
              <Animated.View style={[this.animatedValue.getLayout()]}>
                <Card onPress={() => this.showAnswer()}>
                  <TouchableOpacity
                    onPress={() => this.showAnswer()}
                    style={styles.cardStyle}
                  >
                    {this.state.showAnswer ? (
                      <Text style={styles.cardTextStyle}>{cards.question}</Text>
                    ) : (
                      <Text style={styles.cardTextStyle}>{cards.answer}</Text>
                    )}
                  </TouchableOpacity>
                </Card>
              </Animated.View>
            </View>
          );
        }
        return (
          <View key={idx} style={styles.card1}>
            <Card>
              <View style={styles.cardStyle}>
                <Text style={styles.cardTextStyle}>{cards.question}</Text>
              </View>
            </Card>
          </View>
        );
      })
      .reverse();
  };
  nextCard = () => {
    Animated.spring(this.animatedValue, {
      toValue: { x: 500, y: 0 }
    }).start(() => {
      this.animatedValue = new Animated.ValueXY(0, 0);
      this.setState({
        index: this.state.index + 1,
        showAnswer: true
      });
    });
  };
  render() {
    const { params } = this.props.navigation.state;

    if (this.state.quizTracker > params[1]) {
      clearLocalNotification().then(setLocalNotification);
      return (
        <View style={styles.results}>
          <View
            style={{
              flex: 0.8,
              justifyContent: 'center'
            }}
          >
            <scoreCard
              length={this.state.data.length}
              right={this.state.right}
              wrong={this.state.wrong}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 0.2
            }}
          >
            <Button
              icon={{ name: 'envira', type: 'font-awesome' }}
              title="Try Again"
              buttonStyle={styles.buttonStyles}
              backgroundColor={'#fff'}
              borderRadius={10}
              onPress={() => {
                this.props.navigation.navigate(
                  'startQuiz',
                  this.props.navigation.state.params
                );
              }}
            />
            <Button
              icon={{ name: 'envira', type: 'font-awesome' }}
              title="Exit"
              buttonStyle={styles.buttonStyles}
              backgroundColor={'#fff'}
              borderRadius={10}
              onPress={() => {
                this.props.navigation.navigate('DeckView');
              }}
            />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.cardContainer}>
        <View style={styles.topIconContainer}>
          <Text style={{ fontSize: 20, color: '#fff' }}>{`${
            this.state.quizTracker
          } out of ${params[1]}`}</Text>
          <MaterialIcons
            style={[styles.iconStyle]}
            onPress={() => this.showAnswer()}
            name={'question-answer'}
          />
        </View>
        <View style={{ flex: 0.5 }}>{this.renderCards()}</View>

        <View style={styles.buttonContainer}>
          <Button
            large
            icon={{ name: 'envira', type: 'font-awesome' }}
            title="I got It"
            buttonStyle={styles.buttonStyles}
            backgroundColor={'#7DE2D5'}
            borderRadius={10}
            onPress={() => {
              this.nextCard();
              this.setState({
                quizTracker: this.state.quizTracker + 1,
                showAnswer: true,
                right: this.state.right + 1
              });
            }}
          />
          <Button
            large
            icon={{ name: 'envira', type: 'font-awesome' }}
            title="I don't know"
            buttonStyle={styles.buttonStyles}
            backgroundColor={'#7DE2D5'}
            borderRadius={10}
            onPress={() => {
              this.nextCard();
              this.setState({
                quizTracker: this.state.quizTracker + 1,
                showAnswer: true,
                wrong: this.state.wrong + 1
              });
            }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  cardContainer: {
    flex: 1,
    backgroundColor: backgroundColor
  },
  results: {
    backgroundColor: '#F84D43',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreCard: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
    borderBottomWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    width: 100,
    height: 100
  },
  cardStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardTextStyle: {
    fontSize: 19,
    padding: 20
  },
  card1: {
    position: 'absolute',
    left: 15,
    right: 15,
    top: 24,
    zIndex: 25
  },

  topIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    flex: 0.25
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.25
  },
  button: {
    marginTop: 10
  },
  buttonStyle: {
    borderRadius: 50
  },
  iconStyle: {
    fontSize: 30,
    color: '#fff'
  }
});
