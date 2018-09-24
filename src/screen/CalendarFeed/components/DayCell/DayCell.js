// @flow
import React from 'react';
import { Wrapper, DateContainer, EventsContainer } from './atoms';
import { EventInfo as TEventInfo } from '../../DateInfo.type';
import { format } from 'date-fns';
import Date from '../Date/Date';
import EventInfo from '../EventInfo/EventInfo';

type Props = TEventInfo & { showDate: boolean };

class DayCell extends React.PureComponent<Props, {}> {
  render() {
    const { isToday, showDate, onSelect, ...eventInfo } = this.props;
    return (
      <Wrapper>
        <DateContainer>
          {showDate ? (
            <Date isToday={isToday} date={eventInfo.startTime} />
          ) : null}
        </DateContainer>
        <EventsContainer>
          <EventInfo event={eventInfo} />
        </EventsContainer>
      </Wrapper>
    );
  }
}

export default DayCell;
