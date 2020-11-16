/* eslint-disable @typescript-eslint/no-namespace */
import React, { useState } from 'react';
import classNames from 'classnames';
import {
    Typography,
    Grid,
    Button,
    Divider,
    Backdrop,
    CircularProgress,
} from '@material-ui/core';
import { useFormik, FormikProvider } from 'formik';

import {
    IImageSettings,
    ICreateThreadResponse,
    INotification,
} from '../../Common/Interfaces/interfaces';
import ImageUploaderComponent from '../ImageUploader';
import { IClasses } from '../../Common/Interfaces/IClasses';
import styles from './styles';
import VehicleCategoryEnum from '../../Common/Enums/VehicleCategoryEnum';
import CountyEnum from '../../Common/Enums/CountyEnum';
import {
    defaultInputs,
    defaultNotification,
} from '../../Common/Helpers/Defaults';
import { createNewThread } from '../../Common/Helpers/DB_Helpers';
import { uploadImagesToS3 } from '../../Common/Helpers/helper';
import PopupComponent from '../Popup';
import NotificationComponent from '../Notification';
import NotificationEnums from '../../Common/Enums/NotificationEnum';
/* INPUT */
import DefaultTextInputComponent from '../VehicleUploadComponents/DefaultTextBox';
import ColourInputComponent from '../VehicleUploadComponents/ColourInput';
import DropDownInput from '../VehicleUploadComponents/DropDownInput';
import ChipFeaturesComponent from '../VehicleUploadComponents/ChipFeatures';
import NumberPlateComponent from '../VehicleUploadComponents/NumberPlateInput';
import DescriptionComponent from '../VehicleUploadComponents/DescriptionInput';
import DateTimeComponent from '../VehicleUploadComponents/DateTimeInput';

interface IVehicleUploadProps {}

const MAXIMAGES = 4;
const GRIDSPACING = 6;

