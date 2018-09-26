import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { format } from 'date-fns';

import { EventTitle, EventDescription, EventContainer, EventRow, EventDuration, EventTitleLimit } from './atoms';

const formatTime = (start, end) => {
    const from = format(start, 'HH:mm');
    const to = format(end, 'HH:mm');
    return `${from} - ${to}`;
};

class EventInfo extends React.Component {
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
                        <EventDuration>{formatTime(event.startTime, event.endTime)}</EventDuration>
                    </EventRow>
                    <EventDescription numberOfLines={1}>{event.description}</EventDescription>
                </EventContainer>
            </TouchableOpacity>
        );
    }
}

export default withNavigation(EventInfo);
