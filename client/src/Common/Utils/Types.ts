export function isNullOrUndefined(value: unknown): boolean {
    return value === undefined || isNull(value);
}

export function isNull(value: unknown): boolean {
    return value === null;
}
