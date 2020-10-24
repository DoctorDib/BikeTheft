import React, { useState, useEffect } from 'react';

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
} from '@material-ui/core';
import { Check, Report } from '@material-ui/icons';

import VehicleCategoryEnum from '../../Common/Enums/VehicleCategoryEnum';
import { formatDate } from '../../Common/Helpers/helper';
import { IVehicleInfo, IOwner, IImageSettings } from '../../Common/Interfaces/interfaces';
import { FormatStatusColour, FormatStatusText, FormatInfoTitles } from './formats';
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

const vinInformationPopup = (vin: string) => (
    <section>
        <Typography>
            {vin}
        </Typography>
    </section>
);

const VehicleInfo: React.FC<IVehicleInfoProps> = (props: IVehicleInfoProps) => {
    const classes: IClasses = style();

    const { threadID, owner, vehicle } = props;

    const [open, setOpen] = useState(false);
    const [openVin, setOpenVin] = useState(false);

    const [formattedFeatures, setFormattedFeatures] = useState<Array<React.ReactElement>>([]);
    const [formattedInfo, setFormattedInfo] = useState<Array<React.ReactElement>>([]);
    const [formatStatusText, setFormatStatusText] = useState<string>('');
    const [formattedStatusColour, setFormattedStatusColour] = useState<string>('');

    const handleOpen = () => setOpen(true);
    const handleVinOpen = () => setOpenVin(true);
    const handleVinClose = () => setOpenVin(false);
    const foundConfirmationResponse = () => setOpen(false);

    const capitalizeFirstLetter = (value: string) => {
        if (value === undefined) {
            return '';
        }
        return value.toLowerCase().charAt(0).toUpperCase() + value.toLowerCase().slice(1);
    };

    const formatInfoValues = (key:string, value:string | number | string[] | IImageSettings[]):string | number | string[] | IImageSettings[] => {
        if (key === 'category' && typeof value === 'number') {
            return capitalizeFirstLetter(VehicleCategoryEnum[value]);
        }

        return value;
    };

    const formatFeatures = (features: Array<string>) => {
        const newFormattedFeatures = features.map((damage: string) => (
            <ListItem key={`damages - ${damage}`}>
                <ListItemText primary={damage} />
            </ListItem>
        ));

        setFormattedFeatures(newFormattedFeatures);
    };

    const formatInfo = (data: IVehicleInfo) => {
        const newFormattedInfo = infoKeys.map((indexKey: string) => {
            if (indexKey === 'vin') {
                // const value in if statement to avoid type confusion when using "vinInformationPopup"
                const value: string = data[indexKey];

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
                        <Typography>{indexKey === '' ? 'N/A' : formatInfoValues(indexKey, data[indexKey])}</Typography>
                    </Grid>
                </Grid>
            );
        });

        setFormattedInfo(newFormattedInfo);
    };

    useEffect(() => {
        formatFeatures(vehicle.features);
        formatInfo(vehicle);
        setFormatStatusText(FormatStatusText(vehicle.status));
        setFormattedStatusColour(FormatStatusColour(vehicle.status));
    }, [vehicle]);

    return (
        <section className={classes.container}>
            <section className={classes.topSection}>
                <section className={classes.imageContainer}>
                    <CarouselComponent owner={owner.owner_id} images={vehicle.images} />
                </section>

                <section className={classes.rightSide}>
                    <section className={classes.owner}>
                        <section className={classes.profileImageContainer}>
                            <Avatar className={classes.profileImage} src={`${owner.member_attributes.profile_image}`} />
                        </section>
                        <Typography variant="h6">{owner.member_attributes.display_name}</Typography>
                        <Typography variant="caption">{formatDate(vehicle.date_added)}</Typography>
                    </section>

                    <section className={classes.statusText}>
                        <Typography
                            variant="h4"
                            style={{
                                color: formattedStatusColour,
                            }}
                            className={classes.statusText}
                        >
                            {formatStatusText}
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
                        {formattedInfo}
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
                    <List dense>{formattedFeatures}</List>
                </section>
            </section>
        </section>
    );
};

export default VehicleInfo;
