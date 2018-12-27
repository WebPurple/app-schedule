import * as React from 'react';
import { View, FlatList } from 'react-native';
import { NavigationContainerProps } from 'react-navigation';
import { getYear, getMonth, isToday, isSameDay } from 'date-fns';

import DayCell from './components/DayCell/DayCell';
import { CompactCalendar } from './components/CompactCalendar/CompactCalendar';
import { Layout } from '../../components/Layout/Layout';
import { DisplayedEvent } from '../../types/Event.type';
import { withAuth, AppUser, withFirebase, Firebase, Scheduler } from '../../core';
import { Group, GroupSchedule } from '../../types/scheme';

type Props = NavigationContainerProps & {
    firebase: Firebase;
    user: AppUser;
};

type State = {
    currentEvent: DisplayedEvent | null;
    events: DisplayedEvent[];
    schedule: GroupSchedule;
};

class CalendarFeed extends React.Component<Props, State> {
    listRef = React.createRef<FlatList<DisplayedEvent>>();
    firebase = this.props.firebase;
    groupsPathsUnsubscribers: string[];

    state: State = {
        events: [],
        currentEvent: null,
        schedule: null,
    };

    async componentDidMount() {
        try {
            const groups = await Promise.all(
                this.props.user.groups.map(groupName => this.firebase.getPathValueOnce<Group>(`/groups/${groupName}`)),
            );
            this.groupsPathsUnsubscribers = groups.map(({ schedule }) => {
                const path = `/schedules/${schedule}`;
                this.setScheduleListener(path);
                return path;
            });
        } catch ({ message }) {
            console.warn(message);
            this.groupsPathsUnsubscribers = [];
        }
    }

    componentWillUnmount() {
        this.groupsPathsUnsubscribers.forEach(path => this.firebase.db.ref(path).off('value'));
    }

    setScheduleListener(path: string) {
        this.firebase.db.ref(path).on('value', snapshot => this.handleScheduleUpdate(snapshot.val()));
    }

    handleScheduleUpdate(schedule: GroupSchedule) {
        const events = Scheduler.generateCurrentMonth(new Date(), schedule);
        this.setState({
            currentEvent: events[this.findFirstTodayEvent(events)],
            events,
            schedule,
        });
    }

    fetchNextMonth = () => {
        const { events, schedule } = this.state;
        const lastAvailableDay = events[events.length - 1].startDate;
        const nextEvents = Scheduler.generateCurrentMonth(
            new Date(getYear(lastAvailableDay), getMonth(lastAvailableDay) + 1, 1),
            schedule,
        );

        if (nextEvents.length) {
            this.setState(prevState => ({
                events: prevState.events.concat(nextEvents),
            }));
        }
    };

    keyExtractor = (item: DisplayedEvent) => item.startDate.toString();

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
        const dateItem = viewableItems[0];
        if (dateItem) {
            this.setState({ currentEvent: dateItem.item });
        }
    };

    handleDateSelection = (date: Date) => {
        const foundIndex = this.state.events.findIndex(({ startDate }) => isSameDay(startDate, date));
        if (foundIndex !== -1) {
            this.listRef.current.scrollToIndex({
                index: foundIndex,
                animated: false,
            });
        }
    };

    render() {
        return (
            <Layout>
                <CompactCalendar
                    onSelectDate={this.handleDateSelection}
                    selectedDate={this.state.currentEvent && this.state.currentEvent.startDate}
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

export const CalendarFeedScreen = withAuth(withFirebase(CalendarFeed));
