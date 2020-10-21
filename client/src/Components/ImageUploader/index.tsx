import React, { useEffect, useState, useCallback } from 'react';
import { Paper, IconButton, CardMedia, Backdrop } from '@material-ui/core';

import { SpeedDialAction, SpeedDial, SpeedDialIcon } from '@material-ui/lab';
import { Add, Crop, Clear, StarBorder } from '@material-ui/icons';

import { IImageSettings, ICropSettings } from '../../Common/Interfaces/interfaces';
import { defaultCropSettings } from '../../Common/Helpers/Defaults';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

import ImageCropperComponent from '../ImageCropper';

interface IImageUploaderProps {
    images: Array<IImageSettings>;
    setImages: (x: Array<IImageSettings>) => void;
}

const fileToBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve) => {
        const reader = new FileReader(); // Read file content on file loaded event

        reader.onload = () => {
            const results = reader.result;

            if (results === undefined) {
                resolve(null);
            }

            resolve(results);
        };

        reader.readAsDataURL(file);
    });

const ImageUploader: React.FC<IImageUploaderProps> = (props: IImageUploaderProps) => {
    const classes: IClasses = styles();

    const { images, setImages } = props;
    const [speedOpen, setSpeedOpen] = useState(true);
    const [imageCropSrc, setImageCropSrc] = useState<string>('');
    const [cropDialog, setCropDialog] = useState<boolean>(false);
    const [croppingIndex, setCroppingIndex] = useState<number>(-1);

    const [crop, setCrop] = useState<ICropSettings>(defaultCropSettings);

    const [picIndex, setPicIndex] = useState<number>(0);

    const handleOpen = () => {
        setSpeedOpen(true);
    };
    const handleClose = () => {
        setSpeedOpen(false);
    };

    const cropImage = (id: number, imgSrc: string, cropInfo: ICropSettings) => {
        setCroppingIndex(id);
        setImageCropSrc(imgSrc);
        setCrop(cropInfo);
        setCropDialog(true);
        handleClose();
    };

    const onImgRemove = (keyToRemove: number) => {
        setImages(images.filter((data) => data.id !== keyToRemove));
        handleClose();
    };

    const saveCroppedData = (newImageData64: string, newCropInfo: ICropSettings) => {
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

    const moveItemInArray = (array: Array<IImageSettings>, from: number, to: number) => {
        array.splice(to, 0, array.splice(from, 1)[0]);
        return array;
    };

    const setAsMainImage = (id: number) => {
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
    const mapImages = images.map((image: IImageSettings) => (
        <Paper
            key={image.id}
            className={classes.container}
            style={{ border: image.is_main_image ? '3px solid rgb(204, 204, 4)' : '0' }}
        >
            <section className={classes.speedDialContainer}>
                <Backdrop open={speedOpen} />
                <SpeedDial
                    ariaLabel="SpeedDial tooltip example"
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
                        onClick={() => onImgRemove(image.id)}
                    />
                    <SpeedDialAction
                        key="crop"
                        icon={<Crop color="primary" className={classes.smallIcon} />}
                        tooltipTitle="Crop image"
                        onClick={() =>
                            cropImage(image.id, image.crop.original, image.crop.crop_info ?? defaultCropSettings)
                        }
                    />
                    {!image.is_main_image ? (
                        <SpeedDialAction
                            key="make-default"
                            icon={<StarBorder color="primary" className={classes.smallIcon} />}
                            tooltipTitle="Make default image"
                            onClick={() => setAsMainImage(image.id)}
                        />
                    ) : (
                        ''
                    )}
                </SpeedDial>
            </section>

            <CardMedia component="img" image={image.data64} />
        </Paper>
    ));

    const remapImages = useCallback(() => mapImages, [mapImages]);

    useEffect(() => {
        remapImages();
    }, [remapImages]);

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
            {mapImages}

            <label htmlFor="icon-button-file">
                <input
                    accept="image/*"
                    onChange={handleChange}
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                />
                <IconButton aria-label="upload picture" component="span" style={{ padding: '0' }}>
                    <Paper className={classes.container}>
                        <Add color="primary" />
                    </Paper>
                </IconButton>
            </label>

            <ImageCropperComponent
                imageSrc={imageCropSrc}
                open={cropDialog}
                handleClose={() => setCropDialog(false)}
                crop={crop}
                setCrop={setCrop}
                saveCroppedData={(data64: string, cropInfo: ICropSettings) => saveCroppedData(data64, cropInfo)}
            />
        </section>
    );
};

export default ImageUploader;
