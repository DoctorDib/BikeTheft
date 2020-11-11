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
import styles from './styles';

interface IChipProps {
}

let chipIndex = 0;
const errorMessage = 'Write down identifiable features of your vehicle, seperate using commans: e.g "single black door, red wheels"';

const VehicleUploadInputs = ():React.ReactElement<IChipProps> => {
    const { values, setFieldValue } = useFormikContext<IInputFields>();

    const [value, setValue] = useState<string>('');
    const [featuresArray, setFeaturesArray] = useState<Array<IChip>>([]);

    const classes: IClasses = styles();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        if (newValue.includes(',')) {
            setChipArray(newValue);
            setValue('');
            return;
        }

        setValue(newValue);
    };

    const onBlur = () => {
        // ensuring rerender only if value has changed
        if (featuresArray === values.featuresArray) { return; }
        setFieldValue('featuresArray', featuresArray);
    };

    const syncValue = () => {
        if (values.features === value) { return; }
        setValue(values.features);
    };

    useEffect(syncValue, [values.features]);

    const handleDelete = (chipData: IChip) => () => {
        let newFeatureArray = featuresArray;
        newFeatureArray = newFeatureArray.filter(
            (chip: IChip) => chip.key !== chipData.key,
        );
        setFieldValue('featuresArray', newFeatureArray);
        setFeaturesArray(newFeatureArray);
    };

    const setChips = featuresArray.map((chipData: IChip) => (
        <Chip
            key={chipData.key}
            label={chipData.value}
            color="secondary"
            className={classes.chip}
            onDelete={handleDelete(chipData)}
        />
    ));

    const setChipArray = (newValue: string) => {
        const inputValue = newValue.replace(',', '');

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
                value={value}
                className={classNames(classes.input, classes.featuresInput)}
                multiline
                InputProps={{
                    endAdornment: <InputToolTip message={errorMessage} />,
                }}
            />
        </section>
    );
};

export default VehicleUploadInputs;
