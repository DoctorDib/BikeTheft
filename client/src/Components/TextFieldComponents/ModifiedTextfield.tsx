import React from 'react';
import { TextField } from '@material-ui/core';

const ModifiedTextfield = (props:any):React.ReactElement => (
    <TextField
        {...props}
        InputLabelProps={{
            shrink: true,
        }}
    />
);

export default ModifiedTextfield;
