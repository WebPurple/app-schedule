import React from 'react';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { View, ScrollView } from 'react-native';
import { IEvent } from '../../types/Event.type';
import { BackgroundImage } from '../../components/BackgroundImage/BackgroundImage';
import Icon from 'react-native-vector-icons/FontAwesome';

import { HeaderContent, HeaderWrapper, LogoImg, HeaderTitle, MenuWrapper, MenuItem, MenuIco, MenuItemText } from './atoms'

type Props = { event: IEvent };

class SideMenu extends React.Component<Props & NavigationInjectedProps> {
    navigateToScreen = (route: string) => this.props.navigation.navigate(route)
    render() {
        return (
            <View>
                <ScrollView>
                    <View>
                        <HeaderWrapper>
                            <BackgroundImage>
                                <HeaderContent>
                                    <LogoImg source={require('../../../assets/logo.png')} />
                                    <HeaderTitle>MENU</HeaderTitle>
                                </HeaderContent>
                            </BackgroundImage>
                        </HeaderWrapper>
                        <MenuWrapper>
                            <MenuItem>
                                <MenuIco>
                                    <Icon size={24} color={'#e62270'} name={'calendar'}/>
                                </MenuIco>
                                <MenuItemText onPress={() => {this.navigateToScreen('Home')}}>
                                    Schedule
                                </MenuItemText>
                            </MenuItem>
                            <MenuItem>
                                <MenuIco>
                                    <Icon size={24} color={'#e62270'} name={'user'}/>
                                </MenuIco>
                                <MenuItemText onPress={() => {this.navigateToScreen('Personal')}}>
                                    Personal
                                </MenuItemText>
                            </MenuItem>
                        </MenuWrapper>
                    </View>
                </ScrollView>
            </View>
        );
    }
};

export default withNavigation(SideMenu) as React.ComponentType<Props>;