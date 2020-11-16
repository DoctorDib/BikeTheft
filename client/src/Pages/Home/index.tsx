import React from 'react';
import {
    Divider,
    Button,
    Typography,
} from '@material-ui/core';
import classNames from 'classnames';

import WindowSize from '../../Common/Utils/WindowSize';
import LogoComponent from '../../Components/MainLogo';
import SearchComponent from '../../Components/SearchBar';
import VehicleSlideShowComponent from '../../Components/VehicleSlideShow';
import style from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IHomeProps {}

const HomePage = ():React.ReactElement<IHomeProps> => {
    const classes: IClasses = style();

    // TODO - Make it so it checks if user is logged in
    // if logged in redirect to /upload
    // else redirect to sign up
    const onClick = ():string => window.location.href = '/upload';

    const windowSize = WindowSize();

    console.log(windowSize);

    const vehicleSlideShowElement = (
        <section className={classNames(classes.mainContentGap, classes.slideContainer)}>
            <Typography variant="subtitle1"> 20 New Vehicles </Typography>
            <VehicleSlideShowComponent />
        </section>
    );

    return (
        <section style={{ height: '100vh' }}>
            <section className={classes.mainContainer}>

                <section className={classes.topContainer}>
                    <section className={classes.logoContainer}>
                        <LogoComponent />
                    </section>

                    <section className={classes.mainContentGap}>
                        <Typography variant="caption"> Found a suspicious vehicle? Enter the number plate here </Typography>
                        <SearchComponent />

                        <Divider variant="middle" className={classes.divider} />

                        <Typography variant="caption"> Lost a vehicle? Register it today! </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onClick}
                            className={classes.reportButton}
                        >
                            Report my vehicle
                        </Button>
                    </section>
                </section>

                {
                    windowSize !== 'sm'
                        ? vehicleSlideShowElement
                        : null
                }

            </section>
        </section>
    );
};

export default HomePage;
