import React from 'react';
import { Paper, CardMedia } from '@material-ui/core';

import { IImageSettings } from '../../../Common/Interfaces/interfaces';
import styles from './styles';
import { IClasses } from '../../../Common/Interfaces/IClasses';
import ImageToolsComponent from '../ImageTools';

interface IImageUploaderProps {
    image: IImageSettings,
    canMakeDefault?: boolean;
    onClickDefault: (image:IImageSettings)=>void;
    onClickCrop: (image:IImageSettings)=>void;
    onClickRemove: (image:IImageSettings)=>void;
}

const ImageUploader = (props:IImageUploaderProps): React.ReactElement<IImageUploaderProps> => {
    const {
        image,
        canMakeDefault,
        onClickDefault,
        onClickCrop,
        onClickRemove,
    } = props;

    const classes: IClasses = styles();

    return (
        <Paper
            key={image.id}
            className={classes.container}
            style={{
                border: (image.is_main_image && canMakeDefault)
                    ? '3px solid rgb(204, 204, 4)'
                    : '0',
            }}
        >
            <ImageToolsComponent
                image={image}
                canMakeDefault={canMakeDefault}
                onClickDefault={onClickDefault}
                onClickRemove={onClickRemove}
                onClickCrop={onClickCrop}
            />

            <CardMedia component="img" image={image.data64} />
        </Paper>
    );
};

export default ImageUploader;
