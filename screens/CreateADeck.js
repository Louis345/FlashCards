import React from "React";
import { View, Text, StyleSheet } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import fetchData from "../config/fetchData";
export default class CreateADeck extends React.Component {
  state = {
    title: ""
  };
  setTitle = e => {
    let status = fetchData.saveDeckTitle(this.state.title, response => {
      response && this.setState({ title: "" });
      alert("Title saved");
      this.props.navigation.navigate("DeckView");
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <FormLabel>Create a List</FormLabel>
        <FormInput
          containerStyle={{ marginBottom: 45 }}
          inputStyle={{ color: "#fff" }}
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        />
        <Button
          icon={{ name: "cached" }}
          onPress={() => {
            this.setTitle();
          }}
          title="Create A deck"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#B5DBFC"
  }
});
