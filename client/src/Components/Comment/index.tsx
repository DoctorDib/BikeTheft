import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Paper, Accordion, AccordionDetails, Typography, CardMedia, Button } from '@material-ui/core';
import { Reply, Delete, Clear, Attachment } from '@material-ui/icons';
import {
    sendPost,
    updatePost,
    updateVehicleStat,
} from '../../Common/Helpers/DB_Helpers';
import {
    formatAvatar,
    FormatPostBackground,
} from './helper';
import ImageComponent from '../Image';
import PopupComponent from '../Popup';
import { IComment, IImageSettings } from '../../Common/Interfaces/interfaces';
import PostTypeEnum from '../../Common/Enums/PostTypeEnums';
import { defaultPostAttributes } from '../../Common/Helpers/Defaults';
import TextCommentComponent from '../CommentTextBox';
import { IClasses } from '../../Common/Interfaces/IClasses';
import style from './styles';
import { isNullOrUndefined } from '../../Common/Utils/Types';
import { uploadImagesToS3 } from '../../Common/Helpers/helper';

interface ICommentComponentProp {
    threadID: string;
    ownerID: string;
    vehicleID: number;
    comment: IComment;
    posts: Array<IComment>;
    ScrollToID: (x: number) => void;
    isHighlighted: boolean;
}

