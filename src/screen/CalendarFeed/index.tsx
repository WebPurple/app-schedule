import * as React from 'react';
import { View, FlatList } from 'react-native';
import { NavigationContainerProps, NavigationBottomTabScreenOptions } from 'react-navigation';
import { getYear, getMonth, isToday, startOfMonth, lastDayOfMonth, startOfDay, isSameDay } from 'date-fns';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Layout } from '../../components/Layout/Layout';
import DayCell from './components/DayCell/DayCell';
import { CompactCalendar } from './components/CompactCalendar/CompactCalendar';
import { DisplayedEvent } from '../../types/Event.type';
import { generateEventsForMonth, groupSchedule } from '../../data';
import { getColor } from '../../styles/theme';

type State = {
    currentEvent: DisplayedEvent;
    events: DisplayedEvent[];
};

export class CalendarFeed extends React.Component<NavigationContainerProps, State> {
    static navigationOptions: NavigationBottomTabScreenOptions = {
        title: 'Schedule',
        tabBarIcon: <Icon size={24} color={getColor('grape')} name="calendar-o" />
    };

    listRef = React.createRef<FlatList<DisplayedEvent>>();

    constructor(props: NavigationContainerProps) {
        super(props);
        const events = CalendarFeed.generateCurrentMonth(new Date());
        this.state = {
            currentEvent: events[this.findFirstTodayEvent(events)],
            events
        };
    }

    static generateCurrentMonth(date: Date): DisplayedEvent[] {
        const firstDay = startOfMonth(date);
        const lastDay = lastDayOfMonth(date);
        const events = generateEventsForMonth(groupSchedule, firstDay, lastDay);
        let shownDatesStack = new Set();
        return events.map(event => {
            const day: string = startOfDay(event.startDate).toString();
            const isInSet = shownDatesStack.has(day);
            if (!isInSet) {
                shownDatesStack.add(day);
            }
            return {
                ...event,
                showDate: !isInSet,
                isToday: isToday(event.startDate)
            };
        });
    }

    fetchNextMonth = () => {
        const lastAvailableDay = this.state.events[this.state.events.length - 1].startDate;
        const nextEvents = CalendarFeed.generateCurrentMonth(
            new Date(getYear(lastAvailableDay), getMonth(lastAvailableDay) + 1, 1)
        );

        this.setState(({ events }) => {
            return { events: events.concat(nextEvents) };
        });
    };

    keyExtractor = (item: DisplayedEvent) => item.startDate.toString();

    renderItem = ({ item }: { item: DisplayedEvent }) => {
        const { showDate, ...otherFields } = item;
        return <DayCell showDate={showDate} {...otherFields} />;
    };

    getItemLayout = (_item: never, index: number) => ({
        length: 70,
        offset: 70 * index,
        index
    });

    findFirstTodayEvent = (events: DisplayedEvent[]): number => {
        const foundIndex = events.findIndex(event => isToday(event.startDate));
        return foundIndex === -1 ? 0 : foundIndex;
    };

    onScroll = ({ viewableItems }: { viewableItems: Array<{ item: DisplayedEvent }> }) => {
        const dateItem = viewableItems[0];
        if (dateItem) {
            this.setState({ currentEvent: viewableItems[0].item });
        }
    };

    handleDateSelection = (date: Date) => {
        const foundIndex = this.state.events.findIndex(({ startDate }) => isSameDay(startDate, date));
        if (foundIndex !== -1) {
            this.listRef.current.scrollToIndex({
                index: foundIndex,
                animated: false
            });
        }
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
                        scrollEventThrottle={1}
                        onViewableItemsChanged={this.onScroll}
                        onEndReachedThreshold={15}
                        onEndReached={this.fetchNextMonth}
                    />
                </View>
            </Layout>
        );
    }
}
