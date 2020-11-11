import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';

import { IClasses } from '../../Common/Interfaces/IClasses';
import PopupComponent from '../Popup';
import { IComment, IPostAttributes, IImageSettings } from '../../Common/Interfaces/interfaces';
import { defaultPostAttributes } from '../../Common/Helpers/Defaults';
import { sendPost } from '../../Common/Helpers/DB_Helpers';
import { uploadImagesToS3 } from '../../Common/Helpers/helper';
import TextCommentComponent from '../CommentTextBox';
import CommentComponent from '../Comment';
import style from './styles';

interface IForumProps {
    threadID: string;
    ownerID: string;
    posts: Array<IComment>;
    vehicleID: number;
}

const Forum = (props: IForumProps): React.ReactElement<IForumProps> => {
    const classes: IClasses = style();

    const {
        ownerID,
        threadID,
        posts,
        vehicleID,
    } = props;

    const [highlightedID, setHighlightedID] = useState<number | undefined>();
    const [postPopupOpen, setPostPopupOpen] = useState<boolean>(false);
    const [commentValue, setCommentValue] = useState<string>('');
    const [inputError, setInputError] = useState<boolean>(false);
    const [comments, setComments] = useState<ReadonlyArray<React.ReactNode>>([]);
    const [images, setImages] = useState<ReadonlyArray<IImageSettings>>([]);

    const scrollTo = (id: number) => {
        const targetID = `#post-id-${id}`;
        const targetElement:Element | null = document.querySelector(targetID);
        if (targetElement === null) { return; }

        targetElement.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'center',
        });

        setHighlightedID(id);
    };

    const scrollToCallback = (val: number) => scrollTo(val);
    const setCommentValueCallback = (newVal: string) => setCommentValue(newVal);
    const setInputErrorCallback = (newVal: boolean) => setInputError(newVal);

    const postPopupCallback = (response: boolean) => {
        setPostPopupOpen(false);
        if (!response) { return; }

        let newCommentAttributes:IPostAttributes = {
            ...defaultPostAttributes,
            message: commentValue,
        };

        if (images.length > 0) {
            newCommentAttributes = {
                ...newCommentAttributes,
                comment_images: images,
            };

            // TODO - here
            uploadImagesToS3('1', images, 'comments');
        }

        setCommentValue('');
        sendPost(threadID, '1', newCommentAttributes, 1);
    };

    const onPostClickCallback = () => setPostPopupOpen(true);

    const layoutComments = () => {
        if (posts === null || !posts.length || posts[0].post_id === -1) { return; }

        const mappedPost = posts.map((comment: IComment): React.ReactNode => (
            <section
                key={`parent-post-${comment.post_id}`}
                className={classes.layoutComment}
            >
                <CommentComponent
                    threadID={threadID}
                    ownerID={ownerID}
                    vehicleID={vehicleID}
                    isHighlighted={highlightedID === comment.post_id}
                    comment={comment}
                    posts={posts}
                    ScrollToID={scrollToCallback}
                />
            </section>
        ));

        setComments(mappedPost);
    };

    useEffect(() => {
        layoutComments();
    }, [highlightedID, posts]);

    return (
        <section className={classes.mainContainer}>
            <Typography variant="h5"> Activity </Typography>
            <Typography variant="caption">
                Found anything related to this vehicle? Every second counts!
            </Typography>

            <section className={classes.textBoxContainer}>
                <TextCommentComponent
                    isMainTextBox
                    textValue={commentValue}
                    images={images}
                    setImages={setImages}
                    setTextValue={setCommentValueCallback}
                    inputError={inputError}
                    setInputError={setInputErrorCallback}
                    onClickPost={onPostClickCallback}
                />
            </section>

            <section className={classes.messageContainer}>
                { posts !== null ? comments : null }
            </section>

            <PopupComponent
                open={postPopupOpen}
                title="Post"
                message="Are you sure that you wish to post your comment?"
                confirmationCallback={postPopupCallback}
            />
        </section>
    );
};

export default Forum;
