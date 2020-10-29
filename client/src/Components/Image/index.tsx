import React, { useState } from 'react';

import { Dialog, IconButton } from '@material-ui/core';

import { Cancel } from '@material-ui/icons';

import { IClasses } from '../../Common/Interfaces/IClasses';
import style from './styles';

interface IImageProp {
    source: string;
}

const CarouselComponent = (props: IImageProp): React.ReactElement<IImageProp> => {
    const classes: IClasses = style();

    const { source } = props;

    const [isFullScreen, setFullScreen] = useState<boolean>(false);

    const onClose = () => setFullScreen(false);
    const open = () => setFullScreen(true);

    return (
        <section className={classes.mainContainer}>
            <section className={classes.smallImageContainer}>
                <img
                    className={classes.smallImage}
                    src={source}
                    onClick={open}
                />
            </section>

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
                        className={classes.bigImage}
                        src={source}
                        onClick={open}
                    />
                </section>
            </Dialog>
        </section>
    );
};

export default CarouselComponent;
