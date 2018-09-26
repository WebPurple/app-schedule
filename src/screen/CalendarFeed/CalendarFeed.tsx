import * as React from 'react';
import { View, FlatList } from 'react-native';
import { NavigationContainerProps } from 'react-navigation';
// eslint-disable-next-line
import { getYear, getMonth, isToday, getDate, startOfMonth, lastDayOfMonth, startOfDay } from 'date-fns';

import { Layout } from '../../components/Layout/Layout';
import DayCell from './components/DayCell/DayCell';
import { Header } from '../../components/Header/Header';
import { CompactCalendar } from './components/CompactCalendar/CompactCalendar';
import { DisplayedEvent } from '../../types/Event.type';
import { generateEventsForMonth, groupSchedule } from '../../data';

type State = {
    currentEvent: DisplayedEvent;
    events: DisplayedEvent[];
};

export class CalendarFeed extends React.Component<NavigationContainerProps, State> {
    static navigationOptions = {
        headerTitle: <Header title="Webpurple's Scheduler" />,
    };

    listRef = React.createRef<FlatList<DisplayedEvent>>();

    constructor(props: NavigationContainerProps) {
        super(props);
        let shownDatesStack = new Set();
        const events = CalendarFeed.generateCurrentMonth(new Date()).map(event => {
            const day: string = startOfDay(event.startDate).toString();
            const isInSet = shownDatesStack.has(day);
            if (!isInSet) {
                shownDatesStack.add(day);
            }
            return {
                ...event,
                showDate: !isInSet,
                isToday: isToday(event.startDate),
            };
        });
        this.state = {
            currentEvent: events[this.findFirstTodayEvent(events)],
            events,
        };
    }

    static generateCurrentMonth(date: Date) {
        const firstDay = startOfMonth(date);
        const lastDay = lastDayOfMonth(date);
        return generateEventsForMonth(groupSchedule.default, firstDay, lastDay);
    }

    keyExtractor = (item: DisplayedEvent) => item.title.replace(' ', '') + item.startDate.toString();

    renderItem = ({ item }: { item: DisplayedEvent }) => {
        const { showDate, ...otherFields } = item;
        return <DayCell showDate={showDate} {...otherFields} />;
    };

    getItemLayout = (_item: never, index: number) => ({
        length: 70,
        offset: 70 * index,
        index,
    });

    findFirstTodayEvent = (events: DisplayedEvent[]): number => {
        const foundIndex = events.findIndex(event => isToday(event.startDate));
        return foundIndex === -1 ? 0 : foundIndex;
    };

    onScroll = ({ viewableItems }: { viewableItems: Array<{ item: DisplayedEvent }> }) => {
        this.setState({ currentEvent: viewableItems[0].item });
    };

    handleDateSelection = (date: Date) => {
        const foundIndex = this.state.events.findIndex(
            ({ startDate }) =>
                getYear(startDate) === getYear(date) &&
                getMonth(startDate) === getMonth(date) &&
                getDate(startDate) === getDate(date),
        );
        this.listRef.current.scrollToIndex({ index: foundIndex });
    };

    render() {
        return (
            <Layout>
                <CompactCalendar
                    onSelectDate={this.handleDateSelection}
                    selectedDate={this.state.currentEvent.startDate}
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
