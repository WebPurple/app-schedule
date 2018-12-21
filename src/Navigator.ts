import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { CalendarFeed, EventScreen, LoginScreen, AdditionalInfoScreen, ProfileScreen } from './screen';

const MainStack = createBottomTabNavigator(
    {
        Home: CalendarFeed,
        Profile: ProfileScreen
    },
    {
        initialRouteName: 'Home'
    }
);

export const AppNavigator = createStackNavigator(
    {
        Main: {
            screen: MainStack
        },
        Event: {
            screen: EventScreen
        }
    },
    {
        mode: 'modal',
        headerMode: 'none'
    }
);

export const AuthNavigator = createStackNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        AdditionalInfo: {
            screen: AdditionalInfoScreen
        }
    },
    {
        initialRouteName: 'Login',
        mode: 'modal',
        headerMode: 'none'
    }
);
