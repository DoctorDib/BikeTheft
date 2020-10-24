import React, { useState, useEffect } from 'react';

import classNames from 'classnames';

import { Paper, Accordion, AccordionDetails, Typography, CardMedia, Button } from '@material-ui/core';
import { Reply, Delete, Clear } from '@material-ui/icons';
import { sendPost, updatePost, updateVehicleStat } from '../../Common/Helpers/DB_Helpers';
import { FormatAvatar, FormatPostBackground } from './helper';

import PopupComponent from '../Popup';
import { IComment, IPostAttributes, IImageSettings } from '../../Common/Interfaces/interfaces';
import { defaultPostAttributes } from '../../Common/Helpers/Defaults';
import TextCommentComponent from '../CommentTextBox';

import { IClasses } from '../../Common/Interfaces/IClasses';
import style from './styles';

interface ICarouselProps {
    threadID: string;
    ownerID: string;
    vehicleID: number;
    comment: IComment;
    posts: Array<IComment>;
    ScrollToID: (x:number)=>void;
    currentHighlightedID: boolean;
}

const CommentComponent: React.FC<ICarouselProps> = (props: ICarouselProps) => {
    const classes: IClasses = style();

    const { threadID, ownerID, vehicleID, comment, posts, ScrollToID, currentHighlightedID } = props;

    const [replyParent, setReplyParent] = useState<React.ReactElement>();
    const [infoCard, setInfoCard] = useState<React.ReactElement>();
    const [avatar, setAvatar] = useState<React.ReactElement>();

    const [postPopupOpen, setPostPopupOpen] = useState<boolean>(false);
    const [popupVehicleConfirmation, setPopupVehicleConfirmation] = useState<boolean>(false);
    const [popupDenyConfirmation, setPopupDenyConfirmation] = useState<boolean>(false);
    const [deletePopupOpen, setDeletePopupOpen] = useState<boolean>(false);
    const [commentValue, setCommentValue] = useState<string>('');
    const [inputError, setInputError] = useState<boolean>(false);
    const [highlightStyle, setHighlightStyle] = useState();
    const [isExpanded, setExpand] = useState<boolean>(false);

    // TEMP comment in brackets
    const InfoComponent = (/* comment: IComment */) => (
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
                    onClick={onClickVehicleConfimration}
                >
                    Confirm
                </Button>
                <Button
                    className={classes.infoButton}
                    variant="contained"
                    color="primary"
                    onClick={onClickDenyConfimration}
                >
                    Deny
                </Button>
            </section>
        </section>
    );

    const addInfoCardFeatures = () => {
        const image:IImageSettings = comment.post_attributes.confirmation_image;
        if (image.name === undefined) { return; }
        
        const infoCardElement = (
            <section>
                <CardMedia
                    className={classes.confirmationImg}
                    component="img"
                    image={`https://images.lostmywheels.com/public/${ownerID}/found/${image.name}.${image.type}`}
                />
    
                { comment.post_attributes.active_state ? InfoComponent() : null }
            </section>
        );

        setInfoCard(infoCardElement);
    };

    const getCommentMessageFromQuote = ():IComment | null => {
        const targetCommentID = comment.post_attributes.replying_to;
        const message:Array<IComment> = posts.filter((post) => post.post_id === targetCommentID);
        if (!message.length) { return null; }
        return message[0];
    };

    const addReplyParent = () => {
        const parentComment:IComment | null = getCommentMessageFromQuote();
        if (parentComment === null) { return null; }

        const replyParentElement = (
            <Button
                onClick={() => ScrollToID(parentComment.post_id)}
                className={classes.quoteButton}
                disableFocusRipple
                disableRipple
            >
                <Paper
                    className={classes.quoteCommentContainer}
                    elevation={0}
                    key={comment.post_id}

                >
                    <section>
                        {FormatAvatar(parentComment, classes, false)}
                        <section className={classes.quotePostContainer}>
                            <Typography variant="caption">{parentComment.post_attributes.message}</Typography>
                        </section>
                    </section>
                </Paper>
            </Button>
        );

        setReplyParent(replyParentElement);
    };

    const onExpandClick = () => setExpand(!isExpanded);
    const onClickDelete = () => setDeletePopupOpen(true);
    const onClickVehicleConfimration = () => setPopupVehicleConfirmation(true);
    const onClickDenyConfimration = () => setPopupDenyConfirmation(true);

    const deletePopupCallback = (response:boolean) => {
        setDeletePopupOpen(false);

        if (!response) { return; }

        const newPostAttributes = comment.post_attributes;
        newPostAttributes.is_deleted = true;
        updatePost(comment.post_id, newPostAttributes);
    };
    const postPopupCallback = (response:boolean) => {
        setPostPopupOpen(false);
        if (!response) { return; }

        const newCommentAttributes:IPostAttributes = defaultPostAttributes;
        newCommentAttributes.message = commentValue;
        newCommentAttributes.replying_to = comment.post_id;
        setCommentValue('');
        sendPost(threadID, '1', newCommentAttributes, 1);
    };
    const vehicleConfirmationPopupCallback = (response:boolean) => {
        setPostPopupOpen(false);
        if (!response) { return; }

        let newPostAttributes = comment.post_attributes;
        newPostAttributes.active_state = false;
        updatePost(comment.post_id, newPostAttributes); // Disabling the "found" post

        newPostAttributes = defaultPostAttributes;
        newPostAttributes.replying_to = comment.post_id;
        newPostAttributes.message = 'Owner has confirmed vehicle and is planning to take action.';
        sendPost(threadID, '1', newPostAttributes, 2);

        // Set to pending pick up
        updateVehicleStat(vehicleID, 2);
    };
    const vehicleDenyPopupCallback = (response:boolean) => {
        setPostPopupOpen(false);
        if (!response) { return; }

        let newPostAttributes = comment.post_attributes;
        newPostAttributes.active_state = false;

        // Disabling the "found" post
        updatePost(comment.post_id, newPostAttributes);

        newPostAttributes = defaultPostAttributes;
        newPostAttributes.replying_to = comment.post_id;
        newPostAttributes.message = 'Owner has declined founders request.';
        sendPost(threadID, '1', newPostAttributes, 2);
    };

    const setTextValueCallback = (newVal:string) => setCommentValue(newVal);
    const setInputErrorCallback = (newVal:boolean) => setInputError(newVal);
    const onPostClickCallback = () => setPostPopupOpen(true);
    const toggleExpand = () => setExpand(!isExpanded);

    useEffect(() => setHighlightStyle(currentHighlightedID ? classes.highlight : ''), [currentHighlightedID]);

    useEffect(() => {
        addInfoCardFeatures();
        addReplyParent();
        setAvatar(FormatAvatar(comment, classes, true));
    }, [comment]);

    return (
        <Accordion
            className={classes.message}
            onChange={toggleExpand}
            style={{ backgroundColor: FormatPostBackground(comment.type) }}
            expanded={isExpanded}
        >
            <section
                id={`post-id-${comment.post_id.toString()}`}
                className={classNames(classes.mainContainer, highlightStyle)}
            >
                <section className={classes.messageContents}>
                    {avatar}

                    {comment.type === 2 ? infoCard : null}
                    {comment.post_attributes.replying_to === null || comment.post_attributes.replying_to === undefined
                        ? null
                        : replyParent}

                    <section className={classes.postContainer}>
                        <Typography>{comment.post_attributes.message}</Typography>
                    </section>
                </section>

                { comment.type !== 2 
                ? (<section className={classes.messageButtonContainer}>
                    <Delete className={classes.deleteIcon} onClick={onClickDelete} />
                    {isExpanded
                        ? <Clear className={classNames(classes.replyIcon, classes.replyIconClosed)} onClick={onExpandClick} />
                        : <Reply className={classNames(classes.replyIcon, classes.replyIconOpen)} onClick={onExpandClick} />}
                </section> )
                : null }
            </section>

            <AccordionDetails style={{ backgroundColor: '#f7f7f7' }}>
                <TextCommentComponent
                    isMainTextBox={false}
                    textValue={commentValue}
                    setTextValue={setTextValueCallback}
                    inputError={inputError}
                    setInputError={setInputErrorCallback}
                    onClickPost={onPostClickCallback}
                />
            </AccordionDetails>

            <PopupComponent
                open={deletePopupOpen}
                title="Delete post"
                message="Are you sure you wish to delete your post?"
                callback={deletePopupCallback}
            />

            <PopupComponent
                open={postPopupOpen}
                title="Post"
                message="Are you sure that you wish to post your comment?"
                callback={postPopupCallback}
            />

            <PopupComponent
                open={popupVehicleConfirmation}
                title="Vehicle confirmation"
                message="Please ensure that this is indeed your vehicle."
                callback={vehicleConfirmationPopupCallback}
            />

            <PopupComponent
                open={popupDenyConfirmation}
                title="Deny confimration"
                message="Please ensure that this is not your vehicle."
                callback={vehicleDenyPopupCallback}
            />

        </Accordion>
    );
};

export default CommentComponent;
