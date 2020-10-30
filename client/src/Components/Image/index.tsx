import React, { useState } from 'react';
import { Dialog, IconButton, Button } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import { IClasses } from '../../Common/Interfaces/IClasses';
import style from './styles';

interface IImageProp {
    source: string;
}

const ImageComponent = (props: IImageProp): React.ReactElement<IImageProp> => {
    const classes: IClasses = style();

    const { source } = props;

    const [isFullScreen, setFullScreen] = useState<boolean>(false);

    const onClose = () => setFullScreen(false);
    const onOpen = () => setFullScreen(true);

    return (
        <section className={classes.mainContainer}>
            <Button onClick={onOpen} className={classes.smallImageContainer}>
                <img
                    alt="small-thumbnail-in-comment"
                    className={classes.smallImage}
                    src={source}
                />
            </Button>

            <Dialog
                open={isFullScreen}
                onClose={onClose}
                className={classes.dialog}
            >
                <section className={classes.bigImageContainer}>
                    <IconButton className={classes.closeButton} onClick={onClose}>
                        <Cancel />
                    </IconButton>
                    <img
                        alt="fullscreen-thumbnail-in-comment"
                        className={classes.bigImage}
                        src={source}
                    />
                </section>
            </Dialog>
        </section>
    );
};

export default ImageComponent;
