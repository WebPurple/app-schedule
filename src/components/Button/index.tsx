import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Label } from './atoms';

export type Props = {
    onPress(): void;
    title?: string;
    disabled?: boolean;
    bold?: boolean;
    fontSize?: number;
    fontColor?: string;
    className?: string;
};

export const Button: React.SFC<Props> = ({ title, disabled, fontSize, fontColor, bold, onPress, ...rest }) => (
    <TouchableOpacity {...rest} onPress={onPress} disabled={disabled}>
        <Label size={fontSize} bold={bold} color={fontColor}>
            {title}
        </Label>
    </TouchableOpacity>
);

Button.defaultProps = {
    title: 'Button',
    disabled: false,
    bold: false,
    fontSize: 20,
    fontColor: '#000',
    className: ''
};
