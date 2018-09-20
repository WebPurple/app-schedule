import { ColorName } from '../../styles/theme';

export type EventInfo = {
  title: string,
  startTime: Date,
  endTime: Date,
  description: string,
  color: ColorName,
};

export type DateInfo = {
  value: Date,
  isToday: boolean,
  events: Array<EventInfo>,
};
