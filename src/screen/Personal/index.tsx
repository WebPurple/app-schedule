import React from 'react';
import { withNavigation, NavigationInjectedProps, NavigationBottomTabScreenOptions } from 'react-navigation';
import { IEvent } from '../../types/Event.type';
import { Wrapper, HeaderWrapper, UserImage, UserPhoto, UserName, UserGroup, ContentWrapper } from './atoms';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getColor } from '../../styles/theme';
import { userInfo } from '../../data/index'
import { Tabs } from './components/Tabs/Tabs';

type Props = { event: IEvent };

class PersonalScreen extends React.Component<Props & NavigationInjectedProps> {
    static navigationOptions: NavigationBottomTabScreenOptions = {
        title: 'Personal',
        tabBarIcon: <Icon size={24} color={getColor('grape')} name="user" />
    };

    render() {
        return (
            <Wrapper>
                <HeaderWrapper>
                    <UserImage>
                        <UserPhoto source={userInfo.photo} />
                    </UserImage>
                    <UserName>{userInfo.name} {userInfo.surname}</UserName>
                    <UserGroup>Group: {userInfo.group}</UserGroup>
                </HeaderWrapper>
                <ContentWrapper>
                    <Tabs />
                </ContentWrapper>
            </Wrapper>
        )
    }
}

export default withNavigation(PersonalScreen) as React.ComponentType<Props>;