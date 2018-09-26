import React from 'react';
import { format } from 'date-fns';
import { Wrapper, Day, WeekDay } from './atoms';

const DateComponent = ({ date, isToday }) => (
    <Wrapper>
        <Day isToday={isToday}>{format(date, 'DD')}</Day>
        <WeekDay isToday={isToday}>{format(date, 'dd').toLowerCase()}</WeekDay>
    </Wrapper>
);

export default DateComponent;
