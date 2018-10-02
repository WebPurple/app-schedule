import React from 'react';
import { Title, Container, Logo } from './atoms';

// tslint:disable-next-line:no-var-requires
const logo = require('../../../assets/logo.png');

type Props = { title: string };

export const Header = ({ title }: Props) => {
    return (
        <Container>
            <Logo source={logo} />
            <Title>{title}</Title>
        </Container>
    );
};
