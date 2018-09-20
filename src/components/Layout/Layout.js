// @flow
import * as React from 'react';
import styled from 'styled-components';

let Layout = {};
Layout.Wrapper = styled.View`
  width: 100%;
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

Layout.Header = styled.View`
  width: 100%;
`;

Layout.Content = styled.View`
  width: 100%;
  flex: 1;
`;

Layout.Footer = styled.View`
  width: 100%;
`;

export { Layout };
