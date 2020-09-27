import React from 'react';
import { Typography } from '@material-ui/core';

import NavBarComponent from '../../Components/Header';
import FooterComponent from '../../Components/Footer';
import AboutInfoComponent from '../../Components/AboutInfo';

import styles from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

const About: React.FC = () => {
    const classes: IClasses = styles();

    return (
        <section className={classes.body}>
            <section id="menu" className={classes.menu}>
                <NavBarComponent />
            </section>

            <section className={classes.mainContentGap}>
                <Typography variant="h4"> About us </Typography>
            </section>

            <section className={classes.mainContentGap}>
                <AboutInfoComponent />
            </section>

            {/* TODO - Add another component for the policies information */}

            <section className={classes.mainContentGap}>
                <FooterComponent />
            </section>
        </section>
    );
};

export default About;
