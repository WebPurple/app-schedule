// @flow
import React from 'react';
import type { EventInfo } from '../CalendarFeed/DateInfo.type';
import { Wrapper, HeaderWrapper, Title, Description, ContentWrapper, HeaderContent } from './atoms';
import { Tabs } from './components/Tabs/Tabs';
import { BackgroundImage } from '../../components/BackgroundImage/BackgroundImage';
import { theme } from '../../styles/theme';

type Props = {
    navigation: Object,
};

export class EventScreen extends React.Component<Props, {}> {
    static navigationOptions = {
        title: 'Event',
        headerMode: 'none',
    };

    render() {
        const event: EventInfo = this.props.navigation.getParam('event', null);
        if (event === null) {
            return null;
        }
        return (
            <Wrapper>
                <HeaderWrapper bgColor={event.color}>
                    <BackgroundImage overlayColor={event.color}>
                        <HeaderContent>
                            <Title>{event.title}</Title>
                            <Description>{event.description}</Description>
                        </HeaderContent>
                    </BackgroundImage>
                </HeaderWrapper>
                <ContentWrapper>
                    <Tabs pageColor={theme.colors[event.color]} />
                </ContentWrapper>
            </Wrapper>
        );
    }
}
