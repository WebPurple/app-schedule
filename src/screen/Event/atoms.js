// @flow
import styled from 'styled-components';

export const Wrapper = styled.View`
    flex: 1;
    width: 100%;
`;

export const HeaderWrapper = styled.View`
    height: 300px;
`;

export const Title = styled.Text`
    font-size: 20px;
    font-family: 'Rubik';
    font-weight: bold;
    color: #fff;
`;

export const Description = styled(Title)`
    font-size: 16px;
    font-weight: 200;
`;

export const ContentWrapper = styled.View`
    flex: 1;
`;

export const HeaderContent = styled.View`
    padding: 20px;
`;