const CommentComponent = React.memo((props: ICommentComponentProp): React.ReactElement<ICommentComponentProp> => {
    const {
        ownerID,
        threadID,
        vehicleID,
        comment,
        posts,
        ScrollToID,
        isHighlighted,
    } = props;

    const classes: IClasses = style();

    const [postPopupOpen, setPostPopupOpen] = useState<boolean>(false);
    const [popupVehicleConfirmation, setPopupVehicleConfirmation] = useState<boolean>(false);
    const [popupDenyConfirmation, setPopupDenyConfirmation] = useState<boolean>(false);
    const [deletePopupOpen, setDeletePopupOpen] = useState<boolean>(false);
    const [commentValue, setCommentValue] = useState<string>('');
    const [inputError, setInputError] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [images, setImages] = useState<Array<IImageSettings>>([]);
    const [replyParent, setReplyParent] = useState<React.ReactElement>();
    const [infoCard, setInfoCard] = useState<React.ReactElement>();
    const [avatar, setAvatar] = useState<React.ReactElement>();

    // TEMP comment in brackets
    const InfoComponent = (/* comment: IComment */) => {
        const infoCardElement = (
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
                        onClick={onClickVehicleConfirmation}
                    >
                        Confirm
                    </Button>
                    <Button
                        className={classes.infoButton}
                        variant="contained"
                        color="primary"
                        onClick={onClickDenyConfirmation}
                    >
                        Deny
                    </Button>
                </section>
            </section>
        );
        setInfoCard(infoCardElement);
    };

    const addInfoCardFeatures = ():React.ReactElement | undefined => {
        const image:IImageSettings = comment.post_attributes.confirmation_image;
        if (image === undefined) { return undefined; }
        if (image.name === undefined) { return undefined; }

        return (
            <section>
                <CardMedia
                    key="found-vehicle"
                    className={classes.confirmationImg}
                    component="img"
                    image={`https://images.lostmywheels.com/public/${ownerID}/found/${image.name}.${image.type}`}
                />

                { comment.post_attributes.active_state ? InfoComponent() : null }
            </section>
        );
    };

    const getCommentMessageFromQuote = (): IComment | undefined => {
        const targetCommentID: number | null = comment.post_attributes.replying_to;
        const message: Array<IComment> = posts.filter((post: IComment) => post.post_id === targetCommentID);
        if (!message.length) { return undefined; }
        return message[0];
    };

    const onClickScroll = (parentComment:IComment) => (() => ScrollToID(parentComment.post_id));

    const addReplyParent = () => {
        const parentComment: IComment | undefined = getCommentMessageFromQuote();
        if (parentComment === undefined) { return undefined; }

        const replyParentElement = (
            <Button
                onClick={onClickScroll(parentComment)}
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
                        {formatAvatar(parentComment, classes, false)}
                        {isNullOrUndefined(parentComment.post_attributes.comment_images)
                            ? ''
                            : (
                                <section className={classes.quoteAttachment}>
                                    <Typography variant="caption">
                                        <Attachment />
                                    </Typography>
                                    <Typography variant="caption">
                                        {parentComment.post_attributes.comment_images.length}
                                    </Typography>
                                    <Typography variant="caption">
                                        images attached
                                    </Typography>
                                </section>
                            )}
                        <section className={classes.quotePostContainer}>
                            <Typography variant="caption">{parentComment.post_attributes.message}</Typography>
                        </section>
                    </section>
                </Paper>
            </Button>
        );

        return replyParentElement;
    };

    const onExpandClick = () => setIsExpanded(!isExpanded);
    const onClickDelete = () => setDeletePopupOpen(true);
    const onClickVehicleConfirmation = () => setPopupVehicleConfirmation(true);
    const onClickDenyConfirmation = () => setPopupDenyConfirmation(true);

    const deletePopupCallback = (response: boolean) => {
        setDeletePopupOpen(false);

        if (!response) { return; }

        const newPostAttributes = {
            ...comment.post_attributes,
            is_deleted: true,
        };

        updatePost(comment.post_id, newPostAttributes);
    };

    const postPopupCallback = (response: boolean) => {
        let customAttr = { };

        if (images.length > 0) {
            customAttr = {
                comment_images: images,
            };

            // TODO - here
            uploadImagesToS3('1', images, 'comments');
        }

        dbActions(response, commentValue, 1, customAttr);
    };

    const vehicleConfirmationPopupCallback = (response: boolean) => {
        dbActions(response, 'Owner has confirmed vehicle and is planning to take action.', 2, undefined, true);

        // Set to pending pick up
        updateVehicleStat(vehicleID, 2);
    };
    const vehicleDenyPopupCallback = (response:boolean) => {
        dbActions(response, 'Owner has declined founders request.', 2);

        // Set to pending pick up
        updateVehicleStat(vehicleID, 2);
    };

    const dbActions = (
        response: boolean,
        message: string,
        userType: PostTypeEnum,
        customAttr?: Record<string, unknown>,
        shouldUpdate = false,
    ):void => {
        setPostPopupOpen(false);
        if (!response) { return; }

        if (shouldUpdate) {
            const newUpdateAttributes = comment.post_attributes;
            newUpdateAttributes.active_state = false;
            updatePost(comment.post_id, newUpdateAttributes); // Disabling the "found" post
        }

        let newPostAttributes = defaultPostAttributes;
        newPostAttributes.message = message;
        newPostAttributes.replying_to = isNullOrUndefined(comment.post_id) ? null : comment.post_id;
        if (customAttr !== undefined) {
            newPostAttributes = {
                ...newPostAttributes,
                ...customAttr,
            };
        }
        sendPost(threadID, '1', newPostAttributes, userType);
    };

    const mapCommentImages = ():Array<React.ReactElement> => {
        const commentImages:string = comment.post_attributes.comment_images;
        return commentImages.map((image: IImageSettings) => (
            <ImageComponent
                key={image.id}
                source={`https://images.lostmywheels.com/public/${ownerID}/comments/${image.name}.${image.type}`}
            />
        ));
    };

    const setTextValueCallback = (newVal: string) => setCommentValue(newVal);
    const setInputErrorCallback = (newVal: boolean) => setInputError(newVal);
    const onPostClickCallback = () => setPostPopupOpen(true);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    useEffect(() => {
        setReplyParent(addReplyParent());
        setInfoCard(addInfoCardFeatures());
        setAvatar(formatAvatar(comment, classes, true));
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
                className={classNames(classes.mainContainer, isHighlighted ? classes.highlight : '')}
            >
                <section className={classes.messageContents}>
                    {avatar}

                    {comment.type === 2 ? infoCard : null}
                    {isNullOrUndefined(comment.post_attributes.replying_to)
                        ? null
                        : replyParent}

                    {isNullOrUndefined(comment.post_attributes.comment_images)
                        ? ''
                        : (
                            <section className={classes.commentImageContainer}>
                                {' '}
                                { mapCommentImages() }
                                {' '}
                            </section>
                        ) }

                    <section className={classes.postContainer}>
                        <Typography>{comment.post_attributes.message}</Typography>
                    </section>
                </section>

                { comment.type !== 2
                    ? (
                        <section className={classes.messageButtonContainer}>
                            <Delete className={classes.deleteIcon} onClick={onClickDelete} />
                            {isExpanded
                                ? <Clear className={classNames(classes.replyIcon, classes.replyIconClosed)} onClick={onExpandClick} />
                                : <Reply className={classNames(classes.replyIcon, classes.replyIconOpen)} onClick={onExpandClick} />}
                        </section>
                    )
                    : null}
            </section>

            <AccordionDetails style={{ backgroundColor: '#f7f7f7' }}>
                <TextCommentComponent
                    isMainTextBox={false}
                    textValue={commentValue}
                    images={images}
                    setImages={setImages}
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
                confirmationCallback={deletePopupCallback}
            />

            <PopupComponent
                open={postPopupOpen}
                title="Post"
                message="Are you sure that you wish to post your comment?"
                confirmationCallback={postPopupCallback}
            />

            <PopupComponent
                open={popupVehicleConfirmation}
                title="Vehicle confirmation"
                message="Please ensure that this is indeed your vehicle."
                confirmationCallback={vehicleConfirmationPopupCallback}
            />

            <PopupComponent
                open={popupDenyConfirmation}
                title="Deny confirmation"
                message="Please ensure that this is not your vehicle."
                confirmationCallback={vehicleDenyPopupCallback}
            />

        </Accordion>
    );
}, (
    prevProps: Readonly<React.PropsWithChildren<ICommentComponentProp>>,
    nextProps: Readonly<React.PropsWithChildren<ICommentComponentProp>>,
) => prevProps.isHighlighted === nextProps.isHighlighted);

CommentComponent.displayName = 'CommentComponent';
export default CommentComponent;
