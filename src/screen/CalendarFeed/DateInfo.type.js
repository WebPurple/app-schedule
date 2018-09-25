// @flow
import type { ColorName } from '../../styles/theme';

export type EventInfo = {
    isToday: boolean,
    title: string,
    startTime: Date,
    endTime: Date,
    description: string,
    color: ColorName,
};
