import React, { useEffect, useState } from 'react';
import { Paper, IconButton, CardMedia, Backdrop, Typography } from '@material-ui/core';
import { SpeedDialAction, SpeedDial, SpeedDialIcon } from '@material-ui/lab';
import { Add, Crop, Clear, StarBorder } from '@material-ui/icons';

import {
    fileToBase64,
    moveItemInArray,
} from '../../Common/Helpers/helper';

import { IImageSettings } from '../../Common/Interfaces/interfaces';
import { defaultCropSettings } from '../../Common/Helpers/Defaults';
import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';
import ImageCropperComponent from '../ImageCropper';

interface IImageUploaderProps {
    canMakeDefault?: boolean;
    images: Array<IImageSettings>;
    setImages: (x: Array<IImageSettings>) => void;
    maxImages: number;
}

const ImageUploader = (props:IImageUploaderProps): React.ReactElement<IImageUploaderProps> => {
    const {
        canMakeDefault,
        images,
        setImages,
        maxImages,
    } = props;

    const classes: IClasses = styles();

    const [mappedImageElement, setMappedImageElement] = useState<Array<React.ReactElement>>([]);
    const [speedOpen, setSpeedOpen] = useState<boolean>(true);
    const [imageCropSrc, setImageCropSrc] = useState<string>('');
    const [cropDialog, setCropDialog] = useState<boolean>(false);
    const [croppingIndex, setCroppingIndex] = useState<number>(-1);
    const [crop, setCrop] = useState<ReactCrop.Crop>(defaultCropSettings);
    const [picIndex, setPicIndex] = useState<number>(images.length);

    const handleOpen = () => setSpeedOpen(true);
    const handleClose = () => setSpeedOpen(false);
    const onSaveCropData = (data64: string, cropInfo: ReactCrop.Crop) => saveCroppedData(data64, cropInfo);
    const onHandleClose = () => setCropDialog(false);

    const cropImage = (id: number, imgSrc: string, cropInfo: ReactCrop.Crop) => {
        setCroppingIndex(id);
        setImageCropSrc(imgSrc);
        setCrop(cropInfo);
        setCropDialog(true);
        handleClose();
    };

    const onImgRemove = (keyToRemove: number) => {
        if (images === undefined) { return; }
        setImages(images.filter((data) => data.id !== keyToRemove));
        handleClose();
    };

    const saveCroppedData = (newImageData64: string, newCropInfo: ReactCrop.Crop) => {
        if (croppingIndex === -1) {
            return;
        }

        const newImages = images;

        const imageLength: number = newImages.length;
        for (let index = 0; index < imageLength; index++) {
            const imageData = newImages[index];
            if (imageData.id !== croppingIndex) {
                continue;
            }

            imageData.data64 = newImageData64;
            imageData.crop.crop_info = newCropInfo;

            newImages[index] = imageData;
            break;
        }

        setImages(newImages);
        setCroppingIndex(-1);
    };

    const setAsMainImage = (id:number) => {
        let newImages = [...images];
        let chosenIndex = -1;

        const newImagesLength: number = images.length;
        for (let index = 0; index < newImagesLength; index++) {
            const imageData = newImages[index];

            if (imageData.id === id) {
                chosenIndex = index;
            }

            imageData.is_main_image = imageData.id === id;
            newImages[index] = imageData;
        }

        if (chosenIndex === -1) {
            console.error('Setting image an may caused an error...');
            return;
        }

        newImages = moveItemInArray(newImages, chosenIndex, 0);

        setImages(newImages);
        handleClose();
    };

    const onClickDefault = (image:IImageSettings) => (() => setAsMainImage(image.id));
    const onClickRemove = (image:IImageSettings) => (() => onImgRemove(image.id));
    const onClickCrop = (image:IImageSettings) =>
        (() => cropImage(image.id, image.crop.original, image.crop.crop_info ?? defaultCropSettings));

    const mapImages = () => {
        if (images === undefined || !images.length) { return; }

        const newMappedImages:Array<React.ReactElement> = images.map((image: IImageSettings):React.ReactElement => (
            <Paper
                key={image.id}
                className={classes.container}
                style={{ border: image.is_main_image && canMakeDefault ? '3px solid rgb(204, 204, 4)' : '0' }}
            >
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
                            onClick={onClickRemove(image)}
                        />
                        <SpeedDialAction
                            key="crop"
                            icon={<Crop color="primary" className={classes.smallIcon} />}
                            tooltipTitle="Crop image"
                            onClick={onClickCrop(image)}
                        />
                        {!image.is_main_image && canMakeDefault && (
                            <SpeedDialAction
                                key="make-default"
                                icon={<StarBorder color="primary" className={classes.smallIcon} />}
                                tooltipTitle="Make default image"
                                onClick={onClickDefault(image)}
                            />
                        )}
                    </SpeedDial>
                </section>

                <CardMedia component="img" image={image.data64} />
            </Paper>
        ));

        setMappedImageElement(newMappedImages);
    };

    // TODO - Look into this to see if there is a better method
    // Currently re-renders all images when the speed dial is used
    useEffect(() => mapImages(), [images, speedOpen]);

    const hashString = (stringToHash: string) => {
        const newString = stringToHash + Date.now();
        const newStringLength = newString.length;
        const range = Array(newStringLength);

        for (let i = 0; i < newStringLength; i++) {
            range[i] = i;
        }

        return Array.prototype.map.call(range, (i) => newString.charCodeAt(i).toString(16)).join('');
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }

        const fileImage = event.target.files[0];

        fileToBase64(fileImage)
            .then((image: string | ArrayBuffer | null): boolean => {
                const imageDetails = fileImage.name.split('.');

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

    return (
        <section className={classes.mainContainer}>

            {mappedImageElement}

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

            <ImageCropperComponent
                imageSrc={imageCropSrc}
                open={cropDialog}
                handleClose={onHandleClose}
                crop={crop}
                setCrop={setCrop}
                saveCroppedData={onSaveCropData}
            />
        </section>
    );
};

export default ImageUploader;
