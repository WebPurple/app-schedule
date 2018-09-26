const colors = {
    grape: '#432867',
    warmGrey: '#a1a1a1',
    greyishBrown: '#545454',
    lipstick: '#e62270',
    vividPurple: '#9012fe',
    vividPurpleTwo: '#9013fe',
    cerise: '#ee2a7b',
    warmPurple: '#662d91',
    rouge: '#b21d3d',
    rosePink: '#f290b7',
    liliac: '#c788fe',
};

type Colors = typeof colors;

export type ColorName = keyof Colors;

export const theme = {
    colors,
};

export const getColor = (color: ColorName, defaultColor: string = 'transparent'): Colors[ColorName] => {
    if (!color || !colors[color]) {
        return defaultColor;
    }
    return colors[color];
};
