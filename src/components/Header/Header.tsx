import React from 'react';
import { Title, Container, Logo } from './atoms';

type Props = { title: string };

export const Header = ({ title }: Props) => {
    return (
        <Container>
            <Logo />
            <Title>{title}</Title>
        </Container>
    );
};
