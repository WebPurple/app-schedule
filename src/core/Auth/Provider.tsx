import React from 'react';
import md5Hex from 'md5-hex';
import { withFirebase, Firebase, FirebaseUser } from '../Firebase';
import { AuthContext } from './context';
import { User } from '../../types/scheme';
import { AuthNavigator } from '../../Navigator';
import { Placeholder } from '../../screen';

type Props = { firebase: Firebase };
type State = {
    user: User;
    additionalInfo: any;
    error: string | null;
    isLoading: boolean;
};

class Provider extends React.Component<Props, State> {
    state: State = {
        user: null,
        additionalInfo: null,
        error: null,
        isLoading: false
    };

    firebase = this.props.firebase;

    unsubscribe: () => void | undefined;

    componentDidMount() {
        this.unsubscribe = this.firebase.auth.onAuthStateChanged(this.handleAuthStateChanged);
    }

    componentDidUpdate(_: Props, prevState: State) {
        if (!prevState.user && this.state.user && this.state.error) {
            this.setState({error: null});
        }
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    handleAuthStateChanged = async (firebaseUser: FirebaseUser) => {
        if (this.state.user && !firebaseUser) {
            this.setState({ user: null, additionalInfo: null });
        } else if (!this.state.user && firebaseUser) {
            this.setState({ isLoading: true });

            const { email } = firebaseUser;
            const hash = md5Hex(email);
            const usersRef = this.firebase.db.ref('users');
            const currentUserRef = usersRef.child(hash);

            try {
                let user = await this.firebase.getRefValueOnce<User>(currentUserRef);
                if (!user) {
                    await currentUserRef.set({ ...this.state.additionalInfo, email });
                    user = await this.firebase.getRefValueOnce<User>(currentUserRef);
                }
                this.setState({ user });
            } catch (error) {
                this.handleError(error);
            }

            this.setState({ isLoading: false });
        }
    };

    handleSubmit = async (email: string, password: string, additionalInfo: any) => {
        try {
            if (additionalInfo) {
                this.setState({ additionalInfo });
                await this.firebase.auth.createUserWithEmailAndPassword(email, password);
            } else {
                await this.firebase.auth.signInWithEmailAndPassword(email, password);
            }
        } catch (error) {
            this.handleError(error);
        }
    };

    handleError = ({ message: error }: Error) => this.setState({ error });

    render() {
        const { isLoading, user, error } = this.state;

        if (isLoading) {
            return <Placeholder />;
        }

        if (!user || error) {
            return <AuthNavigator screenProps={{ error, onSubmit: this.handleSubmit }} />;
        }

        return <AuthContext.Provider value={user}>{this.props.children}</AuthContext.Provider>;
    }
}

export const AuthProvider = withFirebase<{}>(Provider);
