import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import fetchData from "../config/fetchData";
export default class CreateQuiz extends React.Component {
  state = {
    question: "",
    answer: ""
  };
  onNavigate = () => {
    const flashcardInfo = { ...this.props.navigation.state.params };
    flashcardInfo[1]++;

    this.props.navigation.navigate("CardOptions", flashcardInfo);
  };
  setQuestionAnswer = callback => {
    let response = fetchData.addCardToDeck(
      this.props.navigation.state.params[0],
      {
        question: this.state.question,
        answer: this.state.answer
      }
    );
    callback();
  };
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 25
          }}
        >
          Create A Flash Card
        </Text>
        <FormInput
          placeholder="Enter the Question"
          onChangeText={question => this.setState({ question })}
          value={this.state.question}
          autoComplete={false}
          autoCorrect={false}
        />
        <FormInput
          placeholder="The answer"
          onChangeText={answer => this.setState({ answer })}
          value={this.state.answer}
          autoComplete={false}
          autoCorrect={false}
        />
        <Button
          title="Submit"
          buttonStyle={{ backgroundColor: "#fcd6b6", borderRadius: 10 }}
          onPress={() => {
            if (
              this.state.question.length === 0 ||
              this.state.answer.length === 0
            ) {
              alert("Please Enter Valid Input");
            } else {
              this.setQuestionAnswer(() => {
                this.setState({ question: "", answer: "" });
                this.onNavigate();
              });
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#B5DBFC"
  }
});
