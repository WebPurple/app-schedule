import * as React from 'react';
import { ActivityIndicatorProps } from 'react-native';
import { Indicator } from './atoms';

type Props = Pick<ActivityIndicatorProps, 'size' | 'color'>;

export const Loader: React.SFC<Props> = ({ size, color }) => {
    return <Indicator size={size} color={color} />;
};

Loader.defaultProps = {
    size: 'large',
    color: '#c788fe'
};
