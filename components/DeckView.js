import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import {
  Ionicons,
  MaterialIcons,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons
} from "@expo/vector-icons";

import { badgeColor } from "../styles/colors";
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
  };
  render() {
    return (
      <ScrollView>

        <List containerStyle={{ marginBottom: 20 }}>
          {this.state.quizCards.map((quizName, index) =>
            <ListItem
              roundAvatar
              key={index}
              title={quizName}
              badge={{
                value: this.state.cardSize[index],
                textStyle: { color: badgeColor },
                containerStyle: { marginTop: 3 }
              }}
              onPressRightIcon={() =>
                this.onNavigate([quizName, this.state.cardSize[index]])}
            />
          )}
        </List>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B5DBFC",
    alignItems: "center",
    justifyContent: "center"
  }
});
