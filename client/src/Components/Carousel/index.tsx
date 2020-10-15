import React from 'react';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

interface ICarouselProps {
    images: Array<string>;
}

// https://github.com/xiaolin/react-image-gallery

const CarouselComponent: React.FC<ICarouselProps> = (props: ICarouselProps) => {
    const { images } = props;

    console.log(images);

    const mapImages = images.map((image: string) => ({
        original: `../static/media/${image}`,
        thumbnail: `../static/media/${image}`,
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
