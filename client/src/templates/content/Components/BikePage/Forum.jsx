import React from 'react';

import Button from '@material-ui/core/Button';

import style from 'styles/Home/main';
import { Typography } from '@material-ui/core';

const Main = props => {
    const classes = style();

    return (
        <section style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}> 

            <Typography> testing </Typography>     

        </section>
    );
}

export default Main;