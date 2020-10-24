import React from 'react';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { IImageSettings } from '../../Common/Interfaces/interfaces';

interface ICarouselProps {
    owner: string;
    images: Array<IImageSettings>;
}

// https://github.com/xiaolin/react-image-gallery

const CarouselComponent = (props: ICarouselProps): React.ReactElement<ICarouselProps> => {
    const { owner, images } = props;

    const mapImages = images.map((image: IImageSettings) => ({
        original: `https://images.lostmywheels.com/public/${owner}/vehicles/${image.name}.${image.type}`,
        thumbnail: `https://images.lostmywheels.com/public/${owner}/vehicles/${image.name}.${image.type}`,
    }));

    return (
        <ImageGallery
            items={mapImages}
            showFullscreenButton={false}
            useBrowserFullscreen={false}
            showPlayButton={false}
            showIndex={false}
            autoPlay={false}
        />
    );
};

export default CarouselComponent;
