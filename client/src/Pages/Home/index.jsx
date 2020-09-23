import React from 'react';
import style from './styles';

import NavBarComponent from "Components/Header";
import FooterComponent from "Components/Footer";
import CookiePopupComponent from "Components/CookiePopup";

const Home = () => {
    const classes = style();

    return (
        <section className={classes.body}>
            <section id="menu" className={classes.menu}>
                <NavBarComponent />
            </section>

            <section className ={classes.mainContentGap}>
                <FooterComponent className={classes.mainContentGap} />
            </section>
        </section>
    );
}

export default Home;