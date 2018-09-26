import parser from 'cron-parser';
import { IEvent } from '../types/Event.type';
import { compareAsc, addMinutes } from 'date-fns';
import { randomizeColor } from '../utils/randomizeColor';
import { PAIR_DURATION } from '../config/constants';

type Cron = string;

type RawEvent = {
    sequence: Cron[];
    title: string;
    description: string;
};

type GroupSchedul = {
    default: RawEvent[];
};

export const groupSchedule: GroupSchedul = {
    default: [
        {
            sequence: ['10 8 * * 1', '10 8 * * 3', '55 9 * * 3'],
            title: 'Физика',
            description: 'Физика description',
        },
        {
            sequence: ['55 9 * * 1', '10 8 * * 4'],
            title: 'Физичекская культура',
            description: 'Физичекская культура description',
        },
        {
            sequence: ['40 11 * * 1', '55 9 * * 4'],
            title: 'Химия',
            description: 'Химия description',
        },
        {
            sequence: ['35 13 * * 1'],
            title: 'ИНФОРМАТИКА',
            description: 'ИНФОРМАТИКА description',
        },
        {
            sequence: ['10 8 * * 2'],
            title: 'Иностранный язык',
            description: 'Иностранный язык description',
        },
        {
            sequence: ['55 9 * * 2,5', '40 11 * * 2'],
            title: 'Математика',
            description: 'Математика description',
        },
        {
            sequence: ['35 13 * * 2'],
            title: 'ИНФОРМАТИКА',
            description: 'ИНФОРМАТИКА description',
        },
        {
            sequence: ['40 11 * * 3'],
            title: 'История',
            description: 'История description',
        },
        {
            sequence: ['10 8 * * 5'],
            title: 'Инженерная и компьютерная графика',
            description: 'Инженерная и компьютерная графика description',
        },
    ],
};

const convertCronIntoDatesList = (cronPattern: Cron, since: Date, to: Date): Date[] => {
    const interval: any = parser.parseExpression(cronPattern, {
        currentDate: since,
        endDate: to,
        iterator: true,
    });

    let dates: Date[] = [];
    while (true) {
        try {
            const obj = interval.next() as any;
            dates.push(new Date(obj.value.toString()));
        } catch (e) {
            break;
        }
    }

    return dates;
};

export const generateEventsForMonth = (rawEvents: RawEvent[], from: Date, till: Date): IEvent[] => {
    const flattenedEvents: IEvent[] = rawEvents
        .map(({ sequence, ...otherInfo }: RawEvent) =>
            sequence
                .map(cronTime => convertCronIntoDatesList(cronTime, from, till))
                .reduce((acc, i) => acc.concat(i), [])
                .map(startDate => {
                    return {
                        ...otherInfo,
                        startDate: startDate,
                        endDate: addMinutes(startDate, PAIR_DURATION),
                        color: randomizeColor(otherInfo.title),
                    };
                }),
        )
        .reduce((acc, i) => acc.concat(i), [])
        .sort((e1, e2) => compareAsc(e1.startDate, e2.startDate));
    return flattenedEvents;
};
