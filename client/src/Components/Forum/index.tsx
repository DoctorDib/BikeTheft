import React, {
    useEffect,
    useState,
} from 'react';
import {
    Paper,
    Avatar,
    TextField,
    Typography,
    Button,
} from '@material-ui/core';

import style from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

// TODO - Remove when we have an operation database
import data from '../../tmp_bike_data.json';

interface IComment {
    user_id: number;
    datetime: string; // TODO change to datetime
    message: string;
}
interface IForumProps {

}

// TODO these props should be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Forum: React.FC<IForumProps> = (props: IForumProps) => {
    const classes: IClasses = style();
    const [value, setValue] = useState<string>('');
    const [recentComments, setRecentComments] = useState<ReadonlyArray<IComment>>([]);

    const comments: ReadonlyArray<IComment> = data.forum;

    // TODO We need interfaces/types for all the data schema once we know what it is
    // TODO essentially all of this is temporary until that is set in stone in the db
    // TODO and then we map it to some local object

    useEffect(() => {
        // TODO temp, change to from db
        setRecentComments(comments);
    }, [comments]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
    };

    const onSubmit = (): void => {
        // User has clicked submit button
        setRecentComments((prevState) => [
            ...prevState,
            {
                user_id: Math.round(Math.random() * 100),
                datetime: (new Date().toLocaleString()),
                message: value,
            },
        ]);
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
                onChange={onChange}
                variant="outlined"
            />

            <Button
                variant="contained"
                color="primary"
                href="#post"
                onClick={onSubmit}
            >
                Post
            </Button>

            <section className={classes.messageContainer}>
                {
                    recentComments.map((comment: IComment) => (
                        <Paper className={classes.message} elevation={1} key={comment.user_id}>
                            <Avatar alt="Remy Sharp" src="">{comment.user_id}</Avatar>
                            <Typography variant="caption">{comment.datetime}</Typography>
                            <Typography>{comment.message}</Typography>
                        </Paper>
                    )).reverse()
                }
            </section>
        </section>
    );
};

export default Forum;
