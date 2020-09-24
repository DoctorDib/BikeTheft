import React from 'react';
import styles from './styles';

import NavBarComponent from 'Components/Header';
import FooterComponent from 'Components/Footer';
import DetailsComponent from 'Components/BikeInfo';
import ForumComponent from 'Components/Forum';

import Divider from '@material-ui/core/Divider';

const Bike = props => {
    const classes = styles();

    const bike_id = props.match.params.id;
    
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

export default Bike;
