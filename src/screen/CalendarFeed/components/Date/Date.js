// @flow

import React from 'react';
import { Wrapper, Day, WeekDay, TextWrapper } from './atoms';
import { format } from 'date-fns';

type Props = {
  date: Date,
  isToday: boolean,
};

const Date = ({ date, isToday }: Props) => {
  return (
    <Wrapper>
      <Day isToday={isToday}>{format(date, 'DD')}</Day>
      <WeekDay isToday={isToday}>{format(date, 'dd').toLowerCase()}</WeekDay>
    </Wrapper>
  );
};

export default Date;
