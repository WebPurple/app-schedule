// @flow
import React from 'react';
import {
  EventTitle,
  EventDescription,
  EventContainer,
  EventRow,
  EventDuration,
  EventTitleLimit,
} from './atoms';
import { EventInfo as TEventInfo } from '../../DateInfo.type';
import { format } from 'date-fns';

type Props = {
  event: TEventInfo,
};

const formatTime = (start: Date, end: Date): string => {
  const from = format(start, 'HH:mm');
  const to = format(end, 'HH:mm');
  return `${from} - ${to}`;
};

const EventInfo = ({ event }: Props) => {
  return (
    <EventContainer bgColor={event.color} key={event.title.replace(' ', '_')}>
      <EventRow>
        <EventTitleLimit>
          <EventTitle numberOfLines={1}>{event.title}</EventTitle>
        </EventTitleLimit>
        <EventDuration>
          {formatTime(event.startTime, event.endTime)}
        </EventDuration>
      </EventRow>
      <EventDescription numberOfLines={1}>{event.description}</EventDescription>
    </EventContainer>
  );
};

export default EventInfo;
