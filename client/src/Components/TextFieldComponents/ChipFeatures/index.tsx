/* eslint-disable @typescript-eslint/no-namespace */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import {
    TextField,
    Chip,
} from '@material-ui/core';
import { useFormikContext } from 'formik';

import InputToolTip from '../../ToopTip';
import { IChip, IInputFields } from '../../../Common/Interfaces/interfaces';
import { IClasses } from '../../../Common/Interfaces/IClasses';
import { compareArrays } from '../../../Common/Helpers/helper';
import styles from './styles';

interface IChipProps {
}

let chipIndex = 0;
const HELPER_MESSAGE = 'Write down identifiable features of your vehicle, seperate using commans: e.g "single black door, red wheels"';

const VehicleUploadInputs = ():React.ReactElement<IChipProps> => {
    const { values, setFieldValue } = useFormikContext<IInputFields>();

    const [chipTextValue, setChipTextValue] = useState<string>('');
    const [featuresArray, setFeaturesArray] = useState<Array<IChip>>([]);

    const classes: IClasses = styles();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
        const newValue = event.target.value;

        if (newValue.includes(',')) {
            setChipArray(newValue);
            setChipTextValue('');
            return;
        }

        setChipTextValue(newValue);
    };

    const onBlur = ():void => {
        // ensuring rerender only if value has changed
        if (compareArrays(featuresArray, values.featuresArray)) { return; }
        setFieldValue('featuresArray', featuresArray);
    };

    const syncValue = ():void => {
        if (values.features === chipTextValue) { return; }
        setChipTextValue(values.features);
    };

    useEffect(syncValue, [values.features]);

    const handleDelete = (chipData: IChip) => ():void => {
        let newFeatureArray = featuresArray;
        newFeatureArray = newFeatureArray.filter(
            (chip: IChip) => chip.key !== chipData.key,
        );
        setFieldValue('featuresArray', newFeatureArray);
        setFeaturesArray(newFeatureArray);
    };

    const setChips:Array<React.ReactElement> = featuresArray.map((chipData: IChip):React.ReactElement => (
        <Chip
            key={chipData.key}
            label={chipData.value}
            color="secondary"
            className={classes.chip}
            onDelete={handleDelete(chipData)}
        />
    ));

    const setChipArray = (newValue: string):void => {
        const inputValue:string = newValue.replace(',', '');

        const newChip: IChip = {
            key: chipIndex += 1,
            value: inputValue,
        };

        setFeaturesArray([...featuresArray, newChip]);
    };

    return (
        <section className={classes.inputContainers}>
            <section className={classes.featureContainer}>{setChips}</section>
            <TextField
                id="features"
                size="small"
                label="Vehicle Features"
                variant="outlined"
                onChange={onChange}
                onBlur={onBlur}
                value={chipTextValue}
                className={classNames(classes.input, classes.featuresInput)}
                multiline
                InputProps={{
                    endAdornment: <InputToolTip message={HELPER_MESSAGE} />,
                }}
            />
        </section>
    );
};

export default VehicleUploadInputs;
