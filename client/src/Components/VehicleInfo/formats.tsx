import React from 'react';
import {
    Typography,
    Grid,
    ListItem,
    ListItemText,
} from '@material-ui/core';

import { IVehicleInfo } from '../../Common/Interfaces/interfaces';
import { isEmpty } from '../../Common/Utils/Types';

const infoKeys: Array<string> = ['number_plate', 'vin', 'make', 'model', 'category'];

export const FormatInfoTitles = (key: string): string => {
    const returnKey = key.split('_');

    // TODO fix this mess
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < returnKey.length; i++) {
        returnKey[i] = returnKey[i].charAt(0).toUpperCase() + returnKey[i].substring(1);
    }

    return returnKey.join(' ');
};

export function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]; // o[propertyName] is of type T[K]
}

export function hasProperty(x: unknown, y: string | number | symbol): boolean {
    return Object.prototype.hasOwnProperty.call(x, y);
}

export const FormatInfo = (data : IVehicleInfo) => infoKeys.map((key: keyof IVehicleInfo) => (
    <Grid container key={`prop - ${key}`}>
        <Grid item xs={6}>
            <Typography>{FormatInfoTitles(key)}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>
                {' '}
                {isEmpty(getProperty(data, key)) ? 'N/A' : getProperty(data, key)}
                {' '}
            </Typography>
        </Grid>
    </Grid>
));

export const FormatFeatures = (features: Array<string>) => features.map((damage: string) => (
    <ListItem key={`damages - ${damage}`}>
        <ListItemText primary={damage} />
    </ListItem>
));

export const FormatStatusText = (currentStat: number) => {
    switch (currentStat) {
        case 1: return 'Stolen';
        case 2: return 'Pending collection';
        case 3: return 'Found and collected';
        default: return 'Loading...';
    }
};

export const FormatStatusColour = (currentStat: number) => {
    switch (currentStat) {
        case 1: return 'red';
        case 2: return 'orange';
        case 3: return 'green';
        default: return 'gray';
    }
};
