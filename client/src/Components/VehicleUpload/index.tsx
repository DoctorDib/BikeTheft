/* eslint-disable @typescript-eslint/no-namespace */
import React, { useState } from 'react';
import { API } from 'aws-amplify';
import classNames from 'classnames';
import {
    TextField, 
    Typography, 
    Grid, 
    Button, 
    Divider, 
    Backdrop,
    CircularProgress
} from '@material-ui/core';
import { useFormik } from 'formik';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

import InputToolTip from '../ToopTip';
import ImageUploaderComponent from '../ImageUploader';
import { 
    IInputFields, 
    IChip, 
    IImageSettings, 
    ICreateThreadResponse 
} from '../../Common/Interfaces/interfaces';
import { IClasses } from '../../Common/Interfaces/IClasses';
import styles from './styles';
import VehicleCategoryEnum from '../../Common/Enums/VehicleCategoryEnum';
import { isNullOrUndefinedOrEmpty } from '../../Common/Utils/Types';
import { defaultInputs } from '../../Common/Helpers/Defaults';
import { createNewThread } from '../../Common/Helpers/DB_Helpers';
import NumberPlateComponent from '../VehicleUploadComponents/NumberPlateInput';
import ChipFeaturesComponent from '../VehicleUploadComponents/ChipFeatures';
import { uploadImagesToS3 } from '../../Common/Helpers/helper';
import PopupComponent from '../Popup';
import NotificationComponent from '../Notification';
import NotificationEnums from '../../Common/Enums/NotificationEnum';

interface IVehicleUploadProps {}

interface IToolTipMessage {
    primaryColour: string;
    secondaryColour: string;
    features: string;
    description: string;
    [key: string]: string;
}

const MAXIMAGES = 4;
const GRIDSPACING = 6;

