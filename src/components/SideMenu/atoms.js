import styled from 'styled-components';
import { getColor } from '../../styles/theme';

export const HeaderWrapper = styled.View`
    height: 150px;
`;

export const HeaderContent = styled.View`
    padding: 20px;
`;

export const LogoImg = styled.Image`
    width: 80px;
    height: 80px;
`;

export const HeaderTitle = styled.Text`
    color: #fff;
    text-align: center;
    font-size: 19px;
    margin-top: 10px;
`

export const MenuWrapper = styled.View`
    padding: 20px;
`;

export const MenuItem = styled.View`
    margin: 10px 0;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    flex-direction: row;
`

export const MenuIco = styled.Text`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`

export const MenuItemText = styled.Text`
    font-size: 18px;
    height: 35px;
`