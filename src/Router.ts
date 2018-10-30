import {
    createStackNavigator,
    createBottomTabNavigator,
} from 'react-navigation';
import { CalendarFeed } from './screen/CalendarFeed/CalendarFeed';
import { EventScreen } from './screen/Event';

const MainStack = createBottomTabNavigator(
    {
        Home: CalendarFeed,
    },
    {
        initialRouteName: 'Home',
    },
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