const VehicleUploadInputs = ():React.ReactElement<IVehicleUploadProps> => {
    const classes: IClasses = styles();

    const [numberPlateError, setNumberPlateError] = useState<string>('');
    const [featuresArray, setFeaturesArray] = useState<Array<IChip>>([]);
    const [images, setImages] = useState<Array<IImageSettings>>([]);
    const [uploadDisabled, setUploadDisabled] = useState<boolean>(false);
    const [confirmationPopup, setConfirmationPopup] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
    const [notificationMessage, setNotificationMessage] = useState<string>('');
    const [notificationSeverty, setNotificationSeverty] = useState<NotificationEnums>(NotificationEnums.INFO);

    const closeNotification = () => setNotificationOpen(false);

    const onLeave = (event: React.FocusEvent<HTMLInputElement>) => {
        // Ensuring that we're only calling api if id is numberPlate
        // It's here just in case anyone accidentally adds the onLeave function to any other TextField
        if (event.target.id !== 'numberPlate') {
            return;
        }
    };

    const getToolTip = (key: string): string | boolean => {
        if (!Object.prototype.hasOwnProperty.call(toolTipMessages, key)) {
            return false;
        }
        
        return toolTipMessages[key];
    };

    const clearEverything = (): void => {
        //setInputFields(defaultInputs);
        console.log("Clear");
    };

    const setNotification = (message:string, severty:NotificationEnums) => {
        setNotificationOpen(true);
        setNotificationMessage(message);
        setNotificationSeverty(severty);
        setUploadDisabled(true);
    };

    const success = (response:ICreateThreadResponse | boolean) => {
        if (typeof response === 'boolean') { return; }

        const message:string =
        `Success! Your vehicle has been uploaded
        Your post can be found at /post/${response.thread_id}`;

        setNotification(message, NotificationEnums.SUCCESS);

        setTimeout(() => {
            window.location.pathname = `post/${response.thread_id}`;
        }, 2000);
    };

    const uploadData = (): void => {
        if (values.numberPlate === '') {
            setNotification('Please ensure that you have filled out "Number Plate" input', NotificationEnums.ERROR);
            errors.numberPlate = 'Empty field';
            return;
        }

        setLoading(true);
        setUploadDisabled(true);

        // currently static upload to vehicles folder only
        uploadImagesToS3('1', images, 'vehicles')
            .then((s3Response:boolean) => {
                if (!s3Response) { 
                    setNotification('Error while uploading images... please try again later', NotificationEnums.ERROR);
                    return;
                }

                //inputFields.dateStolen = dateStolen;
                // Turning string capture into int

                // TODO - Will need to change the owner_id when login is setup
                createNewThread('1', values, featuresArray, images)
                    .then((threadResponse:boolean | ICreateThreadResponse) => {
                        if (!threadResponse) {
                            setNotification('Error while uploading to database... please try again later', NotificationEnums.ERROR);
                            return;
                        } else if (threadResponse.thread_id === -1) {
                            const message = 'Number plate has already been found in our database, please ensure you have entered the number plate and try again, if the issues persists then please contact support.';
                            setNotification(message, NotificationEnums.ERROR);
                            return;
                        }

                        setLoading(false);
                    
                        success(threadResponse);
                    }).catch((e) => {
                        console.log("HERE");
                        console.log(e);
                    });
            });
    };

    const toolTipMessages: IToolTipMessage = {
        primaryColour: 'The main Colour of your vehicle',
        secondaryColour: 'The second main colour of your vehicle',
        features:
            'Write down identifiable features of your vehicle, seperate using commans: e.g "single black door, red wheels"',
        description: 'Write a short description of your vehicle, more information the better.',
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
            ):undefined;
        },
    );

    const createTextBox = (
        label:string,
        onChange:((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void) | undefined, 
        textValue:IInputFields,
        error:boolean | undefined | string,
        addToolTip: boolean = false,
        useBlur: boolean = false,
    ):React.ReactElement => {
        const id = label.split(' ')[0].toLowerCase() + 
            label.split(' ').slice(1).join('');

        let hasErrors:boolean = false;
        if (typeof error === 'string') { hasErrors = error.length > 0; }
        if (typeof error === 'boolean') { hasErrors = error }

        return (
            <TextField
                id={id}
                label={label}
                onChange={onChange}
                value={textValue[id]}
                error={hasErrors}
                onBlur={useBlur ? onLeave : undefined}
                size="small"
                variant="outlined"
                className={classes.input}
                InputProps={{
                    endAdornment: addToolTip 
                        ? <InputToolTip message={getToolTip(label)} />
                        : null
                }}
            />
        );
    };

    const confirmationPopupCallback = (response:boolean) => {
        setConfirmationPopup(false);
        if (!response) { return; }
        uploadData();
    };

    const { handleSubmit, handleChange, errors, values, validateForm } = useFormik({
        initialValues: defaultInputs,
        onSubmit() { setConfirmationPopup(true); }
    });

    const setValues = (key:string, value:string | VehicleCategoryEnum) => {
        values[key] = value;
        validateForm(values);
    };

    const setErrors = (key:string, value:string) => {
        console.log("setting " + key + " to " + value);
        errors[key] = value;
    };

    return (
        <section className={classes.mainContainer}>
            <section className={classes.title}>
                <Typography variant="h5"> Vehicle Upload </Typography>
            </section>

            <section style={{width: '100%', marginBottom: '30px'}}>
                <ImageUploaderComponent images={images} setImages={setImages} maxImages={MAXIMAGES} />
                <Typography> The images you upload will be uploaded to an S3 bucket yo </Typography>
            </section>

            <form onSubmit={handleSubmit}>
                <section className={classes.mainContainer}>
                    <Grid container spacing={3} className={classes.gridContainer}>
                        
                        <Divider className={classes.divider} />
                        {/* IDENTIFICATION */}
                            <section className={classes.fieldSection}>
                            <section className={classes.fieldName}>
                                <Typography variant="h6"> Identification </Typography>
                            </section>
                            <Grid container spacing={GRIDSPACING} className={classes.fieldInputs}>
                                <Grid item sm={6} xs={12} className={classes.inputContainers}>
                                    <NumberPlateComponent 
                                        value={values.numberPlate} 
                                        setValues={setValues} 
                                        handleChange={handleChange} 
                                        error={numberPlateError}
                                        setError={setNumberPlateError}
                                    />
                                </Grid>

                                <Grid item sm={6} xs={12} className={classes.inputContainers}>
                                    {createTextBox("Vin", handleChange, values, errors.vin)}
                                    <Typography className={classes.errorMessage} variant="caption"> {errors.vin} </Typography>
                                </Grid>
                            </Grid>
                        </section>

                        <Divider className={classes.divider} />
                        {/* VEHICLE DETAILS */}
                        <section className={classes.fieldSection}>
                            <section className={classes.fieldName}>
                                <Typography variant="h6"> Details </Typography>
                            </section>
                            <Grid container spacing={GRIDSPACING} className={classes.fieldInputs}>
                                <Grid item sm={6} xs={12} className={classes.inputContainers}>
                                    {createTextBox("Make", handleChange, values, errors.make)}
                                    <Typography className={classes.errorMessage} variant="caption"> {errors.make} </Typography>
                                </Grid>

                                <Grid item sm={6} xs={12} className={classes.inputContainers}>
                                    {createTextBox("Model", handleChange, values, errors.model)}
                                    <Typography className={classes.errorMessage} variant="caption"> {errors.model} </Typography>
                                </Grid>

                                <Grid item xs={12} className={classes.inputContainers}>
                                    <TextField
                                        id="category"
                                        select
                                        label="Vehicle Category"
                                        value={values.category}
                                        onChange={handleChange}
                                        SelectProps={{ native: true }}
                                        helperText="Please select your vehicle category"
                                        variant="outlined"
                                    >
                                        { categoryOptions }
                                    </TextField>
                                </Grid>
                            </Grid>
                        </section>
                        
                        <Divider className={classes.divider} />
                        {/* VEHICLE LOOKS */}
                        <section className={classes.fieldSection}>
                            <section className={classes.fieldName}>
                                <Typography variant="h6"> Features </Typography>
                            </section>
                            <Grid container spacing={GRIDSPACING} className={classes.fieldInputs}>
                                <Grid item sm={6} xs={12} className={classes.inputContainers}>
                                    {createTextBox("Primary Colour", handleChange, values, errors.primaryColour, true)}
                                    <section className={classes.colour} style={{ backgroundColor: values['primaryColour'] }} />
                                    <Typography className={classes.errorMessage} variant="caption"> {errors.primaryColour} </Typography>
                                </Grid>

                                <Grid item sm={6} xs={12} className={classes.inputContainers}>
                                    {createTextBox("Secondary Colour", handleChange, values, errors.secondaryColour, true)}
                                    <section className={classes.colour} style={{ backgroundColor: values['secondaryColour'] }} />
                                    <Typography className={classes.errorMessage} variant="caption"> {errors.secondaryColour} </Typography>
                                </Grid>

                                <Grid item md={12} className={classes.inputContainers}>
                                    <ChipFeaturesComponent 
                                        value={values.features}
                                        setValues={setValues}
                                        handleChange={handleChange}
                                        featuresArray={featuresArray}
                                        setFeaturesArray={setFeaturesArray}
                                    />
                                </Grid>
                            </Grid>
                        </section>

                        <Divider className={classes.divider} />
                        {/* STOLEN INFORMATION */}
                        <section className={classes.fieldSection}>
                            <section className={classes.fieldName}>
                                <Typography variant="h6"> Stolen information </Typography>
                            </section>
                            <Grid container spacing={GRIDSPACING} className={classes.fieldInputs}>
                                <Grid item md={6} xs={12} className={classes.inputContainers}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DateTimePicker
                                            id="dateStolen"
                                            variant="outlined"
                                            label="Date Stolen"
                                            disableFuture
                                            value={values.dateStolen}
                                            onChange={handleChange}
                                            autoOk
                                            ampm={false}
                                            className={classes.input}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>

                                <Grid item md={6} xs={12} className={classes.inputContainers}>
                                    {createTextBox("Location", handleChange, values, false)}
                                </Grid>
                            </Grid>
                        </section>

                        <Divider className={classes.divider} />
                        {/* ADDITIONAL DETAILS */}

                        <section className={classes.fieldSection}>
                            <section className={classes.fieldName}>
                                <Typography variant="h6"> Additional information </Typography>
                            </section>
                            <Grid container spacing={GRIDSPACING} className={classes.fieldInputs}>
                                <Grid item md={12}  className={classNames(classes.inputContainers, classes.descriptionContainer)}>
                                    <TextField
                                        id="description"
                                        size="small"
                                        label="Description"
                                        variant="outlined"
                                        onChange={handleChange}
                                        onBlur={onLeave}
                                        value={values.description}
                                        className={classes.input}
                                        multiline
                                        rows={6}
                                        InputProps={{
                                            endAdornment: <InputToolTip message={getToolTip("description")} />,
                                        }}
                                    />
                                </Grid>
                            </Grid>  
                        </section>

                        <Divider className={classes.divider} />

                        <section className={classes.fieldSection}>
                            <section className={classes.fieldInputs}>
                                <section className={classes.controlButtons}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={clearEverything}
                                        disabled={uploadDisabled}
                                    >
                                        Clear
                                    </Button>
                                    <Button 
                                        variant="contained" 
                                        color="primary" 
                                        type="submit"
                                        disabled={uploadDisabled}
                                    >
                                        Upload
                                    </Button>
                                </section>
                            </section>
                        </section>
                    </Grid>
                </section>
            </form>

            <PopupComponent
                open={confirmationPopup}
                title="Vehicle upload confirmation"
                message="Are you sure you wish to upload your vehicle information?"
                confirmationCallback={confirmationPopupCallback}
            />

            <NotificationComponent 
                open={notificationOpen}
                onClose={closeNotification}
                message={notificationMessage}
                severty={notificationSeverty}
            />

            <Backdrop open={loading} style={{zIndex: 100}}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </section>
    );
};

export default VehicleUploadInputs;
