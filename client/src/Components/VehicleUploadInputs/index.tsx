import React, { useState } from 'react';

import { API } from 'aws-amplify';

import classNames from 'classnames';

import {
    TextField,
    Typography,
    Chip,
    Grid,
    Button,
} from '@material-ui/core';

import InputToolTip from '../InputToopTip';

import { DVLAAPIKEY } from '../../../../secrets/constants';
import { IInputFields, IChip } from '../../Common/Interfaces/interfaces';
import { BlankInputs } from '../../Helpers/Blanks';
import { IClasses } from '../../Common/Interfaces/IClasses';

import ImageUploaderComponent from '../ImageUploader';

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

    const toolTipMessages = {
        primaryColour: 'The main Colour of your vehicle',
        secondaryColour: 'The second main colour of your vehicle',
        features: 'Write down identifiable features of your vehicle, seperate using commans: e.g "single black door, red wheels"',
        description: 'Write a short description of your vehicle, more information the better.',
    }

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

    const GetToolTip = (key:string) => {
        if (!toolTipMessages.hasOwnProperty(key)) { return false; }
        return toolTipMessages[key];

        // InputProps={{ endAdornment: ( <InputToolTip message={toolTipMessages[key]} />), }}
    }

    const ClearEverything = () => { 
        setInput(BlankInputs);
        setNumberPlateError(false);
    }

    const SetInputs = Object.keys(input).map((key:string):any => {
        switch (key) {
            case 'primaryColour':
            case 'secondaryColour':
                return (
                    <Grid item md={6} xs={12} className={classes.inputContainers}>
                        <TextField
                            id={key}
                            size="small"
                            label={SetLabel(key)}
                            variant="outlined"
                            value={input[key]}
                            onChange={onChange}
                            className={classes.input}
                            InputProps={{ endAdornment: ( <InputToolTip message={GetToolTip(key)} />), }}
                        />
                        <section className={classes.colour} style={{ backgroundColor: input[key] }}> </section>
                    </Grid>
                );
            case 'numberPlate':
                return (
                    <Grid item md={6} xs={12} className={classes.inputContainers}>
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
                        <Typography
                            variant="caption"
                            style={{ display: numberPlateError ? 'block' : 'none', color: 'red' }}
                        >
                            Unknown number plate, please make sure you have entered it correctly!
                        </Typography>
                    </Grid>
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
                            className={classNames(classes.input, classes.featuresInput)}
                            multiline
                            InputProps={{ endAdornment: ( <InputToolTip message={GetToolTip(key)} />), }}
                        />
                    </section>
                );
            case 'description':
                return (
                    <section className={classNames(classes.inputContainers, classes.descriptionContainer)}>
                        <TextField
                            id={key}
                            size="small"
                            label={SetLabel(key)}
                            variant="outlined"
                            onChange={onChange}
                            onBlur={onLeave}
                            value={input[key]}
                            className={classes.input}
                            multiline
                            rows={6}
                            InputProps={{ endAdornment: ( <InputToolTip message={GetToolTip(key)} />), }}
                        />
                    </section>
                );
            default:
                if (key === 'featuresArray') { break; }
                return (
                    <Grid item md={6} xs={12} className={classes.inputContainers}>
                        <TextField
                            id={key}
                            size="small"
                            label={SetLabel(key)}
                            variant="outlined"
                            onChange={onChange}
                            value={input[key]}
                            className={classes.input}
                            InputProps={{ endAdornment: ( <InputToolTip message={GetToolTip(key)} />), }}
                        />
                    </Grid>
                );
        }

        return undefined;
    });

    return (
        <section className={classes.mainContainer}>
            <section className={classes.title}>
                <Typography variant="h5"> Vehicle Upload </Typography>
            </section>

            <ImageUploaderComponent />

            <Typography> The images you upload will be uploaded to an S3 bucket yo </Typography>

            <Grid container spacing={3} className={classes.gridContainer}>
                {SetInputs}
            </Grid>

            <section className={classes.controlButtons}>
                <Button variant="contained" color="primary" > Upload </Button>
                <Button variant="contained" color="primary" onClick={ClearEverything}> Clear </Button>
            </section>
        </section>
    );
};

export default VehicleUploadInputs;
