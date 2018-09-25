// @flow

import styled from 'styled-components';
import { getColor } from '../../../../styles/theme';

export const Wrapper = styled.View`
    padding: 10px;
    border-style: solid;
    border-color: ${getColor('warmGrey')};
    border-bottom-width: 1px;
`;

export const Row = styled.View`
    flex-direction: row;
`;

export const Cell = styled.View`
    flex: 1;
`;

export const CellText = styled.Text`
    text-align: center;
    text-decoration: ${props => (props.underline ? 'underline' : 'none')};
    color: ${props => getColor(props.underline ? 'lipstick' : 'warmGrey')};
    font-family: Rubik;
`;
