import React, { useState } from 'react';

import { IPostAttributes } from '../../Common/Interfaces/interfaces';
import { defaultPostAttributes } from '../../Common/Helpers/Defaults';

import { sendPost } from '../../Common/Helpers/DB_Helpers';
import PostTypeEnums from '../../Common/Enums/PostTypeEnums';

import { Modal, Backdrop, Fade, Paper, Typography, Button } from '@material-ui/core';

import { CheckCircle, Cancel } from '@material-ui/icons';

import ImageUploaderComponent from '../ImageUploader';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IFoundConfirmationProps {
    threadID: string;
    open: boolean;
    close: () => void;
}

const FoundConfirmation: React.FC<IFoundConfirmationProps> = (props: IFoundConfirmationProps) => {
    const classes: IClasses = styles();

    const { threadID, open, close } = props;

    const [images, setImages] = useState<Array<IImageSettings>>([]);

    const sendFoundBike = () => {
        const newProperties:IPostAttributes = defaultPostAttributes;
        newProperties.message = "A user may have found your vehicle! Please confirm the image above that this is your vehicle";
        newProperties.confirmation_image = "broken";
        newProperties.active_state = true;

        sendPost(threadID, '1', newProperties, PostTypeEnums.INFO);
        close;
    }

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
                    <Typography>
                        This will send a message to the owner requesting a confirmation that you have found their bike.
                    </Typography>

                    <Typography>Please upload a picture of the vehicle for confirmation purposes.</Typography>

                    <ImageUploaderComponent images={images} setImages={setImages} />

                    <section className={classes.buttonContainer}>
                        <Button variant="contained" startIcon={<CheckCircle />} onClick={sendFoundBike} color="primary">
                            Confirm
                        </Button>
                        <Button variant="contained" startIcon={<Cancel />} onClick={close} color="primary">
                            Cancel
                        </Button>
                    </section>
                </Paper>
            </Fade>
        </Modal>
    );
};

export default FoundConfirmation;
