import styled from '../../../../styles/styled-components';
import { View, Switch } from 'react-native';
import * as Atoms from '../../atoms';

export const Wrapper = Atoms.Wrapper;
export const Input = Atoms.Input;
export const Text = Atoms.Label;
export const Button = Atoms.Button;

export const StyledSwitch = styled(Switch)`
    padding: 10px;
`;

export const LogoContainer = styled(View)`
    flex: 1;
    width: 80%;
    align-items: center;
    justify-content: center;
`;

export const ContentContainer = styled(View)`
    flex: 2.5;
    width: 80%;
    align-items: center;
`;

export const Row = styled(View)`
    flex: 0.5;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 20px;
`;

export const FieldsContainer = styled(View)`
    flex: 3;
    width: 100%;
`;

export const BottomContainer = styled(View)`
    flex: 0.5;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
`;
