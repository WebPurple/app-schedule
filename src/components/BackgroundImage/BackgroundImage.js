import * as React from 'react';
import { Wrapper, StyledImage, Content, Overlay } from './atoms';

const imageBG = require('../../../assets/bg.jpeg');

export class BackgroundImage extends React.Component {
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
