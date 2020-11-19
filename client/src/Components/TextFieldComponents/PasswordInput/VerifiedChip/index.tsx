/* eslint-disable @typescript-eslint/no-namespace */
import React from 'react';
import { Typography } from '@material-ui/core';

import { IClasses } from '../../../../Common/Interfaces/IClasses';
import styles from './styles';

interface IVerifiedChipProp { 
    label: string;
    verified: boolean;
}

const NumberPlateInput = (props:IVerifiedChipProp):React.ReactElement<IVerifiedChipProp> => {
    const { label, verified } = props;
    const classes: IClasses = styles();

    return (
        <section className={classes.parentChipContainer}>
            <section className={classes.chipContainer}>
                <div 
                    className={classes.checker} 
                    style={{
                        backgroundColor: verified ? '#18c618' : 'white',
                        borderColor: verified ? '#18c618' : 'white'
                    }} 
                />
                <Typography variant="caption"> {label} </Typography>
            </section>
        </section>
    );
};

export default NumberPlateInput;
