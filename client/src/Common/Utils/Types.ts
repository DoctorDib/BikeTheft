export function isNullOrUndefined(value: unknown): value is null | undefined {
    return isUndefined(value) || isNull(value);
}

export function isNullOrUndefinedOrEmpty(value: unknown): boolean {
    return isEmpty(value) || isNullOrUndefined(value);
}

export function isNull(value: unknown): value is null {
    return value === null;
}

export function isUndefined(value: unknown): value is undefined {
    return value === undefined;
}

export function isEmpty(value: string | unknown): boolean {
    return value !== undefined && isString(value) && value.length === 0;
}

export function isString(value: unknown): value is string {
    return typeof value === 'string';
}
