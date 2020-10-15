import React from 'react';

import { Tooltip, Typography } from '@material-ui/core';

import { HelpOutline } from '@material-ui/icons';
import { withStyles } from '@material-ui/styles';

interface IImageUploaderProps {
    message: string | boolean;
}

const HtmlTooltip = withStyles(() => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: '220',
        fontSize: '12px',
        border: '1px solid #dadde9',
    },
}))(Tooltip);

const VehicleUploadInputs: React.FC<IImageUploaderProps> = (
    props: IImageUploaderProps,
) => {
    const { message } = props;

    return (
        <HtmlTooltip
            style={{
                cursor: 'context-menu',
                display: !message ? 'none' : 'block',
            }}
            title={
                <>
                    <Typography color="inherit">{message}</Typography>
                </>
            }
        >
            <HelpOutline color="primary" />
        </HtmlTooltip>
    );
};

export default VehicleUploadInputs;
