import React from 'react';
import { Image } from './atoms';

// tslint:disable-next-line:no-var-requires
const logo = require('../../../assets/logo.png');

type Props = { className?: string; size?: number };

export const Logo: React.SFC<Props> = ({ className, size }) => (
    <Image className={className} size={size} source={logo} />
);

Logo.defaultProps = {
    className: '',
    size: 32
};
