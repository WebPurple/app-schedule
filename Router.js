import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { CalendarFeed } from './src/screen/CalendarFeed/CalendarFeed';

export const Router = createStackNavigator(
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
