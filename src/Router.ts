import {
    createBottomTabNavigator,
    DrawerNavigator
} from 'react-navigation';
import { CalendarFeed } from './screen/CalendarFeed/CalendarFeed';
import { EventScreen } from './screen/Event';
import PersonalScreen from './screen/Personal';
import SideMenu from './components/SideMenu/SideMenu'

const MainStack = createBottomTabNavigator(
    {
        Home: CalendarFeed,
        Personal: PersonalScreen
    },
    {
        initialRouteName: 'Home',
    },
);

export default DrawerNavigator({
    Home: {
      screen: MainStack,
    },
    Personal: {
        screen: PersonalScreen
    },
    Event: {
        screen: EventScreen,
    }
}, {
    contentComponent: SideMenu,
    drawerWidth: 250
});
