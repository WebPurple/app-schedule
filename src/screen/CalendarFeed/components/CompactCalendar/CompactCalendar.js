import React from 'react';
import { startOfWeek, addDays, format, getYear, getMonth } from 'date-fns';
import { TouchableOpacity, PanResponder, Animated } from 'react-native';
import { Wrapper, Row, Cell, CellText } from './atoms';

export class CompactCalendar extends React.Component {
    static WeekDays = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

    constructor() {
        super();
        let currentValue = 20;
        this.animatedValue = new Animated.Value(20);
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onStartShouldSetPanResponderCapture: () => true,
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove: (_e, gestureHandler) => {
                const isAlreadyOpened = currentValue === 220;
                const valueToSet = isAlreadyOpened ? 220 + gestureHandler.dy : gestureHandler.dy;
                this.animatedValue.setValue(Math.max(20, valueToSet));
            },
            onPanResponderTerminationRequest: () => true,
            onPanResponderRelease: (e, gh) => {
                const shouldBeClosed = gh.dy <= 220;
                Animated.spring(this.animatedValue, {
                    toValue: shouldBeClosed ? 20 : 220,
                }).start();
                currentValue = shouldBeClosed ? 20 : 220;
            },
        });
    }

    generateCurrentWeekDays = ({ selectedDate }) => {
        const firstDayOfWeek = startOfWeek(selectedDate, {
            weekStartsOn: 1,
        });
        return Array.from({ length: 7 }, (_v, i) => format(addDays(firstDayOfWeek, i), 'DD'));
    };

    static isCurrentDate(dd, date) {
        return dd === format(date, 'DD');
    }

    handlePress = dd => () => {
        this.props.onSelectDate(
            new Date(getYear(this.props.selectedDate), getMonth(this.props.selectedDate), Number(dd)),
        );
    };

    render() {
        const { selectedDate } = this.props;
        return (
            <Wrapper {...this.panResponder.panHandlers}>
                <Row>
                    {CompactCalendar.WeekDays.map(wd => (
                        <Cell key={wd}>
                            <CellText>{wd}</CellText>
                        </Cell>
                    ))}
                </Row>
                <Row as={Animated.View} style={{ height: this.animatedValue }}>
                    {this.generateCurrentWeekDays(this.props).map(wd => {
                        const isCurrentDate = CompactCalendar.isCurrentDate(wd, selectedDate);
                        return (
                            <Cell key={wd}>
                                <TouchableOpacity onPress={this.handlePress(wd)}>
                                    <CellText underline={isCurrentDate}>{wd}</CellText>
                                </TouchableOpacity>
                            </Cell>
                        );
                    })}
                </Row>
            </Wrapper>
        );
    }
}
