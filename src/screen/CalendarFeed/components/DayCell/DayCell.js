// @flow
import React from 'react';
import { Wrapper, DateContainer, EventsContainer } from './atoms';
import { DateInfo } from '../../DateInfo.type';
import { format } from 'date-fns';
import Date from '../Date/Date';
import EventList from '../EventList/EventList';

type Props = DateInfo;

const DayCell = ({ isToday, value: dateValue, events }: Props) => {
  return (
    <Wrapper>
      <DateContainer>
        <Date isToday={isToday} date={dateValue} />
      </DateContainer>
      <EventsContainer>
        <EventList events={events} />
      </EventsContainer>
    </Wrapper>
  );
};

export default DayCell;
