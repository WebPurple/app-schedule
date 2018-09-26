import React, { ReactNode } from 'react';
import {
    startOfWeek,
    addDays,
    format,
    getYear,
    getMonth,
    differenceInCalendarWeeks,
    startOfMonth,
    lastDayOfMonth,
} from 'date-fns';
import { TouchableOpacity, PanResponder, Animated, PanResponderInstance } from 'react-native';
import { Wrapper, Row, Cell, CellText, CalendarBlock } from './atoms';

type Props = {
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
};

export class CompactCalendar extends React.Component<Props> {
    private animatedValue: Animated.AnimatedValue = new Animated.Value(20);
    private scalingInterpolation = this.animatedValue.interpolate({
        inputRange: [20, 160, 1000],
        outputRange: [0.1, 1, 1],
    });
    private rowHeightInterpolation = this.scalingInterpolation.interpolate({
        inputRange: [0.1, 1],
        outputRange: [0, 20],
    });
    private panResponder: PanResponderInstance;

    constructor(props: Props) {
        super(props);
        this.initializePanResponder();
    }

    private initializePanResponder() {
        let currentValue = 20;
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onStartShouldSetPanResponderCapture: () => false,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (_e, gestureHandler) => {
                const isAlreadyOpened = currentValue === 160;
                const valueToSet = isAlreadyOpened ? 160 + gestureHandler.dy : gestureHandler.dy;
                this.animatedValue.setValue(Math.max(20, valueToSet));
            },
            onPanResponderTerminationRequest: () => true,
            onPanResponderRelease: (_e, gh) => {
                const shouldBeClosed = gh.dy <= 160;
                Animated.timing(this.animatedValue, {
                    toValue: shouldBeClosed ? 20 : 160,
                }).start();
                currentValue = shouldBeClosed ? 20 : 160;
            },
        });
    }

    generateCurrentWeekDays = ({ selectedDate }: { selectedDate: Date }) => {
        const firstDayOfWeek = startOfWeek(selectedDate, {
            weekStartsOn: 1,
        });
        return Array.from({ length: 7 }, (_v, i) => format(addDays(firstDayOfWeek, i), 'DD'));
    };

    static isCurrentDate(dd: string, date: Date) {
        return dd === format(date, 'DD');
    }

    handlePress = (dd: String) => () => {
        this.props.onSelectDate(
            new Date(getYear(this.props.selectedDate), getMonth(this.props.selectedDate), Number(dd)),
        );
    };

    private renderMissingWeeks(from: Date, amount: number) {
        return Array.from({ length: amount }, (_v, i: number) => {
            const currentDay = addDays(from, 7 * i);
            const weekDays = this.generateCurrentWeekDays({ selectedDate: currentDay });
            const [props, isPresent] = this.selectRowComponent(weekDays, this.props.selectedDate);
            return (
                <Row {...props} key={currentDay.toString()}>
                    {this.renderWeek(isPresent ? this.props.selectedDate : currentDay, weekDays, isPresent)}
                </Row>
            );
        });
    }

    selectRowComponent(weekDays: string[], day: Date): [object, boolean] {
        const isPresent = weekDays.some(wd => CompactCalendar.isCurrentDate(wd, day));
        const props = isPresent
            ? {}
            : {
                  as: Animated.View,
                  style: {
                      transform: [{ scale: this.scalingInterpolation }, { perspective: 1000 }],
                      height: this.rowHeightInterpolation,
                  },
              };
        return [props, isPresent];
    }

    renderWeek(date: Date, weekDays: string[], showToday: boolean = false): ReactNode[] {
        return weekDays.map(wd => this.renderCell(wd, showToday && CompactCalendar.isCurrentDate(wd, date)));
    }

    renderCell(wd: string, isCurrentDate: boolean): ReactNode {
        return (
            <Cell key={wd}>
                <TouchableOpacity onPress={this.handlePress(wd)}>
                    <CellText underline={isCurrentDate}>{wd}</CellText>
                </TouchableOpacity>
            </Cell>
        );
    }

    render() {
        const firstDay = startOfMonth(this.props.selectedDate);
        const lastDay = lastDayOfMonth(this.props.selectedDate);
        const prevWeeksLength = differenceInCalendarWeeks(lastDay, firstDay, {
            weekStartsOn: 1,
        });
        return (
            <Wrapper {...this.panResponder.panHandlers}>
                <CalendarBlock>
                    <Row>
                        {['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'].map(wd => (
                            <Cell key={wd}>
                                <CellText>{wd}</CellText>
                            </Cell>
                        ))}
                    </Row>
                </CalendarBlock>

                <CalendarBlock as={Animated.View} style={{ height: this.animatedValue }}>
                    {this.renderMissingWeeks(firstDay, prevWeeksLength + 1)}
                </CalendarBlock>
            </Wrapper>
        );
    }
}
