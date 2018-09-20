import styled from 'styled-components';
import { getColor } from '../../../../styles/theme';

// @flow

export const Wrapper = styled.View`
  width: 100%;
  justify-content: flex-start;
  padding-left: 20px;
`;

export const Day = styled.Text`
  font-size: 22px;
  color: ${props =>
    props.isToday
      ? getColor('lipstick')(props)
      : getColor('greyishBrown')(props)};
`;

export const WeekDay = styled(Day)`
  font-size: 14px;
`;
