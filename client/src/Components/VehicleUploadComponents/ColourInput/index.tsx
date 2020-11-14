/* eslint-disable @typescript-eslint/no-namespace */
import React, { useState, useEffect } from 'react';
import { useFormikContext } from 'formik';

import { formatID } from '../helpers';
import DefaultTextInput from '../DefaultTextBox';
import { IInputFields } from '../../../Common/Interfaces/interfaces';
import { IClasses } from '../../../Common/Interfaces/IClasses';
import styles from './styles';

interface IColourInput {
    label:string,
    addToolTip?:boolean,
}

const NumberPlateInput = (props:IColourInput):React.ReactElement<IColourInput> => {
    const { label, addToolTip } = props;
    const { values } = useFormikContext<IInputFields>();
    const classes: IClasses = styles();
    const [colourValue, setColourValue] = useState<string>('white');
    const id = formatID(label);

    useEffect(():void => {
        const COLOUR_VALUE = values[id];
        if (typeof COLOUR_VALUE !== 'string') { return; }
        setColourValue(COLOUR_VALUE);
    }, [values[id]]);

    return (
        <>
            <DefaultTextInput label={label} addToolTip={addToolTip} />
            <section className={classes.colour} style={{ 'backgroundColor': colourValue }} />
        </>
    );
};

export default NumberPlateInput;
