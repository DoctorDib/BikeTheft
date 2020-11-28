/* eslint-disable @typescript-eslint/no-namespace */
import React from 'react';
import { TextField } from '@material-ui/core';

import DefaultTextInput from '../DefaultTextBox';
import { IClasses } from '../../../Common/Interfaces/IClasses';
import styles from './styles';

interface IDescriptionProps {}

const DescriptionInput = ():React.ReactElement<IDescriptionProps> => {
    const classes: IClasses = styles();

    const DescriptionTextBox = (props:any):React.ReactElement<HTMLInputElement> => (
        <TextField
            size="small"
            label="Description"
            variant="outlined"
            className={classes.input}
            multiline
            rows={6}
            {...props}
            InputLabelProps={{
                shrink: true,
            }}
        />
    );

    return (
        <DefaultTextInput
            label="Description"
            addToolTip
            customComponent={DescriptionTextBox}
        />
    );
};

export default DescriptionInput;
