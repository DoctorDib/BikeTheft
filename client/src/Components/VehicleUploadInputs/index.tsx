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

import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import InputToolTip from '../ToopTip';

import VehicleCategoryEnum from '../../Common/Enums/VehicleCatehoryEnum';

import { AddNewVehicle } from '../../Helpers/DB_Helpers';
import { DVLAAPIKEY } from '../../../../secrets/constants';
import { IInputFields, IChip } from '../../Common/Interfaces/interfaces';
import { defaultInputs } from '../../Helpers/Defaults';
import { IClasses } from '../../Common/Interfaces/IClasses';

import PopupTypeEnums from '../../Common/Enums/PopupEnums';
import PopupComponent from '../Popup';

import ImageUploaderComponent from '../ImageUploader';

import styles from './styles';
import PopupTypeEnum from '../../Common/Enums/PopupEnums';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

interface IImageUploaderProps {
}

let index = 0;

interface IToolTipMessage {
    primaryColour: string,
    secondaryColour: string,
    features: string,
    description: string,
    [key: string]: string;
}

const SetCategoryOptions = Object.keys(VehicleCategoryEnum).map(
    (key:string) => {
        const intKey = parseInt(key, 10);
        const value = VehicleCategoryEnum[intKey];

        console.log(value);

        if (Number.isNaN(intKey)) { return; }
        return (
            <option key={key} value={intKey}>
                {value}
            </option>
        );
    },
);

const VehicleUploadInputs: React.FC<IImageUploaderProps> = () => {
    const classes: IClasses = styles();

    const [popup, setPopup] = useState<boolean>(false);
    const [popupType, setPopupType] = useState<PopupTypeEnum>(PopupTypeEnums.INFO);
    const [popupMessage, setPopupMessage] = useState<string>("");

    const [backdrop, setBackDrop] = useState<boolean>(false);

    const [uploadButton, setDisableUploadButton] = useState<boolean>(false);

    const [input, setInput] = useState<IInputFields>(defaultInputs);
    const [dateStolen, setDateStolen] = useState<Date>(new Date());
    const [numberPlateError, setNumberPlateError] = useState<boolean>(false);
    // Flag to determine if number plate has changed
    // if changed then we can make a call to DVLA
    const [numberPlateFlag, setNumberPlateFlag] = useState<boolean>(false);

    const toolTipMessages:IToolTipMessage = {
        primaryColour: 'The main Colour of your vehicle',
        secondaryColour: 'The second main colour of your vehicle',
        features: 'Write down identifiable features of your vehicle, seperate using commans: e.g "single black door, red wheels"',
        description: 'Write a short description of your vehicle, more information the better.',
    };

    const onLeave = (event:React.FocusEvent<HTMLInputElement>) => {
        // Ensuring that we're only calling api if id is numberPlate
        // It's here just in case anyone accidentally adds the onLeave function to any other TextField
        if (event.target.id !== 'numberPlate') { return; }
        // Only making API calls if number plate flat has been raised
        if (!numberPlateFlag) { return; }

        setNumberPlateFlag(false);
        setDisableUploadButton(false);

        GetDVLAData(event.target.value);
    };

    const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const key = event.target.id;
        const newValue = event.target.value;

        setDisableUploadButton(false);

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

    const SetCategory = (wheelPlan:string):number => {
        const wPStr = wheelPlan.toLowerCase();

        if (wPStr.includes('2') && wPStr.includes('wheel')) { return VehicleCategoryEnum.MOTORBIKE; }
        if (wPStr.includes('2') && wPStr.includes('axle')) { return VehicleCategoryEnum.CAR; }
        if (wPStr.includes('3') && wPStr.includes('axle')) { return VehicleCategoryEnum.TRUCK; }

        return VehicleCategoryEnum.NONE;
    };

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
                    category: SetCategory(response.wheelplan),
                    v5cVerificationDate: response.dateOfLastV5CIssued,
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
            case 'location': return 'Location';
            default: return 'Key not found...';
        }
    };

    const GetToolTip = (key:string):string|boolean => {
        if (!Object.prototype.hasOwnProperty.call(toolTipMessages, key)) { return false; }
        return toolTipMessages[key];
    };

    const ClearEverything = ():void => {
        setInput(defaultInputs);
        setNumberPlateError(false);
        setDisableUploadButton(true);
    };

    const UploadData = ():void => {
        if (numberPlateError || input.numberPlate === '') {
            setNumberPlateError(true);
            setPopupType(PopupTypeEnums.ERROR);
            setPopupMessage("Please ensure that you have selected the correct numberplate.");
            setPopup(true);
            return;
        }

        setDisableUploadButton(true);
        setBackDrop(true);

        input.dateStolen = dateStolen;
        // Turning string capture into int

        // TODO - Will need to change the owner_id when login is setup
        const success = AddNewVehicle(1, input);
        setBackDrop(false);

        if (success) { return; }

        // Error uploading
        setPopupType(PopupTypeEnums.ERROR);
        setPopupMessage("There was an unexpected error while uploading, please try again. If this problem persists, then contact us for support.");
        setPopup(true);

        setDisableUploadButton(false);
    };

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
                            InputProps={{ endAdornment: (<InputToolTip message={GetToolTip(key)} />) }}
                        />
                        <section className={classes.colour} style={{ backgroundColor: input[key] }}> </section>
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
                            value={input[key]}
                            onChange={onChange}
                            SelectProps={{ native: true }}
                            helperText="Please select your vehicle category"
                            variant="outlined"
                        >
                            {SetCategoryOptions}
                        </TextField>
                    </Grid>
                );
            case 'numberPlate':
                return (
                    <Grid item md={6} xs={12} className={classes.inputContainers}>
                        <TextField
                            required
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
                    <Grid item md={12} className={classes.inputContainers}>
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
                            InputProps={{ endAdornment: (<InputToolTip message={GetToolTip(key)} />) }}
                        />
                    </Grid>
                );
            case 'description':
                return (
                    <Grid item md={12} className={classNames(classes.inputContainers, classes.descriptionContainer)}>
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
                            InputProps={{ endAdornment: (<InputToolTip message={GetToolTip(key)} />) }}
                        />
                    </Grid>
                );
            default:
                // featuresArray should be a hidden value
                if (key === 'featuresArray' || key === 'v5cVerificationDate') { break; }

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
                            InputProps={{ endAdornment: (<InputToolTip message={GetToolTip(key)} />) }}
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
                <Button variant="contained" color="primary" onClick={UploadData} disabled={uploadButton}> Upload </Button>
                <Button variant="contained" color="primary" onClick={ClearEverything}> Clear </Button>
            </section>

            <Backdrop open={backdrop}>
                <CircularProgress color="primary" />
            </Backdrop>

            <PopupComponent 
                open={popup} 
                handleClose={() => setPopup(false)} 
                popupType={popupType} 
                popupMessage={popupMessage} 
            />
        </section>
    );
};

export default VehicleUploadInputs;
