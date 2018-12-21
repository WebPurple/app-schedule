import React from 'react';
import { theme } from './styles/theme';
import { ThemeProvider } from './styles/styled-components';
import { AppNavigator } from './Navigator';
import { AuthProvider, FirebaseProvider } from './core';

type State = { assetsLoaded: boolean };

export default class App extends React.Component<{}, State> {
    state = {
        assetsLoaded: true
    };

    render() {
        const { assetsLoaded } = this.state;

        // TODO
        if (!assetsLoaded) {
            return null;
        }

        return (
            <ThemeProvider theme={theme}>
                <FirebaseProvider>
                    <AuthProvider>
                        <AppNavigator />
                    </AuthProvider>
                </FirebaseProvider>
            </ThemeProvider>
        );
    }
}
