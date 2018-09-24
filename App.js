// @flow
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/styles/theme';
import Header from './src/components/Header/Header';
import { Layout } from './src/components/Layout/Layout';
import CalendarFeed from './src/screen/CalendarFeed/CalendarFeed';
import Expo from 'expo';
import { loadAsync } from 'expo/src/Font';

export default class extends React.Component {
  state = {
    assetsLoaded: false,
  };

  async componentDidMount() {
    await Expo.Font.loadAsync({
      Rubik: require('./src/assets/Rubik-Regular.ttf'),
    });
    this.setState({ assetsLoaded: true });
  }

  render() {
    if (!this.state.assetsLoaded) {
      return null;
    }
    return (
      <ThemeProvider theme={theme}>
        <Layout.Wrapper>
          <Layout.Header>
            <Header title="Webpurple's Scheduler" />
          </Layout.Header>
          <Layout.Content>
            <CalendarFeed />
          </Layout.Content>
        </Layout.Wrapper>
      </ThemeProvider>
    );
  }
}
