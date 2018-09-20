// @flow
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/styles/theme';
import Header from './src/components/Header/Header';
import { Layout } from './src/components/Layout/Layout';
import CalendarFeed from './src/screen/CalendarFeed/CalendarFeed';

export default () => (
  <ThemeProvider theme={theme}>
    <Layout.Wrapper>
      <Layout.Header>
        <Header title="Scheduler" />
      </Layout.Header>
      <Layout.Content>
        <CalendarFeed />
      </Layout.Content>
    </Layout.Wrapper>
  </ThemeProvider>
);
