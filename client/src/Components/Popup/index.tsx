import React, { useState } from 'react';

import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PopupTypeEnum from '../../Common/Enums/PopupEnums';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IConfirmationProp {
    open: boolean;
    title: string;
    message: string;
    confirmationCallback: (x: boolean) => void;
}

const PopupComponent: React.FC<IConfirmationProp> = (props: IConfirmationProp) => {
    const classes: IClasses = styles();

    const {
        open,
        title,
        message,
        confirmationCallback,
    } = props;

    const onClickCancel = () => confirmationCallback(false);
    const onClickConfirm = () => confirmationCallback(true);

    return (
        <Dialog open={open} keepMounted onClose={onClickCancel} className={classes.main}>
            <DialogTitle>
                { title }
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    { message }
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClickCancel} color="primary"> Cancel </Button>
                <Button onClick={onClickConfirm} color="primary"> Confirm </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PopupComponent;




/*
interface IForumProps {
    open: boolean,
    handleClose: void,
    popupType: PopupTypeEnum,
    popupMessage: string,
}

// TODO these props should be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PopUp: React.FC<IForumProps> = (props: IForumProps) => {
    const classes: IClasses = styles();

    const { open, handleClose, popupType, popupMessage } = props;

    const SetTitle = () => {
        switch (popupType) {
            case PopupTypeEnum.ERROR: return 'Error';
            case PopupTypeEnum.WARNING: return 'Warning';
            case PopupTypeEnum.INFO: return 'Info';
            default:
                return "Error loading title...";
        }
    }

    return (
        <section className={classes.mainContainer}>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">{SetTitle()}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        { popupMessage }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Okay </Button>
                </DialogActions>
            </Dialog>
        </section>
    );
};

export default PopUp;
*/
