import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';
import { format } from 'date-fns';

import { EventTitle, EventDescription, EventContainer, EventRow, EventDuration, EventTitleLimit } from './atoms';
import { IEvent } from '../../../../types/Event.type';

const formatTime = (start: Date, end: Date) => {
    const from = format(start, 'HH:mm');
    const to = format(end, 'HH:mm');
    return `${from} - ${to}`;
};

type Props = { event: IEvent };

class EventInfo extends React.Component<Props & NavigationInjectedProps> {
    handleSelect = () => this.props.navigation.navigate('Event', { event: this.props.event });

    render() {
        const { event } = this.props;
        return (
            <TouchableOpacity onPress={this.handleSelect}>
                <EventContainer bgColor={event.color} key={event.title.replace(' ', '_')}>
                    <EventRow>
                        <EventTitleLimit>
                            <EventTitle numberOfLines={1}>{event.title}</EventTitle>
                        </EventTitleLimit>
                        <EventDuration>{formatTime(event.startDate, event.endDate)}</EventDuration>
                    </EventRow>
                    <EventDescription numberOfLines={1}>{event.description}</EventDescription>
                </EventContainer>
            </TouchableOpacity>
        );
    }
}

export default withNavigation(EventInfo) as React.ComponentType<Props>;
