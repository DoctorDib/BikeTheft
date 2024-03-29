/* eslint-disable @typescript-eslint/no-namespace */
import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useFormikContext, Field } from 'formik';

import ModifiedTextfield from '../ModifiedTextfield';
import { getToolTip, formatID } from '../helpers';
import InputToolTip from '../../ToopTip';
import { IInputFields, IChip } from '../../../Common/Interfaces/interfaces';
import { IClasses } from '../../../Common/Interfaces/IClasses';
import styles from './styles';

interface IDefaultInputProps {
    label: string,
    addToolTip?:boolean,
}

const DefaultTextInput = (props:IDefaultInputProps):React.ReactElement<IDefaultInputProps> => {
    const { label, addToolTip } = props;

    const { values, errors, setFieldValue, setFieldError } = useFormikContext<IInputFields>();

    const id:string = formatID(label);
    const classes: IClasses = styles();
    const [textFieldValue, setTextFieldValue] = useState<string | number | string[] | IChip[] | Date>(values[id]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        if (errors[id] === undefined) { setFieldError(id, ''); }
        setTextFieldValue(event.target.value);
    };

    const onBlur = ():void => {
        // ensuring rerender only if value has changed
        if (textFieldValue === values[id]) { return; }
        setFieldValue(id, textFieldValue);
    };

    const syncValue = ():void => {
        if (values[id] === textFieldValue) { return; }
        setTextFieldValue(values[id]);
    };

    useEffect(syncValue, [values[id]]);

    return (
        <>
            <Field
                id={id}
                label={label}
                placeholder={label}
                value={textFieldValue}
                onChange={onChange}
                onBlur={onBlur}
                component={ModifiedTextfield}
                className={classes.input}
                InputProps={{
                    endAdornment: addToolTip !== null
                        ? <InputToolTip message={getToolTip(id)} />
                        : null,
                }}
            />
            <Typography className={classes.errorMessage} variant="caption">
                {errors[id]}
            </Typography>
        </>
    );
};

export default DefaultTextInput;