const VehicleUploadInputs = ():React.ReactElement<IVehicleUploadProps> => {
    const classes: IClasses = styles();

    const [images, setImages] = useState<Array<IImageSettings>>([]);
    const [uploadDisabled, setUploadDisabled] = useState<boolean>(false);
    const [confirmationPopup, setConfirmationPopup] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
    const [notification, setNotification] = useState<INotification>(defaultNotification);

    const closeNotification = ():void => setNotificationOpen(false);

    const clearEverything = (): void => formik.setValues(defaultInputs);

    const setNewNotification = (message:string, severty:NotificationEnums):void => {
        setNotificationOpen(true);
        setNotification({
            message,
            severty,
        });
        setUploadDisabled(false);
        setLoading(false);
    };

    const success = (response:ICreateThreadResponse | boolean):void => {
        if (
            typeof response === 'boolean'
            || response.thread_id === undefined
            || response.thread_id === -1
        ) { return; }

        const message:string = `Success! Your vehicle has been uploaded
        Your post can be found at /post/${response.thread_id}`;

        setNewNotification(message, NotificationEnums.SUCCESS);

        setTimeout(():void => {
            window.location.pathname = `post/${response.thread_id}`;
        }, 2000);
    };

    const uploadData = (): void => {
        if (formik.values.numberPlate === '') {
            setNewNotification('Please ensure that you have filled out "Number Plate" input', NotificationEnums.ERROR);
            formik.errors.numberPlate = 'Empty field';
            return;
        }

        setLoading(true);
        setUploadDisabled(true);

        // currently static upload to vehicles folder only
        uploadImagesToS3('1', images, 'vehicles')
            .then((s3Response:boolean):void => {
                if (!s3Response) {
                    setNewNotification('Error while uploading images... please try again later', NotificationEnums.ERROR);
                    return;
                }

                // TODO - Will need to change the owner_id when login is setup
                createNewThread('1', formik.values, images)
                    .then((threadResponse:boolean | ICreateThreadResponse):void => {
                        console.log(threadResponse);
                        if (!threadResponse) {
                            setNewNotification('Error while uploading to database... please try again later', NotificationEnums.ERROR);
                            return;
                        }
                        if (typeof threadResponse !== 'boolean' && threadResponse.thread_id === -1) {
                            const message:string = `Number plate has already been found in our database, please ensure you have entered the number 
                                plate and try again, if the issues persists then please contact support.`;
                            setNewNotification(message, NotificationEnums.ERROR);
                            return;
                        }

                        setLoading(false);

                        success(threadResponse);
                    }).catch((error):void => {
                        console.log('HERE');
                        console.log(error);
                    });
            });
    };

    const confirmationPopupCallback = (response:boolean):void => {
        setConfirmationPopup(false);
        if (!response) { return; }
        uploadData();
    };

    const formik = useFormik({
        initialValues: defaultInputs,
        onSubmit() { setConfirmationPopup(true); },
    });

    return (
        <section className={classes.mainContainer}>

            <section className={classes.title}>
                <Typography variant="h5"> Vehicle Upload </Typography>
            </section>

            <section style={{ width: '100%', marginBottom: '30px' }}>
                <ImageUploaderComponent images={images} setImages={setImages} maxImages={MAXIMAGES} />
                <Typography>
                    Things to think about when picking the right images:
                </Typography>
                <ul>
                    <Typography variant="caption" component="li">
                        Number plates are often removed from the vehicle, so do not rely on just that.
                    </Typography>
                    <Typography variant="caption" component="li">
                        Include noticable marks that are on your vehicle if they apply to you.
                    </Typography>
                    <Typography variant="caption" component="li">
                        Make sure your images are well lit.
                    </Typography>
                    <Typography variant="caption" component="li">
                        Do not include pictures of yourself or friends / family for safety reasons.
                    </Typography>
                </ul>
            </section>

            <FormikProvider value={formik}>
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
                                    <NumberPlateComponent />
                                </Grid>

                                <Grid item sm={6} xs={12} className={classes.inputContainers}>
                                    <DefaultTextInputComponent label="Vin" />
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
                                    <DefaultTextInputComponent label="Make" />
                                </Grid>

                                <Grid item sm={6} xs={12} className={classes.inputContainers}>
                                    <DefaultTextInputComponent label="Model" />
                                </Grid>

                                <Grid item xs={12} className={classes.inputContainers}>
                                    <DropDownInput id="category" label="Vehicle Category" enumOptions={VehicleCategoryEnum} />
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
                                    <ColourInputComponent label="Primary Colour" addToolTip />
                                </Grid>

                                <Grid item sm={6} xs={12} className={classes.inputContainers}>
                                    <ColourInputComponent label="Secondary Colour" addToolTip />
                                </Grid>

                                <Grid item xs={12}>
                                    <ChipFeaturesComponent />
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
                                    <DateTimeComponent />
                                </Grid>
                                <Grid item md={6} xs={12} className={classes.inputContainers}>
                                    <DropDownInput key="category" label="County" enumOptions={CountyEnum} />
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
                                <Grid item md={12} className={classNames(classes.inputContainers, classes.descriptionContainer)}>
                                    <DescriptionComponent />
                                </Grid>
                            </Grid>
                        </section>

                        <Divider className={classes.divider} />

                        <section className={classes.fieldSection}>
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
                                    onClick={formik.submitForm}
                                    disabled={uploadDisabled}
                                >
                                    Upload
                                </Button>
                            </section>
                        </section>
                    </Grid>
                </section>
            </FormikProvider>

            <PopupComponent
                open={confirmationPopup}
                popup={{
                    title: 'Vehicle upload confirmation',
                    message: 'Are you sure you wish to upload your vehicle information?',
                }}
                confirmationCallback={confirmationPopupCallback}
            />

            <NotificationComponent
                open={notificationOpen}
                onClose={closeNotification}
                notification={notification}
            />

            <Backdrop open={loading} style={{ zIndex: 100 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </section>
    );
};

export default VehicleUploadInputs;
