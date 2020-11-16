import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';

import styles from './styles';
import { IPopup } from '../../Common/Interfaces/interfaces';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IConfirmationProp {
    open: boolean;
    popup: IPopup;
    confirmationCallback: (x: boolean) => void;
}

const PopupComponent: React.FC<IConfirmationProp> = (props: IConfirmationProp) => {
    const classes: IClasses = styles();

    const {
        open,
        popup,
        confirmationCallback,
    } = props;

    const onClickCancel = () => confirmationCallback(false);
    const onClickConfirm = () => confirmationCallback(true);

    return (
        <Dialog open={open} keepMounted onClose={onClickCancel} className={classes.main}>
            <DialogTitle>
                { popup.title }
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    { popup.message }
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
