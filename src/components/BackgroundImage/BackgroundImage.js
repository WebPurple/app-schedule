// @flow
import * as React from 'react';
import { Wrapper, StyledImage, Content, Overlay } from './atoms';
import type { ColorName } from '../../styles/theme';

// $FlowFixMe
const imageBG = require('../../assets/bg.jpeg');

type Props = {
    children: React.Node,
    overlayColor?: ColorName,
};

export class BackgroundImage extends React.Component<Props> {
    render() {
        return (
            <Wrapper>
                <StyledImage source={imageBG} resizeMode="cover" />
                <Overlay overlayColor={this.props.overlayColor} />
                <Content>{this.props.children}</Content>
            </Wrapper>
        );
    }
}
