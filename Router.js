import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { CalendarFeed } from './src/screen/CalendarFeed/CalendarFeed';
import { EventScreen } from './src/screen/Event';

const MainStack = createStackNavigator(
  {
    Home: CalendarFeed,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#e62270',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontFamily: 'Rubik',
      },
    },
  }
);

export const Router = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    Event: {
      screen: EventScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);
