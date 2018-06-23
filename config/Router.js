import React from 'react';
import { StyleSheet, Button, TouchableOpacity, Text } from 'react-native';
import {
  DrawerNavigator,
  StackNavigator,
  TabNavigator
} from 'react-navigation';
import Menu from '../components/Menu';
import DeckView from '../components/DeckView';
import CardOptions from '../screens/CardOptions';
import CreateQuiz from '../screens/CreateQuiz';
import CreateADeck from '../screens/CreateADeck';
import ProgressBar from '../components/progressBar';
import QuizCard from '../components/QuizCard';
import Screen from '../components/Screen';
import SwipeCard from '../components/SwipeCard';
import { HeaderTextStyle, HeaderBackgroundColor } from '../styles/colors';
import {
  Ionicons,
  MaterialIcons,
  Entypo,
  FontAwesome,
  IOSIcon
} from '@expo/vector-icons';
const MainNavigator = StackNavigator({
  Home: {
    screen: Menu,
    navigationOptions: ({ navigation }) => ({
      title: 'Menu',
      headerTintColor: '#7DE2D5',
      headerStyle: {
        backgroundColor: HeaderBackgroundColor
      }
    }),
    header: navigation => ({
      titleStyle: {
        color: '#2C2B50',
        fontFamily: 'MuseoSansRounded-300',
        fontWeight: '300',
        textAlign: 'center',
        marginRight: 56
      },
      tintColor: '#43c2f0'
    })
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: ({ navigation }) => ({
      title: 'DeckView',
      headerTintColor: '#7DE2D5',
      headerStyle: {
        backgroundColor: '#2C2B50'
      }
    })
  },
  CardOptions: {
    screen: CardOptions,
    navigationOptions: ({ navigation }) => ({
      title: 'Card Info',
      headerTintColor: '#7DE2D5',
      headerStyle: {
        backgroundColor: HeaderBackgroundColor
      },
      headerLeft: (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('DeckView');
          }}
        >
          <Ionicons
            name={'ios-arrow-back'}
            onPress={() => {
              navigation.navigate('DeckView');
            }}
            style={{ fontSize: 30, margin: 5, color: 'blue' }}
          />
        </TouchableOpacity>
      )
    })
  },
  CreateQuiz: {
    screen: CreateQuiz,
    navigationOptions: ({ navigation }) => ({
      title: 'Create Quiz',
      headerTintColor: HeaderTextStyle,
      headerStyle: {
        backgroundColor: HeaderBackgroundColor
      }
    })
  },
  startQuiz: {
    screen: QuizCard,
    navigationOptions: ({ navigation }) => ({
      title: 'Create Quiz',
      headerTintColor: HeaderTextStyle,
      headerStyle: {
        backgroundColor: HeaderBackgroundColor
      }
    })
  }
});

const navigator = StackNavigator({
  Home: {
    screen: Menu,
    navigationOptions: ({ navigation }) => ({
      title: 'Menu',
      headerTintColor: '#7DE2D5',
      headerStyle: {
        backgroundColor: HeaderBackgroundColor
      }
    }),
    header: navigation => ({
      titleStyle: {
        color: '#2C2B50',
        fontFamily: 'MuseoSansRounded-300',
        fontWeight: '300',
        textAlign: 'center',
        marginRight: 56
      },
      tintColor: '#43c2f0'
    })
  }
});

class MyNotificationsScreen extends React.Component {
  navigationOptions = {
    tabBarLabel: 'Create New Deck',
    tabBarIcon: ({ tintColor }) => {
      <Ionicons name={'ios-create'} style={[styles.iconStyle]} />;
    }
  };

  render() {
    return <Button onPress={() => alert('pressed')} title="Go back home" />;
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  },
  iconStyle: {
    color: '#7DE2D5',
    fontSize: 30
  }
});

const bottomNavigator = TabNavigator(
  {
    Home: {
      screen: MainNavigator,
      navigationOptions: ({ navigation }) => ({
        title: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons
            name={'ios-home-outline'}
            onPress={() => navigation.navigate('Home')}
            style={[styles.iconStyle]}
          />
        )
      })
    },
    CreateADeck: {
      screen: CreateADeck,
      navigationOptions: ({ navigation }) => ({
        title: 'Create A Deck',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name={'ios-list-box-outline'} style={[styles.iconStyle]} />
        )
      })
    }
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63'
    },
    tabBarOptions: {
      style: {
        backgroundColor: '#2C2B50'
      }
    }
  }
);

export default bottomNavigator;
