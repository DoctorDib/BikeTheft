import React, { useState } from 'react';

import { API } from 'aws-amplify';

import {
    TextField,
    Typography,
    Chip,
} from '@material-ui/core';

import ImageUploaderComponent from '../ImageUploader';

import { DVLAAPIKEY } from '../../../../secrets/constants';
import { IInputFields, IChip } from '../../Common/Interfaces/interfaces';
import { BlankInputs } from '../../Helpers/Blanks';
import { IClasses } from '../../Common/Interfaces/IClasses';

import styles from './styles';

interface IImageUploaderProps {

}

let index = 0;

const VehicleUploadInputs: React.FC<IImageUploaderProps> = () => {
    const classes: IClasses = styles();

    const [input, setInput] = useState<IInputFields>(BlankInputs);
    const [numberPlateError, setNumberPlateError] = useState<boolean>(false);
    // Flag to determine if number plate has changed
    // if changed then we can make a call to DVLA
    const [numberPlateFlag, setNumberPlateFlag] = useState<boolean>(false);

    const onLeave = (event:React.FocusEvent<HTMLInputElement>) => {
        // Ensuring that we're only calling api if id is numberPlate
        // It's here just in case anyone accidentally adds the onLeave function to any other TextField
        if (event.target.id !== 'numberPlate') { return; }
        // Only making API calls if number plate flat has been raised
        if (!numberPlateFlag) { return; }

        setNumberPlateFlag(false);

        GetDVLAData(event.target.value);
    };

    const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.id;
        const newValue = event.target.value;

        if (key === 'numberPlate') { setNumberPlateFlag(true); }
        if (key === 'features' && newValue.includes(',')) { SetChipArray(newValue); return; }

        // Setting values
        setInput({ ...input, [key]: event.target.value });
    };

    const SetChipArray = (value:string) => {
        const inputValue = value.replace(',', '');

        const newChip:IChip = {
            key: index += 1,
            value: inputValue,
        };

        setInput({
            ...input,
            features: '',
            featuresArray: [...input.featuresArray, newChip],
        });
    };

    const handleDelete = (chipData: IChip) => () => {
        let newFeatureArray = input.featuresArray;
        newFeatureArray = newFeatureArray.filter((chip: IChip) => (chip.key !== chipData.key));
        setInput({
            ...input,
            featuresArray: newFeatureArray,
        });
    };

    const SetChips = input.featuresArray.map((chipData:IChip) => (
        <Chip
            key={chipData.key}
            label={chipData.value}
            color="secondary"
            className={classes.chip}
            onDelete={handleDelete(chipData)}
        />
    ));

    const GetDVLAData = async (numberPlate:string) => {
        const body = {
            body: {
                post: 443,
                key: DVLAAPIKEY,
                number_plate: numberPlate,
            },
        };

        await API.post('base_endpoint', '/external/dvla', body)
            .then((response) => {
                if (numberPlateError) { setNumberPlateError(false); }

                setInput({
                    ...input,
                    make: response.make,
                    primaryColour: response.colour,
                });
            })
            .catch(() => {
            // Only use for debugging
            // console.log("DVLA API Error: ", error);
                setNumberPlateError(true);
            });
    };

    const SetLabel = (key: string) => {
        switch (key) {
            case 'numberPlate': return 'Number Plate';
            case 'vin': return 'Vin';
            case 'make': return 'Make';
            case 'model': return 'Model';
            case 'primaryColour': return 'Primary Colour';
            case 'secondaryColour': return 'Secondary Colour';
            case 'features': return 'Features';
            case 'description': return 'Description';
            default: return 'Key not found...';
        }
    };

    const SetInputs = Object.keys(input).map((key:string):any => {
        switch (key) {
            case 'primaryColour':
            case 'secondaryColour':
                return (
                    <section className={classes.inputContainers}>
                        <TextField
                            id={key}
                            size="small"
                            label={SetLabel(key)}
                            variant="outlined"
                            value={input[key]}
                            onChange={onChange}
                            className={classes.input}
                        />
                        <section className={classes.colour} style={{ backgroundColor: input[key] }}> </section>
                    </section>
                );
            case 'numberPlate':
                return (
                    <section className={classes.inputContainers}>
                        <Typography
                            variant="caption"
                            style={{ display: numberPlateError ? 'block' : 'none', color: 'red' }}
                        >
                            Unknown number plate, please make sure you have entered it correctly!
                        </Typography>
                        <TextField
                            error={numberPlateError}
                            id={key}
                            size="small"
                            label={SetLabel(key)}
                            variant="outlined"
                            onChange={onChange}
                            onBlur={onLeave}
                            value={input[key]}
                            className={classes.input}
                        />
                    </section>
                );
            case 'features':
                return (
                    <section className={classes.inputContainers}>
                        <section className={classes.featureContainer}>
                            { SetChips }
                        </section>
                        <TextField
                            id={key}
                            size="small"
                            label={SetLabel(key)}
                            variant="outlined"
                            onChange={onChange}
                            onBlur={onLeave}
                            value={input[key]}
                            className={classes.input}
                            style={{ width: '100%' }}
                            multiline
                        />
                    </section>
                );
            case 'description':
                return (
                    <section className={classes.inputContainers}>
                        <TextField
                            id={key}
                            size="small"
                            label={SetLabel(key)}
                            variant="outlined"
                            onChange={onChange}
                            onBlur={onLeave}
                            value={input[key]}
                            className={classes.input}
                            style={{ width: '100%' }}
                            multiline
                        />
                    </section>
                );
            default:
                if (key === 'featuresArray') { break; }
                return (
                    <section className={classes.inputContainers}>
                        <TextField
                            id={key}
                            size="small"
                            label={SetLabel(key)}
                            variant="outlined"
                            onChange={onChange}
                            value={input[key]}
                            className={classes.input}
                        />
                    </section>
                );
        }

        return undefined;
    });

    return (
        <section className={classes.mainContainer}>
            <ImageUploaderComponent />
            {SetInputs}
        </section>
    );
};

export default VehicleUploadInputs;
