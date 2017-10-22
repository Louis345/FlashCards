import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { List, ListItem } from "react-native-elements";
import getData from "../config/fetchData";

export default class DeckView extends React.Component {
  state = { quizCards: [], cardSize: [] };
  componentDidMount() {
    let list = getData.getDecks();

    let cardSize = getData.getDeckSize(size => {
      list.then(quizCards => {
        this.setState({ quizCards, cardSize: size });
      });
    });
  }
  onNavigate = quizInfo => {
    let cardObj = getData.getDeck(quizInfo);

    this.props.navigation.navigate("CardOptions", quizInfo);
  };
  quizCardSize = quizName => {
    let cardObj = getData.getDeckSize(quizName);
    console.log(cardObj);
    return 3;
  };
  render() {
    return (
      <View>
        <List containerStyle={{ marginBottom: 20 }}>
          {this.state.quizCards.map((quizName, index) =>
            <ListItem
              roundAvatar
              key={index}
              title={quizName}
              badge={{
                value: this.state.cardSize[index],
                textStyle: { color: "orange" },
                containerStyle: { marginTop: 3 }
              }}
              onPressRightIcon={() =>
                this.onNavigate([quizName, this.state.cardSize[index]])}
            />
          )}
        </List>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B5DBFC",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    height: 400,
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center"
  }
});
