import React, { useState } from 'react';
import { Backdrop } from '@material-ui/core';
import { SpeedDialAction, SpeedDial, SpeedDialIcon } from '@material-ui/lab';
import { Crop, Clear, StarBorder } from '@material-ui/icons';

import { IImageSettings } from '../../../Common/Interfaces/interfaces';
import styles from './styles';
import { IClasses } from '../../../Common/Interfaces/IClasses';

interface IImageToolsProps {
    image: IImageSettings;
    canMakeDefault?: boolean;
    onClickDefault: (image:IImageSettings) => void;
    onClickRemove: (image:IImageSettings) => void;
    onClickCrop: (image:IImageSettings) => void;
}

const ImageUploader = (props:IImageToolsProps): React.ReactElement<IImageToolsProps> => {
    const {
        image,
        canMakeDefault,
        onClickDefault,
        onClickRemove,
        onClickCrop,
    } = props;

    const classes: IClasses = styles();

    const [speedOpen, setSpeedOpen] = useState<boolean>(false);

    const handleOpen = ():void => setSpeedOpen(true);
    const handleClose = ():void => setSpeedOpen(false);

    const removeClick = ():void => onClickRemove(image);
    const cropClick = ():void => {
        onClickCrop(image);
        handleClose();
    };
    const defaultClick = ():void => {
        onClickDefault(image);
        handleClose();
    };

    return (
        <section className={classes.speedDialContainer}>
            <Backdrop open={speedOpen} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip"
                className={classes.speedDial}
                icon={<SpeedDialIcon className={classes.smallIcon} />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={speedOpen}
                direction="down"
            >
                <SpeedDialAction
                    key="remove"
                    icon={<Clear style={{ color: 'rgb(176, 0, 0)' }} className={classes.smallIcon} />}
                    tooltipTitle="Remove"
                    onClick={removeClick}
                />
                <SpeedDialAction
                    key="crop"
                    icon={<Crop color="primary" className={classes.smallIcon} />}
                    tooltipTitle="Crop image"
                    onClick={cropClick}
                />
                {!image.is_main_image && canMakeDefault && (
                    <SpeedDialAction
                        key="make-default"
                        icon={<StarBorder color="primary" className={classes.smallIcon} />}
                        tooltipTitle="Make default image"
                        onClick={defaultClick}
                    />
                )}
            </SpeedDial>
        </section>
    );
};

export default ImageUploader;
