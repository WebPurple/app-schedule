import styled from 'styled-components';
import { getColor } from '../../../../styles/theme';

export const Wrapper = styled.View`
    padding: 10px;
    border-style: solid;
    border-color: ${getColor('warmGrey')};
    border-bottom-width: 1px;
`;

export const CalendarBlock = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
`;

export const Row = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const Cell = styled.View`
    flex: 1;
`;

export const CellText = styled.Text`
    text-align: center;
    text-decoration: ${props => (props.underline ? 'underline' : 'none')};
    color: ${props => getColor(props.underline ? 'lipstick' : 'warmGrey')};
    font-size: 14px;
    font-family: Rubik;
`;

export const CellHeaderText = styled(CellText)`
    color: ${getColor('grape')};
    font-weight: 600;
`;
