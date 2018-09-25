// @flow
import styled from 'styled-components';
import { getColor } from '../../styles/theme';

export const Wrapper = styled.View`
    width: 100%;
    height: 100%;
`;

export const StyledImage = styled.Image`
    width: 100%;
    height: 100%;
`;

export const Overlay = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: ${props => getColor(props.overlayColor, 'transparent')};
    opacity: 0.65;
`;

export const Content = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
`;
