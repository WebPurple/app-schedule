declare module 'md5-hex' {
    const fn: (str: string) => string;
    export default fn;
}

declare module 'types/utils' {
    export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
    export type Subtract<T, K> = Omit<T, keyof K>;
    export type Override<OLD, NEW> = NEW & Subtract<OLD, NEW>;
    export type Writeable<T> = { -readonly [P in keyof T]-?: T[P] };
}