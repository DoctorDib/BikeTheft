import React, {
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

import {
    IPosts,
    IComment,
} from '../../Common/Interfaces/interfaces';

interface IForumProps {
    posts: IPosts
}

// TODO these props should be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Forum: React.FC<IForumProps> = (props: IForumProps) => {
    const classes: IClasses = style();
    const [value, setValue] = useState<string>('');
    const { posts } = props;

    // TODO We need interfaces/types for all the data schema once we know what it is
    // TODO essentially all of this is temporary until that is set in stone in the db
    // TODO and then we map it to some local object

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);
    };

    const onSubmit = (): void => {
        //
    };

    const LayoutComments = posts.posts.map((comment: IComment) => (
        <Paper className={classes.message} elevation={1} key={comment.display_name}>
            <Avatar alt="Remy Sharp" src="">{comment.profile_image}</Avatar>
            <Typography variant="caption">{comment.date_added}</Typography>
            <Typography>{comment.post_attributes.message}</Typography>
        </Paper>
    ));

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
                {LayoutComments}
            </section>
        </section>
    );
};

export default Forum;
