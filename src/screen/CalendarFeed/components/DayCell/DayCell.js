import React from 'react';
import { Wrapper, DateContainer, EventsContainer } from './atoms';
import Date from '../Date/Date';
import EventInfo from '../EventInfo/EventInfo';

class DayCell extends React.PureComponent {
    render() {
        const { showDate, ...eventInfo } = this.props;
        return (
            <Wrapper>
                <DateContainer>
                    {showDate ? <Date isToday={eventInfo.isToday} date={eventInfo.startTime} /> : null}
                </DateContainer>
                <EventsContainer>
                    <EventInfo event={eventInfo} />
                </EventsContainer>
            </Wrapper>
        );
    }
}

export default DayCell;
