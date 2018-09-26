import * as React from 'react';
import { View, FlatList } from 'react-native';
// eslint-disable-next-line
import faker from 'faker';
import { getDaysInMonth, getYear, getMonth, isToday, getDate } from 'date-fns';

import { Layout } from '../../components/Layout/Layout';
import DayCell from './components/DayCell/DayCell';
import { randomizeColor } from '../../utils/randomizeColor';
import { Header } from '../../components/Header/Header';
import { CompactCalendar } from './components/CompactCalendar/CompactCalendar';

export class CalendarFeed extends React.Component {
    static navigationOptions = {
        headerTitle: <Header title="Webpurple's Scheduler" />,
    };

    listRef = React.createRef();

    constructor() {
        super();
        const events = CalendarFeed.generateCurrentMonth(new Date());
        this.state = {
            currentEvent: events[this.findFirstTodayEvent(events)],
            events,
        };
    }

    static FOR_TEST_ONLY_GENERATE_EVENTS(...args) {
        return Array.from({ length: faker.random.number({ min: 1, max: 5 }) }, (_v, index) => ({
            title: faker.lorem.sentence(5),
            description: faker.lorem.sentence(8),
            isToday: isToday(new Date(...args)),
            showDate: index === 0,
            startTime: new Date(...args, 15, 10, 0),
            endTime: new Date(...args, 16, 0, 0),
            color: randomizeColor(faker.lorem.sentence(8)),
        }));
    }

    static generateCurrentMonth(date) {
        const daysInMonth = getDaysInMonth(date);
        return Array.from({ length: daysInMonth }, (_v, i) =>
            CalendarFeed.FOR_TEST_ONLY_GENERATE_EVENTS(getYear(date), getMonth(date), i + 1),
        ).reduce((acc, value) => acc.concat(value), []);
    }

    keyExtractor = item => item.title.replace(' ', '');

    renderItem = ({ item }) => {
        const { showDate, ...otherFields } = item;
        return <DayCell showDate={showDate} {...otherFields} />;
    };

    getItemLayout = (_item, index) => ({
        length: 70,
        offset: 70 * index,
        index,
    });

    findFirstTodayEvent = events => events.findIndex(event => isToday(event.startTime));

    onScroll = ({ viewableItems }) => {
        this.setState({ currentEvent: viewableItems[0].item });
    };

    handleDateSelection = date => {
        const foundIndex = this.state.events.findIndex(
            ({ startTime }) =>
                getYear(startTime) === getYear(date) &&
                getMonth(startTime) === getMonth(date) &&
                getDate(startTime) === getDate(date),
        );
        this.listRef.current.scrollToIndex({ index: foundIndex });
    };

    render() {
        return (
            <Layout>
                <CompactCalendar
                    onSelectDate={this.handleDateSelection}
                    selectedDate={this.state.currentEvent.startTime}
                />
                <View style={{ flex: 1 }}>
                    <FlatList
                        ref={this.listRef}
                        data={this.state.events}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                        getItemLayout={this.getItemLayout}
                        initialScrollIndex={this.findFirstTodayEvent(this.state.events)}
                        onViewableItemsChanged={this.onScroll}
                    />
                </View>
            </Layout>
        );
    }
}
