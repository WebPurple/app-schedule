// @flow
import React from 'react';
import Expo from 'expo';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/styles/theme';
import { Router } from './Router';

type State = {
  assetsLoaded: boolean,
};
export default class extends React.Component<{}, State> {
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
    return (
      <ThemeProvider theme={theme}>
        {this.state.assetsLoaded ? <Router /> : null}
      </ThemeProvider>
    );
  }
}
