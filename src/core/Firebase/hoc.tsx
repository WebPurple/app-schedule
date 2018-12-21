import React from 'react';
import { FirebaseContext } from './';

export function withFirebase<T = {}, S = {}>(WrappedComponent: React.ComponentClass<T, S> | React.SFC<T>) {
    return class extends React.Component<T, S> {
        render() {
            return (
                <FirebaseContext.Consumer>
                    {firebase => <WrappedComponent {...{firebase} as any} {...this.props} />}
                </FirebaseContext.Consumer>
            );
        }
    };
}
