import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { CalendarFeedScreen, EventScreen, LoginScreen, AdditionalInfoScreen, ProfileScreen } from './screen';
import { getColor, ColorName } from './styles/theme';

import Icon from 'react-native-vector-icons/FontAwesome';

const renderIcon = (name: string, color: ColorName) => (_: { tintColor: string | null; focused: boolean }) => (
    <Icon size={24} color={getColor(color)} name={name} />
);

const MainStack = createBottomTabNavigator(
    {
        Home: {
            screen: CalendarFeedScreen,
            navigationOptions: {
                tabBarLabel: 'Schedule',
                tabBarIcon: renderIcon('calendar-o', 'grape'),
            },
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarIcon: renderIcon('user', 'grape'),
            },
        },
    },
    {
        initialRouteName: 'Home',
    },
);

export const AppNavigator = createStackNavigator(
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
    },
);

export const AuthNavigator = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
        },
        AdditionalInfo: {
            screen: AdditionalInfoScreen,
        },
    },
    {
        initialRouteName: 'Login',
        mode: 'modal',
        headerMode: 'none',
    },
);
