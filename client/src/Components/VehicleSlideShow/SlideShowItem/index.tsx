import React, { useState } from 'react';
import { Typography } from '@material-ui/core';

import VehicleStatusEnum from '../../../Common/Enums/VehicleStatusEnums';
import { formatDate } from '../../../Common/Helpers/helper';
import { IClasses } from '../../../Common/Interfaces/IClasses';
import style from './styles';

interface ISlideShowItemProp {
    threadID: number,
    image: string,
    description: string,
    dateAdded: string,
    status: number,
}

const MAX_DESCRIPTION_LENGTH = 80;

const VehicleSlideShow = (props: ISlideShowItemProp): React.ReactElement<ISlideShowItemProp> => {
    const { threadID, image, description, dateAdded, status } = props;

    const classes: IClasses = style();

    const [isHovering, setIsHovering] = useState<boolean>(false);

    const onMouseEnter = ():void => setIsHovering(true);
    const onMouseLeave = ():void => setIsHovering(false);
    const onClick = ():string => window.location.href = `/post/${threadID}`;

    const processDescription = () => {
        if (description.length === 0) {
            return 'No description...';
        }

        if (description.length > MAX_DESCRIPTION_LENGTH) {
            return `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...`;
        }

        return description;
    };

    const formatStatus = () => {
        switch (status) {
            case VehicleStatusEnum.FOUND: return 'Found';
            case VehicleStatusEnum.STOLEN: return 'Stolen';
            case VehicleStatusEnum.PENDING_COLLECTION: return 'Pending Collection';
            default: return 'Error';
        }
    };

    const formatStatusIndicator = () => {
        switch (status) {
            case VehicleStatusEnum.FOUND: return '#36f900';
            case VehicleStatusEnum.STOLEN: return '#9d0000';
            case VehicleStatusEnum.PENDING_COLLECTION: return '#ffaf14';
            default: return 'white';
        }
    };

    return (
        <section
            className={classes.thumbnailContainer}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className={classes.image} style={{ backgroundImage: ` url("${image}")` }} />

            <section className={classes.overlay} style={{ height: isHovering ? '100%' : '0' }}>
                <section className={classes.text}>
                    <Typography variant="caption" style={{ textAlign: 'center' }}>
                        Posted
                        { formatDate(dateAdded) }
                    </Typography>
                    <section className={classes.statusContainer}>
                        <div className={classes.statusIndicator} style={{ backgroundColor: formatStatusIndicator() }} />
                        <Typography>
                            { formatStatus() }
                        </Typography>
                    </section>

                    <Typography variant="caption">
                        { processDescription() }
                    </Typography>
                </section>
            </section>
        </section>
    );
};

export default VehicleSlideShow;
