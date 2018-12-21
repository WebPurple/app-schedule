import styled from 'styled-components';

export const Label = styled.Text`
    font-size: ${props => props.size}px;
    font-family: 'Rubik-Regular';
    font-weight: ${props => (props.bold ? 'bold' : 'normal')};
    color: ${props => props.color};
    text-align: center;
`;
