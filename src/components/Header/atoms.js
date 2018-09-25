// @flow
import styled from 'styled-components';
import { getColor } from '../../styles/theme';

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    width: 100%;
`;

export const Title = styled.Text`
    color: ${getColor('lipstick')};
    font-family: Rubik;
    font-weight: bold;
    font-size: 22px;
`;

export const Logo = styled.Image`
    width: 32px;
    height: 32px;
    margin: 0 10px;
`;
