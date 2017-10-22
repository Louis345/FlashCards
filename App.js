import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated
} from "react-native";
import Cards from "./components/Cards";
import {
  DrawerNavigator,
  StackNavigator,
  TabNavigator
} from "react-navigation";
import Router from "./config/Router";
export default class App extends React.Component {
  render() {
    return <Router />;
  }
}
