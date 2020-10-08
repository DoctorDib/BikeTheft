import React, { useState } from 'react';

import {
    Tooltip,
    Typography,
} from '@material-ui/core';

import {
    HelpOutline
} from '@material-ui/icons';

import { withStyles } from '@material-ui/styles';

import styles from './styles';

interface IImageUploaderProps {
    message:string,
}

const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

const VehicleUploadInputs: React.FC<IImageUploaderProps> = (props: IImageUploaderProps) => {
   
    const { message } = props;
    console.log(message);

    return (
        <HtmlTooltip
            style={{ cursor: 'context-menu', display: (!message ? 'none' : 'block') }}
            title={
                <React.Fragment>
                    <Typography color="inherit"> { message } </Typography>
                </React.Fragment>
            }
        >
            <HelpOutline color="primary" />
        </HtmlTooltip>
    );
};

export default VehicleUploadInputs;
