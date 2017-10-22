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
import { Card, Button } from "react-native-elements";
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  FontAwesome
} from "@expo/vector-icons";
import fetchData from "../config/fetchData";

export default class Cards extends React.Component {
  componentDidMount() {
    let quizCards = fetchData.getDeck(this.props.navigation.state.params[0]);
    quizCards.then(card => {
      let quizData = JSON.parse(card);

      this.setState({ data: quizData.question });
    });
  }
  componentWillMount() {
    this.animatedValue = new Animated.ValueXY(0, 0);
    this.hideText = new Animated.Value(0);
    this.showText = new Animated.Value(1);
  }
  showAnswer = () => {
    if (this.state.showAnswer) {
      Animated.timing(this.showText, {
        toValue: 0,
        duration: 1000
      }).start(() => {
        this.setState({ showAnswer: false });
      });
    } else {
      Animated.timing(this.hideText, {
        toValue: 0
      }).start(() => {
        this.setState({
          showAnswer: !this.state.showAnswer
        });
        Animated.timing(this.showText, {
          toValue: 1,
          duration: 1000
        }).start();
      });
    }
  };

  state = {
    index: 0,
    data: [],
    showAnswer: true,
    quizTracker: 1,
    right: 0,
    wrong: 0
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
            <View style={styles.card1}>
              <Animated.View style={[this.animatedValue.getLayout()]}>
                <Card>
                  <View style={styles.cardStyle}>
                    {this.state.showAnswer
                      ? <Animated.Text style={styles.cardTextStyle}>
                          {cards.question}
                        </Animated.Text>
                      : <Animated.Text style={styles.cardTextStyle}>
                          {cards.answer}
                        </Animated.Text>}
                  </View>

                </Card>
              </Animated.View>
            </View>
          );
        }
        return (
          <View style={styles.card1}>

            <Card>
              <View style={styles.answer}>
                <Text
                  text={{
                    fontSize: 19,
                    padding: 20,
                    fontFamily: "American Typewriter"
                  }}
                >
                  {cards.question}
                </Text>
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
    let { width, height } = Dimensions.get("window");
    if (this.state.quizTracker > params[1]) {
      return (
        <View style={styles.cardStyle}>
          <Text style={{ color: "black" }}>
            {`You got ${this.state.right} right and ${this.state.wrong}  wrong`}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.cardContainer}>
        <View style={styles.topIconContainer}>
          <Text style={{ fontSize: 20, color: "#fff" }}>{`${this.state
            .quizTracker} out of ${params[1]}`}</Text>
          <MaterialIcons
            style={[styles.iconStyle]}
            onPress={() => this.showAnswer()}
            name={"question-answer"}
          />
        </View>
        <View style={{ flex: 0.5 }}>
          {this.renderCards()}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            large
            icon={{ name: "envira", type: "font-awesome" }}
            title="I got It"
            buttonStyle={styles.buttonStyles}
            backgroundColor={"#7DE2D5"}
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
            icon={{ name: "envira", type: "font-awesome" }}
            title="I don't know"
            buttonStyle={styles.buttonStyles}
            backgroundColor={"#7DE2D5"}
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
    backgroundColor: "#fff"
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "#B5DBFC"
  },
  cardStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  cardTextStyle: {
    fontSize: 19,
    padding: 20,
    fontFamily: "American Typewriter"
  },
  card1: {
    position: "absolute",
    left: 15,
    right: 15,
    top: 24,
    zIndex: 25
  },
  card2: {
    position: "absolute",
    top: 12,
    left: 9,
    right: 9,
    zIndex: 30
  },
  card3: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 40
  },
  topIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
    flex: 0.25
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 0.25
  },
  button: {
    marginTop: 10,
    backgroundColor: "red"
  },
  buttonStyle: {
    borderRadius: 50
  },
  iconStyle: {
    fontSize: 30,
    color: "#fff"
  }
});
