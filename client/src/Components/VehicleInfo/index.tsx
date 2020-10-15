import React, { useState } from 'react';

import {
    Typography,
    List,
    Avatar,
    Button,
    Grid,
    ListItem,
    ListItemText,
} from '@material-ui/core';
import { Check, Report } from '@material-ui/icons';

import { IVehicleInfo, IOwner } from '../../Common/Interfaces/interfaces';
import {
    FormatStatusColour,
    FormatStatusText,
    FormatInfoTitles,
} from './formats';
import { IClasses } from '../../Common/Interfaces/IClasses';
import CarouselComponent from '../Carousel';
import FoundConfirmation from '../FoundConfirmation';
import style from './styles';

const UserImages = import.meta.env.SNOWPACK_PUBLIC_USERIMAGES;

const infoKeys: Array<string> = [
    'number_plate',
    'vin',
    'make',
    'model',
    'category',
];

interface IVehicleInfoProps {
    owner: IOwner;
    vehicle: IVehicleInfo;
}

const formatInfo = (data: IVehicleInfo) => infoKeys.map((indexKey: string) => (
    <Grid container key={`prop - ${indexKey}`}>
        <Grid item xs={6}>
            <Typography>{FormatInfoTitles(indexKey)}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>
                {' '}
                {indexKey === '' ? 'N/A' : data[indexKey]}
                {' '}
            </Typography>
        </Grid>
    </Grid>
));

const formatFeatures = (features: Array<string>) => features.map((damage: string) => (
    <ListItem key={`damages - ${damage}`}>
        <ListItemText primary={damage} />
    </ListItem>
));

const VehicleInfo: React.FC<IVehicleInfoProps> = (props: IVehicleInfoProps) => {
    const classes: IClasses = style();

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const foundConfirmationResponse = () => {
        setOpen(false);
    };

    const { owner, vehicle } = props;

    return (
        <section className={classes.container}>
            <section className={classes.topSection}>
                <section className={classes.imageContainer}>
                    <CarouselComponent images={vehicle.images} />
                </section>

                <section className={classes.rightSide}>
                    <section className={classes.owner}>
                        <section className={classes.profileImageContainer}>
                            <Avatar
                                className={classes.profileImage}
                                src={`${UserImages}${owner.member_attributes.profile_image}`}
                            />
                        </section>
                        <Typography variant="h6">
                            {' '}
                            {owner.member_attributes.display_name}
                            {' '}
                        </Typography>
                        <Typography variant="caption">
                            {' '}
                            {vehicle.date_added}
                            {' '}
                        </Typography>
                    </section>

                    <section className={classes.statusText}>
                        <Typography
                            variant="h4"
                            style={{
                                color: FormatStatusColour(vehicle.status),
                            }}
                            className={classes.statusText}
                        >
                            {' '}
                            {FormatStatusText(vehicle.status)}
                            {' '}
                        </Typography>
                    </section>

                    <section className={classes.buttonContainer}>
                        <Button
                            variant="contained"
                            startIcon={<Check />}
                            onClick={handleOpen}
                            color="primary"
                            disabled={vehicle.status !== 1}
                        >
                            {' '}
                            Found
                            {' '}
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Report />}
                            color="primary"
                        >
                            {' '}
                            Report
                            {' '}
                        </Button>

                        <FoundConfirmation
                            close={foundConfirmationResponse}
                            open={open}
                        />
                    </section>

                    <section className={classes.gridStyle}>
                        <Typography className={classes.titles} variant="body1">
                            {' '}
                            Specifications
                            {' '}
                        </Typography>
                        {formatInfo(vehicle)}
                    </section>
                </section>
            </section>

            <section className={classes.descriptionContainer}>
                <section>
                    <Typography className={classes.titles}>
                        Additional description
                    </Typography>
                    <Typography>{vehicle.description}</Typography>
                </section>

                <section>
                    <Typography className={classes.titles}>
                        Additional damages
                    </Typography>
                    <List dense>{formatFeatures(vehicle.features)}</List>
                </section>
            </section>
        </section>
    );
};

export default VehicleInfo;
