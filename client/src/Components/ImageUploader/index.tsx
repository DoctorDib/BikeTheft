import React, { useEffect, useState } from 'react';
import { Paper, IconButton, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';

import {
    fileToBase64,
    moveItemInArray,
} from '../../Common/Helpers/helper';
import styles from './styles';
import { IImageSettings } from '../../Common/Interfaces/interfaces';
import { IClasses } from '../../Common/Interfaces/IClasses';
import { defaultImageSettings } from '../../Common/Helpers/Defaults';
import ImageItemComponent from './ImageItem';
import ImageCroppedComponent from '../ImageCropper';

interface IImageUploaderProps {
    canMakeDefault?: boolean;
    images: Array<IImageSettings>;
    setImages: (x: Array<IImageSettings>) => void;
    maxImages: number;
}

const ImageUploader = (props:IImageUploaderProps): React.ReactElement<IImageUploaderProps> => {
    const {
        images,
        setImages,
        canMakeDefault,
        maxImages,
    } = props;

    const [cropDialog, setCropDialog] = useState<boolean>(false);
    const [imageToCrop, setImageToCrop] = useState<IImageSettings>(defaultImageSettings);
    const [removableKey, setRemovableKey] = useState<number>(-1);
    const [defaultKey, setDefaultKey] = useState<number>(-1);

    const classes: IClasses = styles();

    const [mappedImageElement, setMappedImageElement] = useState<Array<React.ReactElement>>([]);
    const [picIndex, setPicIndex] = useState<number>(images.length);

    const onImgRemove = ():void => {
        if (images === undefined) { return; }
        setImages(images.filter((data) => data.id !== removableKey));
    };

    const setAsMainImage = ():void => {
        let newImages = [...images];
        let chosenIndex = -1;

        const newImagesLength: number = images.length;
        for (let index = 0; index < newImagesLength; index++) {
            const imageData = newImages[index];

            if (imageData.id === defaultKey) {
                chosenIndex = index;
            }

            imageData.is_main_image = imageData.id === defaultKey;
            newImages[index] = imageData;
        }

        if (chosenIndex === -1) { return; }

        newImages = moveItemInArray(newImages, chosenIndex, 0);
        setImages(newImages);
    };

    const onClickDefault = (image:IImageSettings):void => setDefaultKey(image.id);
    const onClickRemove = (image:IImageSettings):void => setRemovableKey(image.id);
    const onClickCrop = (image:IImageSettings):void => {
        setImageToCrop(image);
        setCropDialog(true);
    };

    const mapImages = ():void => {
        if (images === undefined || !images.length) { return; }

        const newMappedImages:Array<React.ReactElement> = images.map(
            (image: IImageSettings):React.ReactElement => (
                <ImageItemComponent
                    key={image.id}
                    image={image}
                    canMakeDefault={canMakeDefault}
                    onClickDefault={onClickDefault}
                    onClickCrop={onClickCrop}
                    onClickRemove={onClickRemove}
                />
            ),
        );

        setMappedImageElement(newMappedImages);
    };

    const hashString = (stringToHash: string):string => {
        const newString = stringToHash + Date.now();
        const newStringLength = newString.length;
        const range = Array(newStringLength);

        for (let i = 0; i < newStringLength; i++) {
            range[i] = i;
        }

        return Array.prototype.map.call(range, (i):string => newString.charCodeAt(i).toString(16)).join('');
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (!event.target.files) { return; }

        const fileImage = event.target.files[0];

        fileToBase64(fileImage)
            .then((image: string | ArrayBuffer | null): boolean => {
                const imageDetails: ReadonlyArray<string> = fileImage.name.split('.');

                if (image === null || image instanceof ArrayBuffer) {
                    return false;
                }

                const newImage: IImageSettings = {
                    id: picIndex,
                    // Ensuring a unique value based on name and Date.now()
                    name: hashString(imageDetails[0]),
                    is_main_image: images.length === 0,
                    type: imageDetails[1],
                    data64: image,
                    crop: {
                        original: image,
                        crop_info: null,
                    },
                };

                // For the deleting capability
                setPicIndex(picIndex + 1);
                setImages([...images, newImage]);
                return true;
            })
            .catch((error) => {
                console.log('error');
                console.log(error);
            });
    };

    const onCropDialogClose = (newImage:IImageSettings|null):void => {
        if (newImage === null) { return; }

        const newImages = [...images];

        const imagesLength = images.length;
        for (let index = 0; index < imagesLength; index++) {
            const currentImage = newImages[index];
            if (currentImage.name !== newImage.name) { continue; }

            newImages[index] = newImage;
            break;
        }

        setImages(newImages);
        setCropDialog(false);
    };

    useEffect(mapImages, [images]);
    useEffect(onImgRemove, [removableKey]);
    useEffect(setAsMainImage, [defaultKey]);

    return (
        <section className={classes.mainContainer}>
            { mappedImageElement }

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
                    style={{
                        padding: '0',
                        display: (images.length >= maxImages) ? 'none' : 'block',
                    }}
                >
                    <Paper className={classes.container}>
                        <Add color="primary" />
                    </Paper>
                    <section className={classes.imageCounter}>
                        <Typography variant="body1">
                            { images.length }
                            /
                            { maxImages }
                        </Typography>
                    </section>
                </IconButton>
            </label>

            <ImageCroppedComponent
                image={imageToCrop}
                open={cropDialog}
                handleClose={onCropDialogClose}
            />
        </section>
    );
};

export default ImageUploader;
