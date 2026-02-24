import { computed, signal } from '@angular/core';
import { ArraySignal } from '@interfaces';

export function arraySignal<T>(initialValue: T[] = []): ArraySignal<T> {
    const s = signal(initialValue);

    return {
        items: s.asReadonly(),

        // Push multiple items: [...old, ...new]
        push: (...items: T[]) => s.update((v) => [...v, ...items]),

        // Add to the beginning
        unshift: (...items: T[]) => s.update((v) => [...items, ...v]),

        // Remove last item
        pop: () => s.update((v) => v.slice(0, -1)),

        // Remove first item
        shift: () => s.update((v) => v.slice(1)),

        // Remove by condition (e.g., id)
        remove: (predicate: (item: T) => boolean) =>
            s.update((v) => v.filter((item) => !predicate(item))),

        // Update a specific index (important for forms/lists)
        updateAt: (index: number, newItem: T) =>
            s.update((v) => v.map((item, i) => (i === index ? newItem : item))),

        // Immutable Sort: Clone first, then sort
        sort: (compareFn?: (a: T, b: T) => number) =>
            s.update((v) => [...v].sort(compareFn)),

        clear: () => s.set([]),

        clone: () => arraySignal([...s()]),

        // Derived signal for length
        length: signal(s().length),

        // Reactive Queries (Computed)
        filter: (predicate) => computed(() => s().filter(predicate)),
        find: (predicate) => computed(() => s().find(predicate)),
        some: (predicate) => computed(() => s().some(predicate)),
        map: <U>(projection: (item: T) => U) => computed(() => s().map(projection)),
        slice: (start, end) => computed(() => s().slice(start, end)),
    };
}
