/* eslint-disable @typescript-eslint/no-namespace */
import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';
import { TextField } from '@material-ui/core';

import InputToolTip from '../../ToopTip';
import { getToolTip } from '../helpers';
import { IInputFields } from '../../../Common/Interfaces/interfaces';
import { IClasses } from '../../../Common/Interfaces/IClasses';
import styles from './styles';

interface IDescriptionProps {
}

const DescriptionInput = ():React.ReactElement<IDescriptionProps> => {
    const { values, setFieldValue } = useFormikContext<IInputFields>();

    const classes: IClasses = styles();

    const [descriptionValue, setDescriptionValue] = useState<string>(values.description);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setDescriptionValue(event.target.value);
    };

    const onBlur = ():void => {
        if (values.description === descriptionValue) { return; }
        setFieldValue('description', values.description);
    };

    const syncValue = ():void => {
        if (values.description === descriptionValue) { return; }
        setDescriptionValue(values.description);
    };

    useEffect(syncValue, [values.description]);

    return (
        <TextField
            id="description"
            size="small"
            label="Description"
            variant="outlined"
            onChange={onChange}
            onBlur={onBlur}
            value={descriptionValue}
            className={classes.input}
            multiline
            rows={6}
            InputProps={{
                endAdornment: <InputToolTip message={getToolTip('description')} />,
            }}
        />
    );
};

export default DescriptionInput;
