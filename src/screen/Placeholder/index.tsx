import * as React from 'react';
import { Loader } from '../../components/Loader';
import { Wrapper } from './atoms';

export class Placeholder extends React.Component<{}, {}> {
    render() {
        return (
            <Wrapper>
                <Loader />
            </Wrapper>
        );
    }
}
