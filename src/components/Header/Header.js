// @flow
import React from 'react';
import { Image } from 'react-native';
import { Title, Container, Logo } from './atoms';

const logo = require('../../assets/logo.png');

type Props = {
  title: string,
};

const Header = ({ title }: Props) => {
  return (
    <Container>
      <Logo source={logo} />
      <Title>{title}</Title>
    </Container>
  );
};

export default Header;