// @flow
import * as React from 'react';
import styled from 'styled-components';
import { View, Text, ScrollView, FlatList } from 'react-native';
import faker from 'faker';
import { getDaysInMonth, getYear, getMonth, isToday, setMonth } from 'date-fns';

import { Layout } from '../../components/Layout/Layout';
import { EventInfo } from './DateInfo.type';
import DayCell from './components/DayCell/DayCell';
import { randomizeColor } from '../../utils/randomizeColor';
import { Header } from '../../components/Header/Header';

type TEventInfoFeed = EventInfo & {
  showDate: boolean,
};

type State = {
  events: Array<TEventInfoFeed>,
};

const DateString = styled.Text`
  color: ${props => (props.current ? '#00f' : '#000')};
`;

export class CalendarFeed extends React.Component<{}, State> {
  static navigationOptions = {
    headerTitle: <Header title="Webpurple's Scheduler" />,
  };

  constructor() {
    super();
    const today = new Date();
    const prevMonth = setMonth(today, getMonth(today) - 1);
    const nextMonth = setMonth(today, getMonth(today) + 1);
    this.state = {
      events: [
        // ...CalendarFeed.generateCurrentMonth(prevMonth),
        ...CalendarFeed.generateCurrentMonth(today),
        // ...CalendarFeed.generateCurrentMonth(nextMonth),
      ],
    };
  }

  static FOR_TEST_ONLY_GENERATE_EVENTS(...args: Array<number>) {
    return Array.from(
      { length: faker.random.number({ min: 1, max: 5 }) },
      (_v, index): EventInfo => ({
        title: faker.lorem.sentence(5),
        description: faker.lorem.sentence(8),
        isToday: isToday(new Date(...args)),
        showDate: index === 0,
        startTime: new Date(...args, 15, 10, 0),
        endTime: new Date(...args, 16, 0, 0),
        color: randomizeColor(faker.lorem.sentence(8)),
      })
    );
  }

  static generateCurrentMonth(date: Date): Array<EventInfo> {
    const daysInMonth = getDaysInMonth(date);
    return Array.from({ length: daysInMonth }, (_v, i) =>
      CalendarFeed.FOR_TEST_ONLY_GENERATE_EVENTS(
        getYear(date),
        getMonth(date),
        i + 1
      )
    ).reduce((acc, value) => acc.concat(value), []);
  }

  _keyExtractor = (item: EventInfo): string => item.title.replace(' ', '');

  _renderItem = ({
    item: { showDate, ...item },
  }: {
    showDate: boolean,
    item: EventInfo,
  }): React.Node => <DayCell showDate={showDate} {...item} />;

  _getItemLayout = ({ item }: { item: EventInfo }, index: number) => ({
    length: 70,
    offset: 70 * index,
    index,
  });

  findFirstTodayEvent = (events: Array<EventInfo>): number =>
    events.findIndex(event => isToday(event.startTime));

  render() {
    return (
      <Layout>
        <FlatList
          data={this.state.events}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          getItemLayout={this._getItemLayout}
          initialScrollIndex={this.findFirstTodayEvent(this.state.events)}
        />
      </Layout>
    );
  }
}
