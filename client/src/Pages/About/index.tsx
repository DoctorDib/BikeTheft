import React from 'react';

import NavBarComponent from '../../Components/Header';
import FooterComponent from '../../Components/Footer';
import AboutInfoComponent from '../../Components/AboutInfo';

import styles from './styles';

import { Typography } from '@material-ui/core';

const About = () => {
    const classes: any = styles();

    return (
        <section className={classes.body}>
            <section id="menu" className={classes.menu}>
                <NavBarComponent />
            </section>

            <section className ={classes.mainContentGap}>
                <Typography variant="h4"> About us </Typography>
            </section>
            
            <section className ={classes.mainContentGap}>
                <AboutInfoComponent />
            </section>

            {/* TODO - Add another component for the policies information*/}

            <section className ={classes.mainContentGap}>
                <FooterComponent />
            </section>
        </section>
    );
}

export default About;
