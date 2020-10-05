export const FormatInfoTitles = (key: string): string => {
    const returnKey = key.split('_');

    // TODO fix this mess
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < returnKey.length; i++) {
        returnKey[i] = returnKey[i].charAt(0).toUpperCase() + returnKey[i].substring(1);
    }

    return returnKey.join(' ');
};

export function HasProperty(x: unknown, y: string | number | symbol): boolean {
    return Object.prototype.hasOwnProperty.call(x, y);
}

export const FormatStatusText = (currentStat: number):string => {
    switch (currentStat) {
        case 1: return 'Stolen';
        case 2: return 'Pending collection';
        case 3: return 'Found and collected';
        default: return 'Loading...';
    }
};

export const FormatStatusColour = (currentStat: number): string => {
    switch (currentStat) {
        case 1: return 'red';
        case 2: return 'orange';
        case 3: return 'green';
        default: return 'gray';
    }
};
