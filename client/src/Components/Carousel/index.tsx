import React from 'react';

import { Paper } from '@material-ui/core';

import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { IImageSettings } from '../../Common/Interfaces/interfaces';

import { IClasses } from '../../Common/Interfaces/IClasses';
import style from './styles';

interface ICarouselProps {
    owner: string;
    images: Array<IImageSettings>;
    source: string;
}

// https://github.com/xiaolin/react-image-gallery

const CarouselComponent = (props: ICarouselProps): React.ReactElement<ICarouselProps> => {
    const { owner, images, source } = props;

    const classes: IClasses = style();

    const mapImages = (): Array<ReactImageGalleryItem> => {
        if (images === undefined || !images.length) { return []; }
        if (images[0].name === undefined) { return []; }

        return images.map((image: IImageSettings):ReactImageGalleryItem => ({
            original: `https://images.lostmywheels.com/public/${owner}/${source}/${image.name}.${image.type}`,
            thumbnail: `https://images.lostmywheels.com/public/${owner}/${source}/${image.name}.${image.type}`,
        }));
    };

    return (
        <Paper elevation={0} className={classes.main}>
            <ImageGallery
                items={mapImages()}
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
