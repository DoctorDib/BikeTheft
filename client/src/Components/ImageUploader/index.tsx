import React, { useState } from 'react';

import { Paper, IconButton, CardMedia, Button } from '@material-ui/core';

import { Add, Crop } from '@material-ui/icons';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

import ImageCropperComponent  from '../ImageCropper';

interface IImageUploaderProps {
    images: Array<object>,
    setImages: any,
}

const ImageUploader: React.FC<IImageUploaderProps> = (props:IImageUploaderProps) => {
    const classes: IClasses = styles();

    const { images, setImages } = props;

    const [ imageCropSrc, setImageCropSrc ] = useState<string>('');
    const [ cropDialog, setCropDialog ] = useState<boolean>(false);

    const [ showCropIcon, setCropIcon ] = useState<boolean>(false);

    const cropImage = (imgSrc:string) => {
        setImageCropSrc(imgSrc);
        setCropDialog(true);
    };

    const setOpacityTrue = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        console.log("hover")
        event.currentTarget.style.opacity = '.75';
    };
    
    const setOpacityFalse = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        event.currentTarget.style.opacity = '0';
    };

    const mapImages = images.map((image: object) => (
        <Paper className={classes.container}>
            <Button onClick={() => cropImage(URL.createObjectURL(image))}>
                <Crop 
                    className={classes.icon} 
                    style={{ opacity: 0 }} 
                    onMouseOver={setOpacityTrue }
                    onMouseOut={setOpacityFalse}
                />
                <CardMedia component="img" image={URL.createObjectURL(image)} />    
            </Button>
        </Paper>
    ));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const image: object = event.target.files[0];

        console.log(URL.createObjectURL(image));

        console.log(event.target.files[0]);

        setImages([...images, image]);
    };

    return (
        <section className={classes.mainContainer}>
            {mapImages}

            <label htmlFor="icon-button-file">
                <input
                    accept="image/*"
                    onChange={handleChange}
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                />
                <IconButton
                    aria-label="upload picture"
                    component="span"
                    style={{ padding: '0' }}
                >
                    <Paper className={classes.container}>
                        <Add color="primary" />
                    </Paper>
                </IconButton>
            </label>

            <ImageCropperComponent imageSrc={imageCropSrc} open={cropDialog} handleClose={() => setCropDialog(false)}/>
        </section>
    );
};

export default ImageUploader;
