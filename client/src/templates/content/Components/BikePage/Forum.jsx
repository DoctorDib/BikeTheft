import React from 'react';

import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import style from 'styles/Bike/forumStyle';
import { Typography } from '@material-ui/core';

// TODO - Remove when we have an operation database
import data from 'tmp_bike_data.json';

const Main = props => {
    const classes = style();
    const [value, setValue] = React.useState('');

    const forum = data.forum;

    const GetRecentComments = forum.reverse().map(obj => {
        return (
            <Paper className={classes.message} elevation={1} > 

                <Avatar alt="Remy Sharp" src=""> {obj.user_id}</Avatar>
                <Typography variant="caption"> {obj.datetime} </Typography>
                <Typography> {obj.message} </Typography>

            </Paper>
        );
    });

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <section style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}> 

            <Typography variant="h5"> Activity </Typography>

            <Typography variant="caption"> Found anything related to this bike? Every second counts! </Typography>
            <TextField
                id="outlined-multiline-flexible"
                className={classes.textBox}
                multiline
                rowsMax={4}
                value={value}
                onChange={handleChange}
                variant="outlined"
            />

            <Button variant="contained" color="primary" href="#post"> Post </Button>

            <section className={classes.messageContainer}>
                {GetRecentComments}
            </section>
        </section>
    );
}

export default Main;