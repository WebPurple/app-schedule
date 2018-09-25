// @flow
import styled from 'styled-components';
import { getColor } from '../../../../styles/theme';

export const Wrapper = styled.View`
    width: 100%;
    justify-content: flex-start;
    padding-left: 20px;
`;

export const Day = styled.Text`
    font-size: 22px;
    font-family: 'Rubik';
    color: ${props => getColor(props.isToday ? 'lipstick' : 'greyishBrown')};
`;

export const WeekDay = styled(Day)`
    font-size: 14px;
`;
