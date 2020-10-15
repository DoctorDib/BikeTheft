import React from 'react';

import {
    Modal,
    Backdrop,
    Fade,
    Paper,
    Typography,
    Button,
} from '@material-ui/core';

import { CheckCircle, Cancel } from '@material-ui/icons';

import ImageUploaderComponent from '../ImageUploader';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IFoundConfirmationProps {
    open: boolean;
    close: () => void;
}

const FoundConfirmation: React.FC<IFoundConfirmationProps> = (
    props: IFoundConfirmationProps,
) => {
    const classes: IClasses = styles();

    const { open, close } = props;

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
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
                        This will send a message to the owner requesting a
                        confirmation that you have found their bike.
                    </Typography>

                    <Typography>
                        Please upload a picture of the vehicle for confirmation
                        purposes.
                    </Typography>

                    <ImageUploaderComponent />

                    <section className={classes.buttonContainer}>
                        <Button
                            variant="contained"
                            startIcon={<CheckCircle />}
                            color="primary"
                        >
                            {' '}
                            Confirm
                            {' '}
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Cancel />}
                            onClick={close}
                            color="primary"
                        >
                            {' '}
                            Cancel
                            {' '}
                        </Button>
                    </section>
                </Paper>
            </Fade>
        </Modal>
    );
};

export default FoundConfirmation;
