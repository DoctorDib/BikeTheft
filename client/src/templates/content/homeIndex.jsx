import React from 'react';

import NavBarComponent from './Components/HeaderBar';

import Main from './Components/HomePage/Main';
import FooterComponent from './Components/Footer';
import CookiePopupComponent from './Components/CookiePopup';

import styles from '../../styles/main';

const Template = () => {
    const classes = styles();

    return (
        <section className={classes.body}>
            <section id="menu" className={classes.menu}>
                <NavBarComponent />
            </section>

            <section className ={classes.mainContentGap}>
                <Main className={classes.mainContentGap} />
            </section>

            <section className ={classes.mainContentGap}>
                <FooterComponent className={classes.mainContentGap} />
            </section>

            <CookiePopupComponent />
        </section> 
    );
}


export default Template;