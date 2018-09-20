// @flow

import { EventInfo } from '../screen/CalendarFeed/DateInfo.type';
import type { ColorName } from '../styles/theme';

const availableColors: Array<ColorName> = [
  'lipstick',
  'vividPurple',
  'grape',
  'cerise',
  'warmPurple',
  'rouge',
];

export const randomizeColor = (value: EventInfo | string): ColorName => {
  const title: string = typeof value === 'string' ? value : value.title;
  const randomIndex = title.length % availableColors.length;
  return availableColors[randomIndex];
};
