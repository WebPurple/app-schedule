// @flow
import React from 'react';
import { EventInfo } from '../CalendarFeed/DateInfo.type';
import { Wrapper, HeaderWrapper, Title, Description } from './atoms';

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
          <Title>{event.title}</Title>
          <Description>{event.description}</Description>
        </HeaderWrapper>
      </Wrapper>
    );
  }
}
