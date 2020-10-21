import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

import Confirmation from '../../Common/Enums/ConfirmationEnums';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IConfirmationProp {
    enumMessage: Confirmation;
    open: boolean;
    callback: (arg0: number, arg1: boolean) => void;
}

const FoundConfirmation: React.FC<IConfirmationProp> = (props: IConfirmationProp) => {
    const classes: IClasses = styles();

    const { enumMessage, callback, open } = props;

    const confirm = () => {
        callback(enumMessage, true);
    };

    const deny = () => {
        callback(enumMessage, false);
    };

    const SetMessage = () => {
        switch (enumMessage) {
            case Confirmation.CONFIRM_POST:
                return 'Are you sure you wish to post?';
            case Confirmation.CANCEL:
                return 'Are you sure you wish to cancel?';
            case Confirmation.CONFIRM_VEHICLE:
                return 'Are you sure you wish to confirm vehicle?';
            case Confirmation.CANCEL_VEHICLE:
                return 'Are you sure you wish to cancel vehicle?';
            default:
                return 'Confirmation';
        }
    };

    const SetConfirmButton = () => {
        switch (enumMessage) {
            case Confirmation.CONFIRM_POST:
            case Confirmation.CANCEL:
                return 'Yes';
            default:
                return 'Confirm';
        }
    };

    const SetCancelButton = () => {
        switch (enumMessage) {
            case Confirmation.CANCEL_VEHICLE:
                return 'No';
            default:
                return 'Cancel';
        }
    };

    return (
        <Dialog open={open} keepMounted onClose={deny} className={classes.main}>
            <DialogTitle> Confirmation </DialogTitle>
            <DialogContent>
                <DialogContentText>{SetMessage()}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={deny} color="primary">
                    {SetCancelButton()}
                </Button>
                <Button onClick={confirm} color="primary">
                    {SetConfirmButton()}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FoundConfirmation;
