import styled from '../../styles/styled-components';
import { View, Text, TextInput } from 'react-native';
import { Button as ButtonComponent } from '../../components/Button';
import { getColor } from '../../styles/theme';

export const Wrapper = styled(View)`
    flex: 1;
    width: 100%;
    background-color: ${props => getColor(props.login ? 'liliac' : 'rosePink')};
    align-items: center;
`;

export const LogoContainer = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
`;

export const Label = styled(Text)`
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    color: ${({error}) => error ? '#ee2a7b' : '#fff'};
`;

const PageFieldMixin = `
    margin-bottom: 15px;
    border-radius: 25;
`;

export const FieldsContainer = styled(View)`
    flex: 1;
    width: 80%;
    align-items: center;
`;

export const Input = styled(TextInput)`
    ${PageFieldMixin};
    background-color: #fff;
    padding: 10px 20px;
    font-size: 20px;
    width: 100%;
`;

export const Button = styled(ButtonComponent)`
    ${PageFieldMixin};
    margin-top: 15px;
    padding: 10px 20px;
    background-color: ${props => getColor(props.login ? 'warmPurple' : 'rouge')};
    opacity: ${props => (props.disabled ? 0.5 : 1)};
    width: 100%;
`;

export const LinksRow = styled(View)`
    flex: 0.3;
    flex-direction: row;
    justify-content: space-between;
    height: 20px;
    width: 100%;
`;

export const Link = styled(ButtonComponent)`
    ${PageFieldMixin};
    height: 100%;
`;
