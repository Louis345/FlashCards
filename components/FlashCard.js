import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  FontAwesome
} from "@expo/vector-icons";
const FlashCard = () => {
  return (
    <View style={styles.container}>

      <View style={styles.iconContainer}>
        <Text style={{ textAlign: "center", justifyContent: "center" }}>
          hi
        </Text>
        <Entypo
          name={"reply"}
          style={[styles.iconStyle]}
          onPress={() => console.log("test")}
        />
        <MaterialIcons
          name={"cancel"}
          style={[styles.iconStyle]}
          onPress={() => console.log("test")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 100,
    width: 300,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#ddd",
    borderBottomWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  textStyle: {},
  iconContainer: {},
  iconStyle: {
    alignItems: "flex-end"
  }
});

export default FlashCard;
