import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default class CardOptions extends React.Component {
  onNavigate = () => {
    const { navigate } = this.props.navigation;
    navigate("CreateQuiz", this.props.navigation.state.params);
  };
  render() {
    console.log(this.props);
    return (
      <View style={styles.container}>
        <View style={styles.card}>

          <Text style={styles.textStyle}>
            {this.props.navigation.state.params[0]}
          </Text>
          <MaterialCommunityIcons
            name={"account-card-details"}
            style={styles.iconStyle}
          />
          <Text style={styles.textStyle}>
            {`${this.props.navigation.state.params[1]} Cards In Deck`}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Button
            raised
            icon={{ name: "cached" }}
            onPress={this.onNavigate}
            title="Add A Card"
            style={{ backgroundColor: "#B5DBFC" }}
          />
          <Button
            raised
            icon={{ name: "cached" }}
            onPress={() =>
              this.props.navigation.navigate(
                "startQuiz",
                this.props.navigation.state.params
              )}
            title="Start Quiz"
          />
        </View>
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
    justifyContent: "center",
    shadowOffset: { width: 10, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    marginBottom: 36
  },
  iconStyle: {
    color: "#B5DBFC",
    fontSize: 100
  },
  textStyle: {
    color: "#B5DBFC",
    fontSize: 25,
    fontFamily: "sans-serif",
    fontWeight: "bold",
    margin: 2
  }
});
