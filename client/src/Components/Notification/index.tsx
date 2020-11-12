import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { INotification } from '../../Common/Interfaces/interfaces';

interface INotificationProp {
    open: boolean;
    onClose: () => void;
    notification: INotification;
}

const NotificationComponent = (props: INotificationProp): React.ReactElement<INotificationProp> => {
    const { open, onClose, notification } = props;

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity={notification.severty}>
                {notification.message}
            </Alert>
        </Snackbar>
    );
};

export default NotificationComponent;
