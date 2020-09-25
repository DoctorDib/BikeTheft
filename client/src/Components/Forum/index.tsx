import React from 'react';
import {
    Paper,
    Avatar,
    TextField,
    Typography,
    Button,
} from '@material-ui/core';

import style from './styles';

// TODO - Remove when we have an operation database
import data from '../../tmp_bike_data.json';

interface IForumProps {

}

// TODO these props should be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Main: React.FC<IForumProps> = (props: IForumProps) => {
    const classes: any = style();
    const [value, setValue] = React.useState<string>('');

    const { forum } = data;

    // TODO provide interface/type for obj & remove 'any'
    const GetRecentComments = forum.reverse().map((obj: any) => (
        <Paper className={classes.message} elevation={1} key={obj.user_id}>
            <Avatar alt="Remy Sharp" src="">{obj.user_id}</Avatar>
            <Typography variant="caption">{obj.datetime}</Typography>
            <Typography>{obj.message}</Typography>
        </Paper>
    ));

    const handleChange = (event: any) => {
        setValue(event.target.value);
    };

    return (
        <section style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center',
        }}
        >
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
};

export default Main;
