import React from 'react';
import { startOfWeek, addDays, format, getYear, getMonth, differenceInCalendarWeeks, startOfMonth } from 'date-fns';
import { TouchableOpacity, PanResponder, Animated, PanResponderInstance, View, Text } from 'react-native';
import { Wrapper, Row, Cell, CellText } from './atoms';

type Props = {
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
};

export class CompactCalendar extends React.Component<Props> {
    private static OPEN_HEIGHT = 220;
    private animatedValue: Animated.AnimatedValue = new Animated.Value(CompactCalendar.OPEN_HEIGHT);
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
                const isAlreadyOpened = currentValue === 220;
                const valueToSet = isAlreadyOpened ? 220 + gestureHandler.dy : gestureHandler.dy;
                this.animatedValue.setValue(Math.max(20, valueToSet));
            },
            onPanResponderTerminationRequest: () => true,
            onPanResponderRelease: (_e, gh) => {
                const shouldBeClosed = gh.dy <= 220;
                Animated.spring(this.animatedValue, {
                    toValue: shouldBeClosed ? 20 : 220,
                }).start();
                currentValue = shouldBeClosed ? 20 : 220;
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

    renderPrevWeeks({ selectedDate }: Props) {
        const firstDayOfMonth = startOfMonth(selectedDate);
        const prevWeeksLength = differenceInCalendarWeeks(selectedDate, firstDayOfMonth);
        if (prevWeeksLength === 0) {
            return null;
        }
        return (
            <View>
                {Array.from({ length: prevWeeksLength }, (_v, i: number) => {
                    const currentDay = addDays(firstDayOfMonth, 7 * i);
                    const weekDays = this.generateCurrentWeekDays({ selectedDate: currentDay });
                    return (
                        <Row key={currentDay.toString()}>
                            {weekDays.map(wd => (
                                <Cell key={wd}>
                                    <CellText>{wd}</CellText>
                                </Cell>
                            ))}
                        </Row>
                    );
                })}
            </View>
        );
    }

    render() {
        const { selectedDate } = this.props;
        return (
            <Wrapper {...this.panResponder.panHandlers}>
                <Row>
                    {['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'].map(wd => (
                        <Cell key={wd}>
                            <CellText>{wd}</CellText>
                        </Cell>
                    ))}
                </Row>

                <Row as={Animated.View} style={{ height: this.animatedValue }}>
                    {/* {this.renderPrevWeeks(this.props)}
                <Row> */}
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
