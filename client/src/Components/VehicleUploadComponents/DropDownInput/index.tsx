/* eslint-disable @typescript-eslint/no-namespace */
import React, { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import { TextField } from '@material-ui/core';

import { isNullOrUndefinedOrEmpty } from '../../../Common/Utils/Types';
import { IInputFields } from '../../../Common/Interfaces/interfaces';
import CountyEnum from '../../../Common/Enums/CountyEnum';
import VehicleCategoryEnum from '../../../Common/Enums/VehicleCategoryEnum';
import { IClasses } from '../../../Common/Interfaces/IClasses';
import styles from './styles';

interface IDropDownProps {
    id: string,
    label: string,
    enumOptions: CountyEnum | VehicleCategoryEnum
}

const categoryOptions = (enumOptions: CountyEnum | VehicleCategoryEnum):Array<React.ReactElement | undefined> => Object.keys(enumOptions).map(
    (key: string, i: number | any): React.ReactElement | undefined => {
        const value: string = enumOptions[Object.keys(enumOptions)[i]];

        return !isNullOrUndefinedOrEmpty(value)
            ? (
                <option key={key} value={i}>
                    {value}
                </option>
            )
            : undefined;
    },
);

const DropDownInput = (props:IDropDownProps):React.ReactElement<IDropDownProps> => {
    const { id, label, enumOptions } = props;
    const { values, setFieldValue } = useFormikContext<IInputFields>();
    const classes:IClasses = styles();

    const OPTIONS = categoryOptions(enumOptions);
    const [dropDownValue, setDropDownValue] = useState<string>('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        setDropDownValue(event.target.value);
    };

    const onBlur = ():void => {
        if (values[id] === dropDownValue) { return; }
        setFieldValue(id, dropDownValue);
    };

    const syncValue = ():void => {
        if (values[id] === dropDownValue) { return; }
        setDropDownValue(Object.values(enumOptions).indexOf(values[id]));
    };

    useEffect(syncValue, [values[id]]);

    return (
        <TextField
            id={id}
            select
            label={label}
            onChange={onChange}
            onBlur={onBlur}
            value={dropDownValue}
            SelectProps={{ native: true }}
            variant="outlined"
            className={classes.input}
        >
            { OPTIONS }
        </TextField>
    );
};

export default DropDownInput;
