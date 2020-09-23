import React from 'react';

import NavBarComponent from './Components/HeaderBar';
import FooterComponent from './Components/Footer';

import DetailsComponent from './Components/BikePage/Details';
import ForumComponent from './Components/BikePage/Forum';

import Divider from '@material-ui/core/Divider';

import styles from 'styles/Bike/bikeStyle';

const Template = () => {
    const classes = styles();

    return (
        <section className={classes.body}>
            <section id="menu" className={classes.menu}>
                <NavBarComponent />
            </section>

            <section className ={classes.mainContentGap}>
                <DetailsComponent />
            </section>

            <section className ={classes.mainContentGap}>
                <Divider variant="middle" />
            </section>

            <section className ={classes.mainContentGap}>
                <ForumComponent  />
            </section>

            <section className ={classes.mainContentGap}>
                <FooterComponent />
            </section>

        </section>
    );
}

export default Template;