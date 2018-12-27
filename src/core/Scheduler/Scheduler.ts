import parser from 'cron-parser';
import { isToday, startOfMonth, lastDayOfMonth, startOfDay, getYear } from 'date-fns';
import { compareAsc, addMinutes, getISOWeek } from 'date-fns';
import { IEvent, DisplayedEvent } from '../../types/Event.type';
import { EventWeek, GroupSchedule, SubjectSchedule, Sequence } from '../../types/scheme';
import { randomizeColor } from '../../utils/randomizeColor';
import { PAIR_DURATION } from '../../config/constants';

export class Scheduler {
    static generateCurrentMonth(date: Date, { schedule }: GroupSchedule): DisplayedEvent[] {
        const firstDay = startOfMonth(date);
        const lastDay = lastDayOfMonth(date);
        const events = Scheduler.generateEventsForMonth(schedule, firstDay, lastDay);
        let shownDatesStack = new Set();
        const month = events.map(event => {
            const day = startOfDay(event.startDate).toString();
            const isInSet = shownDatesStack.has(day);
            if (!isInSet) {
                shownDatesStack.add(day);
            }
            return {
                ...event,
                showDate: !isInSet,
                isToday: isToday(event.startDate),
            };
        });
        return month;
    }

    static generateEventsForMonth = (rawEvents: SubjectSchedule[], from: Date, till: Date): IEvent[] =>
        rawEvents
            .flatMap(({ sequences, ...otherInfo }) =>
                sequences.flatMap(sequence => {
                    const hasSameYear =
                        Scheduler.checkDateYear(from, sequence.year) && Scheduler.checkDateYear(till, sequence.year);
                    return hasSameYear
                        ? Scheduler.convertCronIntoDatesList(sequence, from, till).map(startDate => ({
                                ...otherInfo,
                                sequence,
                                startDate,
                                endDate: addMinutes(startDate, PAIR_DURATION),
                                color: randomizeColor(otherInfo.title),
                            }))
                        : [];
                }),
            )
            .sort((e1, e2) => compareAsc(e1.startDate, e2.startDate));

    static convertCronIntoDatesList = ({ cron, type, numeratorStartsOn }: Sequence, since: Date, to: Date): Date[] => {
        const interval = parser.parseExpression(cron, {
            currentDate: since,
            endDate: to,
            iterator: true,
        });

        let dates: Date[] = [];
        while (true) {
            try {
                const obj: any = interval.next();
                const date = new Date(obj.value.toString());
                const isEven = (getISOWeek(date) - numeratorStartsOn) % 2 === 0;
                const shouldBeAdded =
                    (type === EventWeek.Numerator && isEven) ||
                    (type === EventWeek.Denominator && !isEven) ||
                    type === EventWeek.Both;
                if (shouldBeAdded) {
                    dates.push(date);
                }
            } catch (e) {
                break;
            }
        }

        return dates;
    };

    static checkDateYear(date: Date, year: number) {
        return getYear(date) === year;
    }
}
