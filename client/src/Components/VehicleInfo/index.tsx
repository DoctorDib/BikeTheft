import React from 'react';

import {
    Typography,
    List,
    CardMedia,
    Avatar,
} from '@material-ui/core';

import {
    IVehicleInfo,
    IOwner,
} from '../../Common/Interfaces/interfaces';

import {
    FormatStatusColour,
    FormatStatusText,
    FormatInfo,
    FormatFeatures,
} from './helpers/formats';

import { IClasses } from '../../Common/Interfaces/IClasses';

import style from './styles';

interface IVehicleInfoProps {
    owner: IOwner;
    vehicle: IVehicleInfo;
}

// TODO these props should be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VehicleInfo: React.FC<IVehicleInfoProps> = (props: IVehicleInfoProps) => {
    const classes: IClasses = style();

    const { owner, vehicle } = props;

    return (
        <section className={classes.container}>

            <section className={classes.topSection}>
                <section className={classes.imageContainer}>
                    <CardMedia className={classes.image} component="img" image={`../static/media/${vehicle.image}`} />
                </section>

                <section className={classes.owner}>
                    <section className={classes.profileImageContainer}>
                        <Avatar className={classes.profileImage} src={`../static/media/${owner.profile_image}`} />
                    </section>
                    <Typography variant="h6">
                        {' '}
                        {owner.display_name}
                        {' '}
                    </Typography>
                    <Typography variant="caption">
                        {' '}
                        {vehicle.date_added}
                        {' '}
                    </Typography>
                    <Typography variant="h5" style={{ color: FormatStatusColour(vehicle.status) }} className={classes.statusText}>
                        {' '}
                        {FormatStatusText(vehicle.status)}
                        {' '}
                    </Typography>
                </section>

                <section>
                    <Typography className={classes.titles}>Information</Typography>
                    {FormatInfo(vehicle)}
                </section>

                <section>
                    <Typography className={classes.titles}>Additional damages</Typography>
                    <List dense>
                        {FormatFeatures(vehicle.features)}
                    </List>
                </section>

                <section>
                    <Typography className={classes.titles}>Additional description</Typography>
                    <Typography>{vehicle.description}</Typography>
                </section>
            </section>

        </section>
    );
};

export default VehicleInfo;
