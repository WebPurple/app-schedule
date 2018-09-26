import React from 'react';
import Expo from 'expo';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/styles/theme';
import { Router } from './Router';

const RubikFont = require('./src/assets/Rubik-Regular.ttf');

export default class App extends React.Component {
    state = {
        assetsLoaded: false,
    };

    async componentDidMount() {
        await Expo.Font.loadAsync({
            Rubik: RubikFont,
        });
        this.setState({ assetsLoaded: true });
    }

    render() {
        return <ThemeProvider theme={theme}>{this.state.assetsLoaded ? <Router /> : null}</ThemeProvider>;
    }
}
