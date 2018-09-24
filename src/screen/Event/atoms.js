// @flow
import styled from 'styled-components';
import { getColor } from '../../styles/theme';

export const Wrapper = styled.View`
  flex: 1;
  width: 100%;
`;

export const HeaderWrapper = styled.View`
  height: 300px;
  justify-content: center;
  align-items: flex-start;
  background-color: ${props => getColor(props.bgColor)(props)};
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: 'Rubik';
  font-weight: bold;
  color: #fff;
`;

export const Description = styled(Title)`
  font-size: 16px;
  font-weight: 200;
`;
