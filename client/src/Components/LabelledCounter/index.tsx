import React from 'react';
import { Typography } from '@material-ui/core';

import { IClasses } from '../../Common/Interfaces/IClasses';

interface ILabelledCounterProps {
    title: string,
    value?: string | number,
}

function LabelledCounter(props: ILabelledCounterProps): React.ReactElement {
    const {
        title,
        value,
    } = props;

    const style: IClasses = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    return (
        <div style={style}>
            <Typography>{ title }</Typography>
            <Typography variant="h2">{value !== undefined ? value : '0'}</Typography>
        </div>
    );
}

LabelledCounter.displayName = 'LabelledCounter';
export default LabelledCounter;
