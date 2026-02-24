import { Signal } from '@angular/core';

export interface ArraySignal<T> {
    // Read-only access to the data
    readonly items: Signal<T[]>;

    // Array Mutation Methods
    push(...items: T[]): void;
    unshift(...items: T[]): void;
    pop(): void;
    shift(): void;
    remove(predicate: (item: T) => boolean): void;
    updateAt(index: number, newItem: T): void;
    sort(compareFn?: (a: T, b: T) => number): void;
    clear(): void;
    clone(): ArraySignal<T>;

    // Utility
    length: Signal<number>;

    /** Returns a computed signal of a filtered subset */
    filter(predicate: (item: T) => boolean): Signal<T[]>;
    /** Returns a computed signal of a single found item */
    find(predicate: (item: T) => boolean): Signal<T | undefined>;
    /** Returns a computed signal of whether at least one item matches */
    some(predicate: (item: T) => boolean): Signal<boolean>;
    /** Returns a computed signal of a mapped array */
    map<U>(projection: (item: T) => U): Signal<U[]>;
    /** Returns a computed signal of a section of the array. */
    slice(start?: number, end?: number): Signal<T[]>;
}
