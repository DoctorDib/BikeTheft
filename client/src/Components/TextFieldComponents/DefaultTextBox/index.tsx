/* eslint-disable @typescript-eslint/no-namespace */
import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { useFormikContext, Field } from 'formik';

import ModifiedTextfield from '../ModifiedTextfield';
import { getToolTip, formatID } from '../helpers';
import InputToolTip from '../../ToopTip';
import { IInputFields, IChip } from '../../../Common/Interfaces/interfaces';
import { IUserAttributes } from '../../../Common/Interfaces/users';
import { IClasses } from '../../../Common/Interfaces/IClasses';
import styles from './styles';
import { IUserDetails } from '../../../Common/Interfaces/users';

interface IDefaultInputProps {
    label: string,
    customPlaceholder?: string,
    addToolTip?:boolean,
    isPassword?:boolean,
    isRequired?:boolean,
}

const DefaultTextInput = (props:IDefaultInputProps):React.ReactElement<IDefaultInputProps> => {
    const { label, customPlaceholder, addToolTip, isPassword, isRequired } = props;

    const { values, errors, setFieldValue, setFieldError } = useFormikContext<IInputFields | IUserDetails>();

    const id:string = formatID(label);
    const classes: IClasses = styles();
    const [textFieldValue, setTextFieldValue] = useState<string | number | string[] | IChip[] | undefined | IUserAttributes | Date>(values[id]);

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
                placeholder={customPlaceholder ?? label}
                value={textFieldValue}
                onChange={onChange}
                onBlur={onBlur}
                component={ModifiedTextfield}
                className={classes.input}
                type={isPassword ? 'password' : 'text'}
                required={isRequired}
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
