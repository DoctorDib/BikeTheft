import React from 'react';
import Divider from '@material-ui/core/Divider';

import NavBarComponent from '../../Components/Header';
import FooterComponent from '../../Components/Footer';
import DetailsComponent from '../../Components/BikeInfo';
import ForumComponent from '../../Components/Forum';


import styles from './styles';

interface IBikeProps {
    match : any
}

const Bike = (props: IBikeProps) => {
    const classes: any = styles();

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
