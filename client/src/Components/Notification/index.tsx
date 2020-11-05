import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import NotificationEnum from '../../Common/Enums/NotificationEnum';

interface INotificationProp {
    open: boolean;
    onClose: () => void;
    message:string;
    severty:NotificationEnum;
}

const NotificationComponent = (props: INotificationProp): React.ReactElement<INotificationProp> => {
    const { open, onClose, message, severty } = props;

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity={severty}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default NotificationComponent;
