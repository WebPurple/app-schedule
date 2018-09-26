import React from 'react';
import { NavigationContainerProps } from 'react-navigation';
import { Wrapper, HeaderWrapper, Title, Description, ContentWrapper, HeaderContent } from './atoms';
import { Tabs } from './components/Tabs/Tabs';
import { BackgroundImage } from '../../components/BackgroundImage/BackgroundImage';
import { theme } from '../../styles/theme';
import { IEvent } from '../../types/Event.type';

type Props = NavigationContainerProps;

export class EventScreen extends React.Component<Props> {
    static navigationOptions = {
        title: 'Event',
        headerMode: 'none',
    };

    render() {
        const event: IEvent = this.props.navigation.getParam('event', null);
        if (event === null) {
            return null;
        }
        return (
            <Wrapper>
                <HeaderWrapper>
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
