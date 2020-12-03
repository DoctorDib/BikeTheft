import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { INotification } from '../../Common/Interfaces/interfaces';

interface INotificationProp {
    open: boolean;
    onClose: () => void;
    notification: INotification;
    customTime?: number;
}

const NotificationComponent = (props: INotificationProp): React.ReactElement<INotificationProp> => {
    const { open, onClose, notification, customTime } = props;

    return (
        <Snackbar open={open} autoHideDuration={customTime ?? 6000} onClose={onClose}>
            <Alert onClose={onClose} severity={notification.severity}>
                {notification.message}
            </Alert>
        </Snackbar>
    );
};

export default NotificationComponent;
