import React from "react";
import { View, Text } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import fetchData from "../config/fetchData";
export default class CreateQuiz extends React.Component {
  state = {
    question: "",
    answer: ""
  };
  onNavigate = () => {
    this.props.navigation.navigate("DeckView");
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
      <View>
        <FormLabel>Create A Card</FormLabel>
        <FormInput
          placeholder="Enter the Question"
          onChangeText={question => this.setState({ question })}
          value={this.state.question}
        />
        <FormInput
          placeholder="The answer"
          onChangeText={answer => this.setState({ answer })}
          value={this.state.answer}
        />
        <Button
          iconRight
          icon={{ name: "code" }}
          title="LARGE WITH RIGHT ICON"
          onPress={() => {
            this.setQuestionAnswer(() => {
              this.setState({ question: "", answer: "" });
              this.onNavigate();
            });
          }}
        />
      </View>
    );
  }
}
