// @flow
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Wrapper, Row, Cell, CellText } from './atoms';
import { startOfWeek, addDays, format, getYear, getMonth } from 'date-fns';

type Props = {
  selectedDate: Date,
  onSelectDate: (date: Date) => void,
};

export class CompactCalendar extends React.Component<Props, {}> {
  static WeekDays = ['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su'];

  generateCurrentWeekDays = ({ selectedDate }: Props): Array<string> => {
    const firstDayOfWeek = startOfWeek(selectedDate, {
      weekStartsOn: 1,
    });
    return Array.from({ length: 7 }, (_v, i) =>
      format(addDays(firstDayOfWeek, i), 'DD')
    );
  };

  isCurrentDate(dd: string, date: Date) {
    return dd === format(date, 'DD');
  }

  handlePress = (dd: string) => () => {
    this.props.onSelectDate(
      new Date(
        getYear(this.props.selectedDate),
        getMonth(this.props.selectedDate),
        Number(dd)
      )
    );
  };

  render() {
    const { selectedDate } = this.props;
    return (
      <Wrapper>
        <Row>
          {CompactCalendar.WeekDays.map(wd => (
            <Cell key={wd}>
              <CellText>{wd}</CellText>
            </Cell>
          ))}
        </Row>
        <Row>
          {this.generateCurrentWeekDays(this.props).map(wd => {
            const isCurrentDate = this.isCurrentDate(
              wd,
              this.props.selectedDate
            );
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
