import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { Router } from './Router';

type State = { assetsLoaded: boolean };

export default class App extends React.Component<{}, State> {
    state = {
        assetsLoaded: true,
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                {this.state.assetsLoaded ? <Router /> : null}
            </ThemeProvider>
        );
    }
}
