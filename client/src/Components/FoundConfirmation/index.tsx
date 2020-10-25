import React, { useState } from 'react';

import {
    Modal,
    Backdrop,
    Fade,
    Paper,
    Typography,
    Button,
} from '@material-ui/core';

import { CheckCircle, Cancel } from '@material-ui/icons';
import { IPostAttributes, IImageSettings } from '../../Common/Interfaces/interfaces';
import { defaultPostAttributes } from '../../Common/Helpers/Defaults';

import { uploadImagesToS3 } from '../../Common/Helpers/helper';
import { sendPost } from '../../Common/Helpers/DB_Helpers';
import PostTypeEnums from '../../Common/Enums/PostTypeEnums';

import PopupComponent from '../Popup';
import ImageUploaderComponent from '../ImageUploader';
import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

import PostTypeEnums from '../../Common/Enums/PostTypeEnums';

interface IFoundConfirmationProps {
    ownerID: string;
    threadID: string;
    open: boolean;
    close: () => void;
}

const FoundConfirmation = (props: IFoundConfirmationProps): React.ReactElement<IFoundConfirmationProps> => {
    const classes: IClasses = styles();

    const { ownerID, threadID, open, close } = props;

    const [images, setImages] = useState<Array<IImageSettings>>([]);
    const [confirmationPopupOpen, setConfirmationPopupOpen] = useState<boolean>(false);

    const sendFoundBike = () => {
        const newProperties:IPostAttributes = defaultPostAttributes;
        newProperties.message = 'A user may have found your vehicle! Please confirm the image above that this is your vehicle';
        newProperties.confirmation_image = images[0];
        newProperties.active_state = true;

        uploadImagesToS3(ownerID, images, 'found');
        sendPost(threadID, '1', newProperties, PostTypeEnums.INFO);
        close();
    };

    const openPopup = () => setConfirmationPopupOpen(true);

    const confimrationPopupCallback = (response:boolean) => {
        setConfirmationPopupOpen(false);
        if (!response) { return; }
        sendFoundBike();
    };

    return (
        <Modal
            aria-labelledby="transition-modal-found"
            className={classes.modal}
            open={open}
            onClose={close}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Paper className={classes.paper} elevation={0}>
                    <Typography variant="h5">Confirmation</Typography>

                    <section className={classes.infomationBox}>
                        <Typography variant="body1">
                            This will send a message to the owner requesting a confirmation that you have found their bike.
                        </Typography>

                        <Typography variant="body1">
                            Please upload a picture of the vehicle for confirmation purposes.
                        </Typography>
                    </section>

                    <ImageUploaderComponent
                        images={images}
                        setImages={setImages}
                        maxImages={1}
                    />

                    <section className={classes.buttonContainer}>
                        <Button variant="contained" startIcon={<Cancel />} onClick={close} color="primary">
                            Cancel
                        </Button>
                        <Button variant="contained" startIcon={<CheckCircle />} onClick={openPopup} color="primary">
                            Confirm
                        </Button>
                    </section>

                    <PopupComponent
                        open={confirmationPopupOpen}
                        title="Confirmation"
                        message="Are you sure that this could be the owners vehicle?"
                        callback={confimrationPopupCallback}
                    />
                </Paper>
            </Fade>
        </Modal>
    );
};

export default FoundConfirmation;
