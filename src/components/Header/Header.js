import React from 'react';
import { Title, Container, Logo } from './atoms';

const logo = require('../../../assets/logo.png');

export const Header = ({ title }) => {
    return (
        <Container>
            <Logo source={logo} />
            <Title>{title}</Title>
        </Container>
    );
};
