import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ListItemView from '../components/listItemView';
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  FontAwesome,
  MaterialCommunityIcons
} from '@expo/vector-icons';

import { badgeColor } from '../styles/colors';
import { List, ListItem } from 'react-native-elements';
import getData from '../config/fetchData';

export default class DeckView extends React.Component {
  state = { quizCards: [], cardSize: [] };

  componentDidMount() {
    const list = getData.getDecks();

    let cardSize = getData.getDeckSize(size => {
      list.then(quizCards => {
        let filteredKeys = getData.removeNotificationSync(quizCards);
        this.setState({ quizCards: filteredKeys, cardSize: size });
      });
    });
  }
  onNavigate = quizName => {
    const cardObj = getData.getDeck(quizName);
    this.props.navigation.navigate('CardOptions', quizName);
  };
  quizCardSize = quizName => {
    const cardSize = getData.getDeckSize(quizName);

    return cardSize;
  };
  render() {
    console.log(this.state.quizCards);
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.container}>
          {this.state.quizCards.map((quizName, index) => (
            <ListItemView
              key={index}
              listName={quizName}
              quizSize={this.state.cardSize[index]}
              onPress={() =>
                this.onNavigate([quizName, this.state.cardSize[index]])
              }
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B5DBFC',
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
