// @flow
import React from 'react';
import styled from 'styled-components';
import { View, Text, ScrollView } from 'react-native';
import faker from 'faker';
import { getDaysInMonth, getYear, getMonth, isToday, setMonth } from 'date-fns';
import { DateInfo, EventInfo } from './DateInfo.type';
import DayCell from './components/DayCell/DayCell';
import { randomizeColor } from '../../utils/randomizeColor';

type State = {
  dates: Array<DateInfo>,
};

const DateString = styled.Text`
  color: ${props => (props.current ? '#00f' : '#000')};
`;

class CalendarFeed extends React.Component<{}, State> {
  constructor() {
    super();
    const today = new Date();
    const prevMonth = setMonth(today, getMonth(today) - 1);
    const nextMonth = setMonth(today, getMonth(today) + 1);
    this.state = {
      dates: [
        // ...CalendarFeed.generateCurrentMonth(prevMonth),
        ...CalendarFeed.generateCurrentMonth(today),
        // ...CalendarFeed.generateCurrentMonth(nextMonth),
      ],
    };
  }

  static FOR_TEST_ONLY_GENERATE_EVENTS() {
    return Array.from(
      { length: faker.random.number({ min: 1, max: 5 }) },
      (_v, index): EventInfo => ({
        title: faker.lorem.sentence(5),
        description: faker.lorem.sentence(8),
        startTime: new Date(2018, 8, 22, 15, 10, 0),
        endTime: new Date(2018, 8, 22, 16, 0, 0),
        color: randomizeColor(faker.lorem.sentence(8)),
      })
    );
  }

  static generateCurrentMonth(date: Date): Array<DateInfo> {
    const daysInMonth = getDaysInMonth(date);
    return Array.from({ length: daysInMonth - 1 }, (_v, index) => {
      const value = new Date(getYear(date), getMonth(date), index + 1);
      return {
        value,
        isToday: isToday(value),
        events: CalendarFeed.FOR_TEST_ONLY_GENERATE_EVENTS(),
      };
    });
  }

  render() {
    return (
      <ScrollView>
        {this.state.dates.map(d => {
          return <DayCell key={d.value} {...d} />;
        })}
      </ScrollView>
    );
  }
}

export default CalendarFeed;
