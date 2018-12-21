import styled from 'styled-components';
import { Logo as LogoComponent } from '../Logo';
import { getColor } from '../../styles/theme';

export const Container = styled.View`
    flex-direction: row;
    align-items: center;
    width: 100%;
`;

export const Title = styled.Text`
    color: ${getColor('lipstick')};
    font-family: Rubik-Regular;
    font-weight: bold;
    font-size: 22px;
`;

export const Logo = styled(LogoComponent)`
    margin: 0 10px;
`;
