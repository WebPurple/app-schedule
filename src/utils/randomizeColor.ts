import { ColorName } from '../styles/theme';
import { IEvent } from '../types/Event.type';

const availableColors: ColorName[] = ['lipstick', 'vividPurple', 'grape', 'cerise', 'warmPurple', 'rouge'];

export const randomizeColor = (value: string | IEvent): ColorName => {
    const title = typeof value === 'string' ? value : value.title;
    const randomIndex = title.length % availableColors.length;
    return availableColors[randomIndex];
};
