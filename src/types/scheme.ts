type Cron = string;
type EmailHash = string;

export enum EventWeek {
    Numerator = 'NUMERATOR',
    Denominator = 'DENOMINATOR',
    Both = 'BOTH',
}

type EventWeekType = 'NUMERATOR' | 'DENOMINATOR' | 'BOTH';

export enum Sex {
    Male = 'MALE',
    Female = 'FEMALE',
}

type SexType = 'MALE' | 'FEMALE';

export enum Role {
    Student = 'STUDENT',
    Lector = 'LECTOR',
}

type RoleType = 'STUDENT' | 'LECTOR';

type Email = string;
type TDate = string;

export type User = {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    sex: SexType;
    email: Email;
    groups: string[]; // [1] only one for Student
    role: RoleType;
    admin: boolean;
};

export type Group = {
    number: string;
    schedule: string;
};

export type Sequence = {
    id: string;
    cron: Cron;
    year: number;
    numeratorStartsOn: number;
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

export type SubjectSchedule = {
    sequences: Sequence[];
    title: string;
    description: string;
};

export type GroupSchedule = {
    id: string;
    schedule: SubjectSchedule[];
};

export type Database = {
    users: Record<EmailHash, User>;
    groups: Record<Group['number'], Group>;
    schedules: Record<GroupSchedule['id'], GroupSchedule>;
};
