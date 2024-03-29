import React, { useState } from 'react';
import {
    Typography,
    List,
    Avatar,
    Button,
    Grid,
    ListItem,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    Divider,
} from '@material-ui/core';

import { Check, Report, Beenhere, Cancel } from '@material-ui/icons';

import VehicleCategoryEnum from '../../Common/Enums/VehicleCategoryEnum';
import { formatDate, capitalizeFirstLetter } from '../../Common/Helpers/helper';
import {
    IVehicleInfo,
    IOwner,
    IImageSettings,
} from '../../Common/Interfaces/interfaces';
import {
    FormatStatusColour,
    FormatStatusText,
    FormatInfoTitles,
} from './formats';
import { IClasses } from '../../Common/Interfaces/IClasses';
import CarouselComponent from '../Carousel';
import FoundConfirmation from '../FoundConfirmation';
import style from './styles';

const infoKeys: Array<string> = ['number_plate', 'vin', 'make', 'model', 'category'];

interface IVehicleInfoProps {
    threadID: string;
    owner: IOwner;
    vehicle: IVehicleInfo;
}

const vinInformationPopup = (vin: string): React.ReactElement => (
    <section>
        <Typography>
            {vin}
        </Typography>
    </section>
);

const VehicleInfo = (props: IVehicleInfoProps): React.ReactElement<IVehicleInfoProps> => {
    const { threadID, owner, vehicle } = props;
    const classes: IClasses = style();

    const [open, setOpen] = useState(false);
    const [openVin, setOpenVin] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleVinOpen = () => setOpenVin(true);
    const handleVinClose = () => setOpenVin(false);
    const foundConfirmationResponse = () => setOpen(false);

    const formatFeatures = (): ReadonlyArray<React.ReactElement> =>
        vehicle.features.map((damage: string) => (
            <ListItem key={`damages - ${damage}`}>
                <ListItemText primary={damage} />
            </ListItem>
        ));

    const formatInfoValues = (
        key:string,
        value:string | number | string[] | IImageSettings[] | boolean| Date,
    ): string | number | string[] | IImageSettings[] | boolean | Date => {
        if (key === 'category' && typeof value === 'number') {
            return capitalizeFirstLetter(VehicleCategoryEnum[value]);
        }

        return value;
    };

    const formatInfo = () => infoKeys.map((indexKey: string) => {
        if (indexKey === 'vin') {
            // const value in if statement to avoid type confusion when using "vinInformationPopup"
            const value: string = vehicle[indexKey];

            return (
                <Grid container key={`prop - ${indexKey}`}>
                    <Grid item xs={6}>
                        <Typography>
                            {FormatInfoTitles(indexKey)}
                        </Typography>
                    </Grid>

                    <Dialog onClose={handleVinClose} aria-labelledby="simple-dialog-title" open={openVin}>
                        <DialogTitle className={classes.dialogTitle}> Vehicle Identification Number</DialogTitle>
                        <DialogContent className={classes.dialogContent}>
                            {vinInformationPopup(value)}
                        </DialogContent>
                    </Dialog>

                    <Grid item xs={6} style={{ padding: '5px' }}>
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={handleVinOpen}
                            style={{ width: '100%' }}
                            disabled={value === ''}
                        >
                            {value === '' ? 'N/A' : 'View'}
                        </Button>
                    </Grid>
                </Grid>
            );
        }

        return (
            <Grid container key={`prop - ${indexKey}`}>
                <Grid item xs={6}>
                    <Typography>{FormatInfoTitles(indexKey)}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{indexKey === '' ? 'N/A' : formatInfoValues(indexKey, vehicle[indexKey])}</Typography>
                </Grid>
            </Grid>
        );
    });

    const checkVerification = () => (
        <section className={vehicle.verified ? classes.verified : classes.unverified}>
            { vehicle.verified ? <Beenhere /> : <Cancel />}
            <Typography variant="body2" style={{ marginLeft: '5px' }}>
                {vehicle.verified ? '' : 'Not '}
                Verified Post
            </Typography>
        </section>
    );

    return (
        <section className={classes.container}>
            <section className={classes.topSection}>
                <section className={classes.imageContainer}>
                    <CarouselComponent
                        owner={owner.owner_id}
                        images={vehicle.images}
                        source="vehicles"
                    />
                </section>

                <section className={classes.rightSide}>
                    <section className={classes.owner}>
                        <section className={classes.profileImageContainer}>
                            <Avatar className={classes.profileImage} src={`${owner.member_attributes.profile_image}`} />
                        </section>
                        <Typography variant="h6">{owner.member_attributes.display_name}</Typography>
                        <Typography variant="caption">{formatDate(vehicle.date_added)}</Typography>
                        {checkVerification()}
                    </section>

                    <section className={classes.statusText}>
                        <Typography
                            variant="h5"
                            style={{
                                color: FormatStatusColour(vehicle.status),
                            }}
                            className={classes.statusText}
                        >
                            {FormatStatusText(vehicle.status)}
                        </Typography>
                    </section>

                    <Divider className={classes.divider} />

                    <section className={classes.buttonContainer}>
                        <Button
                            variant="contained"
                            startIcon={<Check />}
                            onClick={handleOpen}
                            color="primary"
                            disabled={vehicle.status !== 1}
                        >
                            Found
                        </Button>
                        <Button variant="contained" startIcon={<Report />} color="primary">
                            Report
                        </Button>

                        <FoundConfirmation
                            ownerID={owner.owner_id}
                            threadID={threadID}
                            close={foundConfirmationResponse}
                            open={open}
                        />
                    </section>

                    <section className={classes.gridStyle}>
                        <Typography className={classes.titles} variant="body1">
                            Specifications
                        </Typography>
                        {formatInfo()}
                    </section>
                </section>
            </section>

            <section className={classes.descriptionContainer}>
                <section>
                    <Typography className={classes.titles}>Additional description</Typography>
                    <Typography>{vehicle.description}</Typography>
                </section>

                <section>
                    <Typography className={classes.titles}>Additional damages</Typography>
                    <List dense>{ formatFeatures() }</List>
                </section>
            </section>
        </section>
    );
};

export default VehicleInfo;
