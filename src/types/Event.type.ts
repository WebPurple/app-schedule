import { ColorName } from '../styles/theme';
import { Sequence } from './scheme';
export interface IEvent {
    sequence: Sequence;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    color: ColorName;
}

export interface DisplayedEvent extends IEvent {
    isToday: boolean;
    showDate: boolean;
}
