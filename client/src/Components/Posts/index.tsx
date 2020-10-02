import React, {
    useState,
} from 'react';
import {
    Paper,
    Avatar,
    TextField,
    Typography,
    Button,
    CardMedia ,
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

    const FormatPostBackground = (styleID: number) => {
        switch (styleID) {
            case 1: return 'white';
            case 2: return '#e3e3e3';
            default: return 'black';
        }
    };

    const FormatAvatar = (comment: IComment) => {
        const image = comment.type === 1 ? `../static/media/${comment.member_attributes.profile_image}` : 'I';
        const name = comment.type === 2 ? 'Info' : `${comment.member_attributes.display_name}`;

        return (
            <section className={classes.postContainer}> 
                <section className={classes.avatarContainer}>
                    <Avatar alt="Remy Sharp" src={image} className={classes.profileImage}> {image} </Avatar>
                    <section className={classes.avatarText}> 
                        <Typography variant="subtitle1"> {name} </Typography> 
                        <Typography variant="caption">{comment.date_added}</Typography>
                    </section>
                </section>
            </section>
        );
    };

    const AddInfoCardFeatures = (comment: IComment) => {
        return (
            <section>
                <CardMedia className={classes.confirmationImg} component="img" image={`../static/media/${comment.post_attributes.confirmation_image}`} />
                {/* TODO - ONLY MAKE IT ACCESSIBLE FOR THE OWNER OF THE THREAD */}
                {/* Requires user accounts to be set up */}
                <section className={classes.buttonContainer}>
                    <Button className={classes.infoButton} variant="contained" color="primary"> Confirm </Button>
                    <Button className={classes.infoButton} variant="contained" color="primary"> Deny </Button>
                </section>
            </section>
        );
    };

    const LayoutComments = posts.posts.map((comment: IComment) => (
        <Paper className={classes.message} elevation={1} key={comment.member_attributes.display_name} 
        style={{ backgroundColor: FormatPostBackground(comment.type) }}>
            {FormatAvatar(comment)}
            
            {
                comment.type === 2 ? AddInfoCardFeatures(comment) : ''
            }
            <section className={classes.postContainer}> <Typography>{comment.post_attributes.message}</Typography> </section>
        </Paper>
    ));

    return (
        <section className={classes.mainContainer}>
            <Typography variant="h5"> Activity </Typography>
            <Typography variant="caption"> Found anything related to this vehicle? Every second counts! </Typography>

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
