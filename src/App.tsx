import React from 'react';
import { Font } from 'expo';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { Router } from './Router';

// tslint:disable-next-line:no-var-requires
const RubikFont = require('../assets/Rubik-Regular.ttf');

type State = { assetsLoaded: boolean };

export default class App extends React.Component<{}, State> {
    state = {
        assetsLoaded: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            Rubik: RubikFont,
        });
        this.setState({ assetsLoaded: true });
    }

    render() {
        return <ThemeProvider theme={theme}>{this.state.assetsLoaded ? <Router /> : null}</ThemeProvider>;
    }
}
