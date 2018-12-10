import parser from 'cron-parser';
import { IEvent } from '../types/Event.type';
import { compareAsc, addMinutes, getISOWeek } from 'date-fns';
import { randomizeColor } from '../utils/randomizeColor';
import { PAIR_DURATION } from '../config/constants';

type Cron = string;
type Lector = string;

enum EventWeekType {
    'numerator',
    'denominator',
    'both',
}

type SequenceData = {
    cron: Cron;
    room: string;
    lector: Lector | Lector[];
    isPractice: boolean;
    type: EventWeekType;
};

type RawEvent = {
    sequence: SequenceData[];
    title: string;
    description: string;
};

type GroupSchedule = {
    numeratorStartsOn: number;
    default: RawEvent[];
};
type UserInfo = {
    name: string;
    surname: string;
    photo: any;
    group: string;
    allowNotifications: boolean;
};

export const groupSchedule: GroupSchedule = {
    numeratorStartsOn: 40,
    default: [
        {
            title: 'Физика',
            description: 'Физика description',
            sequence: [
                {
                    cron: '10 8 * * 1',
                    room: '324',
                    lector: 'доц. Черкасова Ю.В.',
                    isPractice: false,
                    type: EventWeekType.both,
                },
                {
                    cron: '10 8 * * 3',
                    room: '353',
                    lector: ['доц. Иняков ВВ', 'доц. Николаев'],
                    isPractice: true,
                    type: EventWeekType.denominator,
                },
                {
                    cron: '55 9 * * 3',
                    room: '307a',
                    lector: 'доц. Черкасова Ю.В.',
                    isPractice: true,
                    type: EventWeekType.numerator,
                },
            ],
        },
        {
            title: 'Физичекская культура',
            description: 'Физичекская культура description',
            sequence: [
                {
                    cron: '55 9 * * 1',
                    isPractice: true,
                    room: '-',
                    lector: '-',
                    type: EventWeekType.both,
                },
                {
                    cron: '10 8 * * 4',
                    isPractice: true,
                    room: '-',
                    lector: '-',
                    type: EventWeekType.both,
                },
            ],
        },
        {
            title: 'Химия',
            description: 'Химия description',
            sequence: [
                {
                    cron: '40 11 * * 1',
                    isPractice: true,
                    lector: ['сп. Качанова Л.П.', 'асс. Штоль О.С.'],
                    room: '326',
                    type: EventWeekType.numerator,
                },
                {
                    cron: '55 9 * * 4',

                    isPractice: false,
                    lector: 'доц. Стрючкова Ю.М.',
                    room: '324',
                    type: EventWeekType.numerator,
                },
            ],
        },
        {
            title: 'ИНФОРМАТИКА',
            description: 'ИНФОРМАТИКА description',
            sequence: [
                {
                    cron: '35 13 * * 1',
                    lector: 'доц.  Швечкова О.Г.',
                    room: '324',
                    isPractice: false,
                    type: EventWeekType.both,
                },
                {
                    cron: '35 13 * * 2',
                    lector: 'доц.  Швечкова О.Г.',
                    room: '203',
                    isPractice: true,
                    type: EventWeekType.both,
                },
            ],
        },
        {
            title: 'Иностранный язык',
            description: 'Иностранный язык description',
            sequence: [
                {
                    cron: '10 8 * * 2',
                    lector: '-',
                    room: '316',
                    isPractice: true,
                    type: EventWeekType.both,
                },
            ],
        },
        {
            title: 'Математика',
            description: 'Математика description',
            sequence: [
                {
                    cron: '40 11 * * 1',
                    lector: 'Доц. Ильин М.Е.',
                    room: '106к2',
                    isPractice: true,
                    type: EventWeekType.denominator,
                },
                {
                    cron: '55 9 * * 2',
                    lector: 'Доц. Ильин М.Е.',
                    room: '423',
                    isPractice: false,
                    type: EventWeekType.both,
                },
                {
                    cron: '40 11 * * 2',
                    lector: 'Доц. Ильин М.Е.',
                    room: '415',
                    isPractice: true,
                    type: EventWeekType.both,
                },
                {
                    cron: '55 9 * * 5',
                    lector: 'Доц. Ильин М.Е.',
                    room: '358',
                    isPractice: false,
                    type: EventWeekType.numerator,
                },
            ],
        },
        {
            title: 'История',
            description: 'История description',
            sequence: [
                {
                    cron: '55 9 * * 3',
                    lector: 'доц. Ручкина Е.В.',
                    room: '307a',
                    isPractice: true,
                    type: EventWeekType.denominator,
                },
                {
                    cron: '40 11 * * 3',
                    lector: 'доц. Ручкина Е.В.',
                    room: '324',
                    isPractice: false,
                    type: EventWeekType.numerator,
                },
            ],
        },
        {
            title: 'Инженерная и компьютерная графика',
            description: 'Инженерная и компьютерная графика description',
            sequence: [
                {
                    cron: '10 8 * * 5',
                    lector: '',
                    room: '344',
                    isPractice: true,
                    type: EventWeekType.both,
                },
            ],
        },
    ],
};

const convertCronIntoDatesList = (sequenceItem: SequenceData, since: Date, to: Date, startsOn: number): Date[] => {
    const interval: any = parser.parseExpression(sequenceItem.cron, {
        currentDate: since,
        endDate: to,
        iterator: true,
    });

    let dates: Date[] = [];
    while (true) {
        try {
            const obj = interval.next() as any;
            const date = new Date(obj.value.toString());
            const isEven: boolean = (getISOWeek(date) - startsOn) % 2 === 0;
            const shouldBeAdded =
                (sequenceItem.type === EventWeekType.numerator && isEven) ||
                (sequenceItem.type === EventWeekType.denominator && !isEven) ||
                sequenceItem.type === EventWeekType.both;
            if (shouldBeAdded) {
                dates.push(date);
            }
        } catch (e) {
            break;
        }
    }

    return dates;
};

export const generateEventsForMonth = (rawEvents: GroupSchedule, from: Date, till: Date): IEvent[] => {
    const flattenedEvents: IEvent[] = rawEvents.default
        .map(({ sequence, ...otherInfo }: RawEvent) =>
            sequence
                .map((value: SequenceData) => convertCronIntoDatesList(value, from, till, rawEvents.numeratorStartsOn))
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

export const userInfo: UserInfo = {
    name: 'John',
    surname: 'Doe',
    photo: require('../../assets/userPhoto.png'),
    group: '121a',
    allowNotifications: true
}