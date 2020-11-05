/* eslint-disable @typescript-eslint/no-namespace */
import React from 'react';
import classNames from 'classnames';
import {
    TextField, 
    Chip,
} from '@material-ui/core';

import InputToolTip from '../../ToopTip';
import { IChip } from '../../../Common/Interfaces/interfaces';
import { IClasses } from '../../../Common/Interfaces/IClasses';
import VehicleCategoryEnum from '../../../Common/Enums/VehicleCategoryEnum';
import styles from './styles';

interface IChipProps {
    value: string;
    setValues: (key:string, value:string | VehicleCategoryEnum) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>)=>void;
    featuresArray: Array<IChip>;
    setFeaturesArray: (x: Array<IChip>) => void;
}

let chipIndex = 0;
const errorMessage = 'Write down identifiable features of your vehicle, seperate using commans: e.g "single black door, red wheels"';

const VehicleUploadInputs = (props:IChipProps):React.ReactElement<IChipProps> => {
    const { value, setValues, handleChange, featuresArray, setFeaturesArray } = props;

    const classes: IClasses = styles();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;

        if (newValue.includes(',')) {
            setChipArray(newValue);
            setValues('features', '');
            return;
        }

        handleChange(event);
    };

    const handleDelete = (chipData: IChip) => () => {
        let newFeatureArray = featuresArray;
        newFeatureArray = newFeatureArray.filter((chip: IChip) => chip.key !== chipData.key);
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
                id='features'
                size="small"
                label="Vehicle Features"
                variant="outlined"
                onChange={onChange}
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
