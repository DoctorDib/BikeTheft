/* eslint-disable @typescript-eslint/no-namespace */
import React, { useState } from 'react';
import { API } from 'aws-amplify';
import classNames from 'classnames';
import { TextField, Typography, Chip, Grid, Button } from '@material-ui/core';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import InputToolTip from '../ToopTip';
import VehicleCategoryEnum from '../../Common/Enums/VehicleCategoryEnum';
import ImageUploaderComponent from '../ImageUploader';
import { IInputFields, IChip, IImageSettings } from '../../Common/Interfaces/interfaces';
import { IClasses } from '../../Common/Interfaces/IClasses';
import styles from './styles';
import { isNullOrUndefinedOrEmpty } from '../../Common/Utils/Types';
import { defaultInputs } from '../../Common/Helpers/Defaults';
import { createNewThread } from '../../Common/Helpers/DB_Helpers';
import { uploadImagesToS3 } from '../../Common/Helpers/helper';

interface IImageUploaderProps {}

let chipIndex = 0;

interface IToolTipMessage {
    primaryColour: string;
    secondaryColour: string;
    features: string;
    description: string;
    [key: string]: string;
}

const VehicleUploadInputs: React.FC<IImageUploaderProps> = () => {
    const classes: IClasses = styles();

    const [images, setImages] = useState<Array<IImageSettings>>([]);

    const [inputFields, setInputFields] = useState<IInputFields>(defaultInputs);
    const [dateStolen, setDateStolen] = useState<Date>(new Date());
    const [numberPlateInError, setNumberPlateInError] = useState<boolean>(false);
    // Flag to determine if number plate has changed
    // if changed then we can make a call to DVLA
    const [numberPlateFlag, setNumberPlateFlag] = useState<boolean>(false);

    const toolTipMessages: IToolTipMessage = {
        primaryColour: 'The main Colour of your vehicle',
        secondaryColour: 'The second main colour of your vehicle',
        features:
            'Write down identifiable features of your vehicle, seperate using commans: e.g "single black door, red wheels"',
        description: 'Write a short description of your vehicle, more information the better.',
    };

    const onLeave = (event: React.FocusEvent<HTMLInputElement>) => {
        // Ensuring that we're only calling api if id is numberPlate
        // It's here just in case anyone accidentally adds the onLeave function to any other TextField
        if (event.target.id !== 'numberPlate') {
            return;
        }
        // Only making API calls if number plate flat has been raised
        if (!numberPlateFlag) {
            return;
        }

        setNumberPlateFlag(false);

        getDVLAData(event.target.value);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.id;
        const newValue = event.target.value;

        if (key === 'numberPlate') {
            setNumberPlateFlag(true);
        }
        if (key === 'features' && newValue.includes(',')) {
            setChipArray(newValue);
            return;
        }

        // Setting values
        setInputFields({ ...inputFields, [key]: event.target.value });
    };

    const setChipArray = (value: string) => {
        const inputValue = value.replace(',', '');

        const newChip: IChip = {
            key: chipIndex += 1,
            value: inputValue,
        };

        setInputFields({
            ...inputFields,
            features: '',
            featuresArray: [...inputFields.featuresArray, newChip],
        });
    };

    const handleDelete = (chipData: IChip) => () => {
        let newFeatureArray = inputFields.featuresArray;
        newFeatureArray = newFeatureArray.filter((chip: IChip) => chip.key !== chipData.key);
        setInputFields({
            ...inputFields,
            featuresArray: newFeatureArray,
        });
    };

    const setChips = inputFields.featuresArray.map((chipData: IChip) => (
        <Chip
            key={chipData.key}
            label={chipData.value}
            color="secondary"
            className={classes.chip}
            onDelete={handleDelete(chipData)}
        />
    ));

    const setCategory = (wheelPlan: string): number => {
        const wheelPlanLowerCase: string = wheelPlan.toLowerCase();

        if (wheelPlanLowerCase.includes('2') && wheelPlanLowerCase.includes('wheel')) {
            return VehicleCategoryEnum.MOTORBIKE;
        }
        if (wheelPlanLowerCase.includes('2') && wheelPlanLowerCase.includes('axle')) {
            return VehicleCategoryEnum.CAR;
        }
        if (wheelPlanLowerCase.includes('3') && wheelPlanLowerCase.includes('axle')) {
            return VehicleCategoryEnum.TRUCK;
        }

        return VehicleCategoryEnum.NONE;
    };

    const getDVLAData = async (numberPlate: string) => {
        const body = {
            body: {
                post: 443,
                key: import.meta.env.SNOWPACK_PUBLIC_DVLAAPIKEY,
                number_plate: numberPlate,
            },
        };

        await API.post('base_endpoint', '/external/dvla', body)
            .then((response) => {
                if (numberPlateInError) {
                    setNumberPlateInError(false);
                }

                setInputFields({
                    ...inputFields,
                    make: response.make,
                    primaryColour: response.colour,
                    category: setCategory(response.wheelplan),
                    v5cVerificationDate: response.dateOfLastV5CIssued,
                });
            })
            .catch((error) => {
                // Only use for debugging
                console.log('DVLA API Error: ', error);
                setNumberPlateInError(true);
            });
    };

    const setLabel = (key: string) => {
        switch (key) {
            case 'numberPlate':
                return 'Number Plate';
            case 'vin':
                return 'Vin';
            case 'make':
                return 'Make';
            case 'model':
                return 'Model';
            case 'primaryColour':
                return 'Primary Colour';
            case 'secondaryColour':
                return 'Secondary Colour';
            case 'features':
                return 'Features';
            case 'description':
                return 'Description';
            case 'location':
                return 'Location';
            default:
                return 'Key not found...';
        }
    };

    const getToolTip = (key: string): string | boolean => {
        if (!Object.prototype.hasOwnProperty.call(toolTipMessages, key)) {
            return false;
        }
        return toolTipMessages[key];
    };

    const clearEverything = (): void => {
        setInputFields(defaultInputs);
        setNumberPlateInError(false);
    };

    const uploadData = (): void => {
        inputFields.dateStolen = dateStolen;
        // Turning string capture into int

        // currently static upload to vehicles folder only
        uploadImagesToS3('1', images, 'vehicles');

        // TODO - Will need to change the owner_id when login is setup
        createNewThread('1', inputFields, images);
    };

    // eslint-disable-next-line no-undef
    const categoryOptions: ReadonlyArray<JSX.Element | undefined> = Object.keys(VehicleCategoryEnum).map(
        // eslint-disable-next-line no-undef
        (key: string, i: number): JSX.Element | undefined => {
            const value = VehicleCategoryEnum[i];

            return !isNullOrUndefinedOrEmpty(value) ? (
                <option key={key} value={i}>
                    {value}
                </option>
            ) : undefined;
        },
    );

    const inputComponents = Object.keys(inputFields).map(
        (key: string): React.ReactNode => {
            switch (key) {
                case 'primaryColour':
                case 'secondaryColour':
                    return (
                        <Grid item md={6} xs={12} className={classes.inputContainers}>
                            <TextField
                                id={key}
                                size="small"
                                label={setLabel(key)}
                                variant="outlined"
                                value={inputFields[key]}
                                onChange={onChange}
                                className={classes.input}
                                InputProps={{
                                    endAdornment: <InputToolTip message={getToolTip(key)} />,
                                }}
                            />
                            <section className={classes.colour} style={{ backgroundColor: inputFields[key] }} />
                        </Grid>
                    );
                case 'dateStolen':
                    return (
                        <Grid item md={6} xs={12} className={classes.inputContainers}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DateTimePicker
                                    id={key}
                                    variant="outlined"
                                    label="Date Stolen"
                                    disableFuture
                                    value={dateStolen}
                                    onChange={setDateStolen}
                                    autoOk
                                    ampm={false}
                                    className={classes.input}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    );
                case 'category':
                    return (
                        <Grid item xs={12} className={classes.inputContainers}>
                            <TextField
                                id={key}
                                select
                                label="Vehicle Category"
                                value={inputFields[key]}
                                onChange={onChange}
                                SelectProps={{ native: true }}
                                helperText="Please select your vehicle category"
                                variant="outlined"
                            >
                                {categoryOptions}
                            </TextField>
                        </Grid>
                    );
                case 'numberPlate':
                    return (
                        <Grid item md={6} xs={12} className={classes.inputContainers}>
                            <TextField
                                error={numberPlateInError}
                                id={key}
                                size="small"
                                label={setLabel(key)}
                                variant="outlined"
                                onChange={onChange}
                                onBlur={onLeave}
                                value={inputFields[key]}
                                className={classes.input}
                            />
                            <Typography
                                variant="caption"
                                style={{
                                    display: numberPlateInError ? 'block' : 'none',
                                    color: 'red',
                                }}
                            >
                                Unknown number plate, please make sure you have entered it correctly!
                            </Typography>
                        </Grid>
                    );
                case 'features':
                    return (
                        <Grid item md={12} className={classes.inputContainers}>
                            <section className={classes.featureContainer}>{setChips}</section>
                            <TextField
                                id={key}
                                size="small"
                                label={setLabel(key)}
                                variant="outlined"
                                onChange={onChange}
                                onBlur={onLeave}
                                value={inputFields[key]}
                                className={classNames(classes.input, classes.featuresInput)}
                                multiline
                                InputProps={{
                                    endAdornment: <InputToolTip message={getToolTip(key)} />,
                                }}
                            />
                        </Grid>
                    );
                case 'description':
                    return (
                        <Grid
                            item
                            md={12}
                            className={classNames(classes.inputContainers, classes.descriptionContainer)}
                        >
                            <TextField
                                id={key}
                                size="small"
                                label={setLabel(key)}
                                variant="outlined"
                                onChange={onChange}
                                onBlur={onLeave}
                                value={inputFields[key]}
                                className={classes.input}
                                multiline
                                rows={6}
                                InputProps={{
                                    endAdornment: <InputToolTip message={getToolTip(key)} />,
                                }}
                            />
                        </Grid>
                    );
                default:
                    // featuresArray should be a hidden value
                    if (key === 'featuresArray' || key === 'v5cVerificationDate') {
                        break;
                    }

                    return (
                        <Grid item md={6} xs={12} className={classes.inputContainers}>
                            <TextField
                                id={key}
                                size="small"
                                label={setLabel(key)}
                                variant="outlined"
                                onChange={onChange}
                                value={inputFields[key]}
                                className={classes.input}
                                InputProps={{
                                    endAdornment: <InputToolTip message={getToolTip(key)} />,
                                }}
                            />
                        </Grid>
                    );
            }

            return undefined;
        },
    );

    return (
        <section className={classes.mainContainer}>
            <section className={classes.title}>
                <Typography variant="h5"> Vehicle Upload </Typography>
            </section>

            <ImageUploaderComponent images={images} setImages={setImages} />

            <Typography> The images you upload will be uploaded to an S3 bucket yo </Typography>

            <Grid container spacing={3} className={classes.gridContainer}>
                {inputComponents}
            </Grid>

            <section className={classes.controlButtons}>
                <Button variant="contained" color="primary" onClick={uploadData}>
                    Upload
                </Button>
                <Button variant="contained" color="primary" onClick={clearEverything}>
                    Clear
                </Button>
            </section>
        </section>
    );
};

export default VehicleUploadInputs;
