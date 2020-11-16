import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import Slider from 'infinite-react-carousel';

import WindowSize from '../../Common/Utils/WindowSize';
import SlideShowItemComponent from './SlideShowItem';
import { getNewVehicles } from '../../Common/Helpers/DB_Helpers';
import { IClasses } from '../../Common/Interfaces/IClasses';
import style from './styles';

interface IVehicleSlideShowProps {
}

interface IActive {
    [id:number]: boolean,
}

// https://github.com/g787543/infinite-react-carousel

const ITEMS_PER_SLIDE_SM = 1;
const ITEMS_PER_SLIDE_MD = 3;
const ITEMS_PER_SLIDE_LG = 4;
const ITEMS_PER_SLIDE_XL = 6;
const ITEMS_PER_SLIDE_XXL = 8;
const NUMBER_OF_VEHICLES = 20;

const DEFAULT_IMAGE = 'https://jsns.dealerappcenter.com/img/default_vehicle_icons/default-inventory-image-car-med.jpg';

const VehicleSlideShow = (props: IVehicleSlideShowProps): React.ReactElement<IVehicleSlideShowProps> => {
    const classes: IClasses = style();
    const windowSize = WindowSize();

    const [vehicleElement, setVehicleElement] = useState<Array<React.ReactElement>>([]);

    const formatImages = (data): Array<React.ReactElement> => data.map((responseData):React.ReactElement => {
        const imageData = responseData.vehicle_attributes.vehicle_images[0];
        const image = imageData === undefined
            ? DEFAULT_IMAGE
            : `https://images.lostmywheels.com/public/${responseData.owner_id}/vehicles/${imageData.name}.${imageData.type}`;

        return (
            <SlideShowItemComponent
                threadID={responseData.thread_id}
                image={image}
                status={responseData.status}
                description={responseData.vehicle_attributes.description}
                dateAdded={responseData.date_added}
            />
        );
    });

    const getSlideShowValue = () => {
        switch (windowSize) {
            case 'sm': return ITEMS_PER_SLIDE_SM;
            case 'md': return ITEMS_PER_SLIDE_MD;
            case 'lg': return ITEMS_PER_SLIDE_LG;
            case 'xlg': return ITEMS_PER_SLIDE_XL;
            default: return ITEMS_PER_SLIDE_XXL;
        }
    };

    useEffect(() => {
        getNewVehicles(NUMBER_OF_VEHICLES)
            .then((responseData) => {
                console.log(responseData);
                setVehicleElement(formatImages(responseData));
            });
    }, []);

    return (
        <Paper elevation={2} className={classes.mainContainer}>
            <Slider
                arrows={false}
                autoplay
                autoplaySpeed={3000}
                centerPadding={10}
                duration={500}
                overScan={5}
                slidesToShow={getSlideShowValue()}
                wheelScroll={6}
            >
                { vehicleElement.length > 0 ? vehicleElement : <section> temp </section>}
            </Slider>
        </Paper>
    );
};

export default VehicleSlideShow;
