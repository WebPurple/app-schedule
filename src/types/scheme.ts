type Cron = string;
type MD5Hash = string;

export enum EventWeek {
    Numerator = 'NUMERATOR',
    Denominator = 'DENOMINATOR',
    Both = 'BOTH'
}

type EventWeekType = 'NUMERATOR' | 'DENOMINATOR' | 'BOTH';

export enum Sex {
    Male = 'MALE',
    Female = 'FEMALE'
}

type SexType = 'MALE' | 'FEMALE';

export enum Role {
    Student = 'STUDENT',
    Lector = 'LECTOR'
}

type RoleType = 'STUDENT' | 'LECTOR';

type Email = string;
type TDate = string;

export type User = {
    id: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    sex: SexType;

    email: Email;
    groups: string[]; // [1] only one for Student

    role: RoleType;
    admin: boolean;
};

type Group = {
    number: string;
    schedules: string[];
};

type SequenceData = {
    cron: Cron;
    year: number;
    room: string;
    lector: Email[];
    isPractice: boolean;
    type: EventWeekType;
    notes: Record<TDate, Note>;
};

type Note = {
    private: boolean;
    title: string;
    description: string;
    by: Email;
};

type RawEvent = {
    sequence: SequenceData[];
    title: string;
    description: string;
};

type Schedule = {
    id: string;
    schedule: RawEvent[];
};

export type Database = {
    users: Record<MD5Hash, User>;
    groups: Record<Group['number'], Group>;
    schedules: Record<Schedule['id'], Schedule>;
};
