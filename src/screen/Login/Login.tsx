import React from 'react';
import { Text } from 'react-native';
import { NavigationContainerProps } from 'react-navigation';
import * as Atoms from './atoms';
import { Logo } from '../../components/Logo';

type Props = NavigationContainerProps;
type State = {
    email: string;
    password: string;
    isLogin: boolean;
    error: string | null;
};

export class LoginScreen extends React.Component<Props, State> {
    state: State = {
        email: '',
        password: '',
        isLogin: true,
        error: null
    };

    componentDidUpdate({screenProps: {error: prevPropsError}}: Props, { email: prevEmail, password: prevPassword }: State) {
        const { email, password, error: stateError } = this.state;
        const error = this.props.screenProps.error;

        if (error && error !== prevPropsError) {
            this.setState({ error });
        } else if (stateError && (email !== prevEmail || password !== prevPassword)) {
            this.setState({ error: null });
        }
    }

    validate() {
        const { email, password, error } = this.state;
        return !error && email && password;
    }

    handleFieldChange = (field: keyof State) => (text: string) => this.setState({ [field]: text } as any);

    handleLoginButtonPress = () => {
        if (!this.validate()) {
            return;
        }

        const { email, password, isLogin } = this.state;
        if (!isLogin) {
            this.props.navigation.navigate('AdditionalInfo', { email, password });
        } else {
            this.props.screenProps.onSubmit(email, password);
        }
    };

    render() {
        const { isLogin, error } = this.state;

        return (
            <Atoms.Wrapper login={isLogin}>
                <Atoms.LogoContainer>
                    <Logo size={200} />
                    <Atoms.Label error={error}>{error || 'Schedule'}</Atoms.Label>
                </Atoms.LogoContainer>
                <Atoms.FieldsContainer>
                    <Atoms.Input
                        onChangeText={this.handleFieldChange('email')}
                        placeholder="email"
                        keyboardType="email-address"
                    />
                    <Atoms.Input
                        onChangeText={this.handleFieldChange('password')}
                        placeholder="password"
                        secureTextEntry
                    />

                    <Atoms.Button
                        title={isLogin ? 'Log in' : 'Sign In'}
                        fontColor="#fff"
                        onPress={this.handleLoginButtonPress}
                        disabled={!this.validate()}
                        login={isLogin}
                        bold
                    />

                    <Atoms.LinksRow>
                        {isLogin ? (
                            <Atoms.Link title="Forgot Password?" fontColor="#fff" onPress={() => ({})} />
                        ) : (
                            <Text> </Text>
                        )}
                        <Atoms.Link
                            title={isLogin ? 'New Account?' : 'Has Account?'}
                            fontColor="#fff"
                            onPress={() =>
                                this.setState(prevState => ({
                                    isLogin: !prevState.isLogin
                                }))
                            }
                        />
                    </Atoms.LinksRow>
                </Atoms.FieldsContainer>
            </Atoms.Wrapper>
        );
    }
}
