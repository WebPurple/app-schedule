import styled from 'styled-components';

export const Wrapper = styled.View`
    flex: 1;
    width: 100%;
`;

export const HeaderWrapper = styled.View`
    height: 220px;
    padding: 20px;
`;

export const UserImage = styled.View`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

export const UserPhoto = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50;
`;

export const UserName = styled.Text`
    font-size: 20px;
    font-family: 'Rubik-Regular';
    font-weight: bold;
    text-align: center;
    margin-bottom: 5px;
`;

export const UserGroup = styled.Text`
    font-size: 16px;
    font-family: 'Rubik-Regular';
    font-weight: bold;
    text-align: center;
`;

export const ContentWrapper = styled.View`
    flex: 1;
`;
