import React from "react";
import { StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import {
  DrawerNavigator,
  StackNavigator,
  TabNavigator
} from "react-navigation";
import Menu from "../components/Menu";
import DeckView from "../components/DeckView";
import CardOptions from "../screens/CardOptions";
import CreateQuiz from "../screens/CreateQuiz";
import CreateADeck from "../screens/CreateADeck";
import Cards from "../components/Cards";
import test from "../screens/Test";
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  FontAwesome,
  IOSIcon
} from "@expo/vector-icons";
const MainNavigator = StackNavigator({
  Home: {
    screen: DeckView,
    navigationOptions: ({ navigation }) => ({
      title: "menu"
    })
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: ({ navigation }) => ({
      title: "DeckView"
    })
  },
  CardOptions: {
    screen: CardOptions,
    navigationOptions: ({ navigation }) => ({
      title: "Card Info",
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DeckView");
          }}
        >
          <Ionicons
            name={"ios-arrow-back"}
            onPress={() => {
              navigation.navigate("DeckView");
            }}
            style={{ fontSize: 30, margin: 5, color: "blue" }}
          />
        </TouchableOpacity>
      )
    })
  },
  CreateQuiz: {
    screen: CreateQuiz,
    navigationOptions: ({ navigation }) => ({
      title: "create quiz"
    })
  },
  startQuiz: {
    screen: Cards,
    navigationOptions: ({ navigation }) => ({
      title: "create quiz"
    })
  }
});

class MyNotificationsScreen extends React.Component {
  navigationOptions = {
    tabBarLabel: "Create New Deck",
    tabBarIcon: ({ tintColor }) => {
      <Ionicons name={"ios-create"} style={[styles.iconStyle]} />;
    }
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate("DeckView")}
        title="Go back home"
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  },
  iconStyle: {
    color: "#7DE2D5",
    fontSize: 30
  }
});

const bottomNavigator = TabNavigator(
  {
    Home: {
      screen: MainNavigator,
      navigationOptions: ({ navigation }) => ({
        title: "Home",
        tabBarIcon: ({ tintColor }) =>
          <Ionicons
            name={"ios-home-outline"}
            onPress={() => navigation.navigate("DeckView")}
            style={[styles.iconStyle]}
          />
      })
    },
    CreateADeck: {
      screen: CreateADeck,
      navigationOptions: ({ navigation }) => ({
        title: "Create A Deck",
        tabBarIcon: ({ tintColor }) =>
          <Ionicons name={"ios-list-box-outline"} style={[styles.iconStyle]} />
      })
    }
  },
  {
    tabBarPosition: "bottom",
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: "#e91e63"
    }
  }
);

export default bottomNavigator;
