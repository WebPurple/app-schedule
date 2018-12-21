import React from 'react';
import { NavigationContainerProps } from 'react-navigation';
import * as Atoms from './atoms';
import { Logo } from '../../../../components/Logo';

type Props = NavigationContainerProps;
type State = {
    isLector: boolean;
    firstName: string;
    lastName: string;
    middleName: string;
    groups: number[];
};
type Name = keyof Pick<State, 'firstName' | 'lastName' | 'middleName'>;

const loginProps = { login: false };

export class AdditionalInfoScreen extends React.Component<Props, State> {
    state: State = {
        isLector: false,
        firstName: '',
        lastName: '',
        middleName: '',
        groups: [],
    };

    validate() {
        return !!this.state.groups.length;
    }

    handleContinueButtonPress = () => {
        const { email, password } = this.props.navigation.state.params;
        this.props.screenProps.onSubmit(email, password, this.state);
        this.props.navigation.goBack();
    };

    handleFieldChange = (field: Name) => (text: string) => this.setState({ [field]: text } as any);

    renderNameField(name: Name) {
        return <Atoms.Input placeholder={name} onChangeText={this.handleFieldChange(name)} />;
    }

    render() {
        return (
            <Atoms.Wrapper {...loginProps}>
                <Atoms.LogoContainer>
                    <Logo size={100} />
                </Atoms.LogoContainer>
                <Atoms.ContentContainer>
                    <Atoms.FieldsContainer>
                        <Atoms.Row>
                            <Atoms.Text>Lector?</Atoms.Text>
                            <Atoms.StyledSwitch
                                value={this.state.isLector}
                                onValueChange={(isLector: boolean) => this.setState({ isLector })}
                            />
                        </Atoms.Row>

                        {this.renderNameField('firstName')}
                        {this.renderNameField('lastName')}
                        {this.renderNameField('middleName')}
                        {/* add sex */}
                        {/* change to flatlist + fetch data */}
                        <Atoms.Input
                            placeholder={this.state.isLector ? 'groups' : 'group'}
                            onChangeText={(str: string) => {
                                const groups = str.split(',').map(Number);
                                this.setState({ groups });
                            }}
                        />
                    </Atoms.FieldsContainer>
                    <Atoms.BottomContainer>
                        <Atoms.Button
                            title="Continue"
                            fontColor="#fff"
                            onPress={this.handleContinueButtonPress}
                            disabled={!this.validate()}
                            bold
                            {...loginProps}
                        />
                    </Atoms.BottomContainer>
                </Atoms.ContentContainer>
            </Atoms.Wrapper>
        );
    }
}
