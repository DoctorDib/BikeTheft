import React, { useState } from 'react';

import {
    Typography,
    Button,
    TextField,
    CardMedia,
    Paper
} from '@material-ui/core';

import ConfirmationComponent from '../../Components/Confirmation';

import {
    FormatAvatar,
    FormatPostBackground,
} from './helper';

import { SQLStringProtection } from '../../Helpers/helper';
import { SendPost, UpdatePost, UpdateVehicleStat } from '../../Helpers/DB_Helpers';

import { Confirmation } from '../../Common/Enums/ConfirmationEnums';

import style from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

import {
    IPosts,
    IComment,
} from '../../Common/Interfaces/interfaces';

interface IForumProps {
    posts: IPosts,
    vehicle_id: number,
}

// TODO these props should be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Forum: React.FC<IForumProps> = (props: IForumProps) => {
    const classes: IClasses = style();

    const [value, setValue] = useState<string>('');
    const [inputError, setInputError] = useState<boolean>(false);
    const [confirmation, setConfirmation] = useState(false)
    const [confirmationMessage, setConfirmationMessage] = useState<number>(Confirmation.CANCEL);
    const [selectedPost, setSelectedPost] = useState<IComment>();
    
    const { posts, vehicle_id } = props;

    // TODO We need interfaces/types for all the data schema once we know what it is
    // TODO essentially all of this is temporary until that is set in stone in the db
    // TODO and then we map it to some local object

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(event.target.value);

        if (inputError) setInputError(false);
    }

    const onPostSubmit = (): void => {
        if(value === '') {
            setInputError(true);
            return; 
        }

        setConfirmationMessage(Confirmation.CONFIRM_POST);
        setConfirmation(true);
    }

    const onVehicleConfirm = (comment:IComment, userInput:boolean) => {
        console.log(comment)
        setSelectedPost(comment);

        if (userInput) {
            setConfirmationMessage(Confirmation.CONFIRM_VEHICLE);
        } else {
            setConfirmationMessage(Confirmation.CANCEL_VEHICLE);
        }
        
        setConfirmation(true);
    }

    const callback = (enumMessage:number, response:boolean) => {
        setConfirmation(false);

        switch(enumMessage) {
            case Confirmation.CONFIRM_POST:
                if (!response) return;
                let postMessage = SQLStringProtection(value);
                setValue('');
                SendPost(1, "1", { "message": postMessage }, 1);
                break;

            case Confirmation.CONFIRM_VEHICLE:
            case Confirmation.CANCEL_VEHICLE:

                console.log(selectedPost);

                let newAttributes: any = selectedPost.post_attributes;
                newAttributes.active_state = false;

                // Disabling the "found" post
                UpdatePost(selectedPost.post_id, newAttributes);

                console.log(response);
                
                if (!response) return;

                let attributes = { message: '' };

                if (Confirmation.CONFIRM_VEHICLE) {
                    attributes.message = "Owner has confirmed vehicle and is planning to take action.";
                } else {
                    attributes.message = "Owner has declined founders request.";
                }

                console.log("ID", vehicle_id)

                // Sending comment to notify other users of update
                SendPost(1, "1", attributes, 2);

                // Set to pending pickup
                UpdateVehicleStat(vehicle_id, 2);
                
                break;
        }

        console.log("Hi");
    };

    const InfoComponent = (comment:IComment) => (
        <section>
            <section className={classes.waitingText}>
                <Typography> Waiting for users response </Typography>
            </section>

            {/* TODO - ONLY MAKE IT ACCESSIBLE FOR THE OWNER OF THE THREAD */}
            {/* Requires user accounts to be set up */}
            <section className={classes.buttonContainer}>
                <Button
                    className={classes.infoButton}
                    variant="contained"
                    color="primary"
                    onClick={() => { onVehicleConfirm(comment, true) }}
                > Confirm </Button>
                <Button
                    className={classes.infoButton}
                    variant="contained"
                    color="primary"
                    onClick={() => { onVehicleConfirm(comment, false) }}
                > Deny </Button>
            </section>
        </section>
    )

    const AddInfoCardFeatures = (comment: IComment) => (
        <section>
            { comment.post_attributes.hasOwnProperty('confirmation_image') ?
            <CardMedia
                className={classes.confirmationImg}
                component="img"
                image={`../static/media/${comment.post_attributes.confirmation_image}`}
            /> : ''
            }
            
            { comment.post_attributes.active_state ?  InfoComponent(comment) : '' }
        </section>
    );
    
    const LayoutComments = posts.posts.map((comment: IComment) => (
        <Paper
            className={classes.message}
            elevation={1}
            style={{ backgroundColor: FormatPostBackground(comment.type) }}
        >
            { FormatAvatar(comment, classes) }
            { comment.type === 2 ? AddInfoCardFeatures(comment) : '' }
            <section className={classes.postContainer}>
                <Typography>
                    {comment.post_attributes.message}
                </Typography>
            </section>
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
                error={inputError}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={onPostSubmit}
            >
                Post
            </Button>

            <ConfirmationComponent enumMessage={confirmationMessage} open={confirmation} callback={callback} />

            <section className={classes.messageContainer}>
                {LayoutComments}
            </section>
        </section>
    );
};

export default Forum;
