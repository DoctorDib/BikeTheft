import React, { useState, useEffect } from 'react';

import { Paper } from '@material-ui/core';

import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { IImageSettings } from '../../Common/Interfaces/interfaces';

import { IClasses } from '../../Common/Interfaces/IClasses';
import style from './styles';

interface ICarouselProps {
    owner: string;
    images: Array<IImageSettings>;
}

// https://github.com/xiaolin/react-image-gallery

const CarouselComponent: React.FC<ICarouselProps> = (props: ICarouselProps) => {
    const classes: IClasses = style();

    const { owner, images } = props;

    const [mappedImagesElement, setMappedImagesElement] = useState<Array<ReactImageGalleryItem>>([]);

    const mapImages = () => {
        if (images === undefined || !images.length) { return; }
        if (images[0].name === undefined) { return; }

        const newMappedImages:Array<ReactImageGalleryItem> = images.map((image: IImageSettings):ReactImageGalleryItem => ({
            original: `https://images.lostmywheels.com/public/${owner}/vehicles/${image.name}.${image.type}`,
            thumbnail: `https://images.lostmywheels.com/public/${owner}/vehicles/${image.name}.${image.type}`,
        }));

        setMappedImagesElement(newMappedImages);
    };

    useEffect(() => mapImages(), [images]);

    return (
        <Paper elevation={0} className={classes.main}>
            <ImageGallery
                items={mappedImagesElement}
                showFullscreenButton={false}
                useBrowserFullscreen={false}
                showPlayButton={false}
                showIndex={false}
                autoPlay={false}
            />
        </Paper>
    );
};

export default CarouselComponent;
