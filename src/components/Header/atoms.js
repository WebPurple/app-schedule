// @flow
import styled from 'styled-components';
import { getColor } from '../../styles/theme';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px 20px 10px;
  width: 100%;
  border-style: solid;
  border-color: ${getColor('warmGrey')};
  border-bottom-width: 1px;
`;

export const Title = styled.Text`
  color: ${getColor('lipstick')};
  font-size: 22px;
  font-weight: bold;
`;

export const Logo = styled.Image`
  width: 32px;
  height: 32px;
  margin-right: 20px;
`;
