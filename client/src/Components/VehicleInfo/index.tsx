import React from 'react';

import {
    Typography,
    List,
    CardMedia,
    Avatar,
    Button,
} from '@material-ui/core';

import { Check, Report } from '@material-ui/icons';

import {
    IVehicleInfo,
    IOwner,
} from '../../Common/Interfaces/interfaces';

import {
    FormatStatusColour,
    FormatStatusText,
    FormatInfo,
    FormatFeatures,
} from './formats';

import { IClasses } from '../../Common/Interfaces/IClasses';

import FoundConfirmation from '../FoundConfirmation';

import style from './styles';

interface IVehicleInfoProps {
    owner: IOwner;
    vehicle: IVehicleInfo;
}

// TODO these props should be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VehicleInfo: React.FC<IVehicleInfoProps> = (props: IVehicleInfoProps) => {
    const classes: IClasses = style();

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const { owner, vehicle } = props;

    return (
        <section className={classes.container}>

            <section className={classes.topSection}>
                <section className={classes.imageContainer}>
                    <CardMedia className={classes.image} component="img" image={`../static/media/${vehicle.image}`} />
                </section>

                <section className={classes.owner}>
                    <section className={classes.profileImageContainer}>
                        <Avatar className={classes.profileImage} src={`../static/media/${owner.member_attributes.profile_image}`} />
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
                    <Typography variant="h5" style={{ color: FormatStatusColour(vehicle.status) }} className={classes.statusText}>
                        {' '}
                        {FormatStatusText(vehicle.status)}
                        {' '}
                    </Typography>
                </section>

                <section className={classes.buttonContainer}>
                    <Button variant="contained" startIcon={<Check />} onClick={handleOpen}> Found </Button>
                    <Button variant="contained" startIcon={<Report />}> Report </Button>

                    <FoundConfirmation close={() => { setOpen(false); }} open={open} />
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
