import React from 'react';
import { AuthContext } from './context';

export function withAuth<T, S>(WrappedComponent: React.ComponentClass<T, S> | React.SFC<T>) {
    return class extends React.Component<T, S> {
        render() {
            return (
                <AuthContext.Consumer>
                    {user => <WrappedComponent {...{user} as any} {...this.props} />}
                </AuthContext.Consumer>
            );
        }
    };
}
