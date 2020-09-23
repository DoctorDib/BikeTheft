import React from 'react';
import style from './styles';

import NavBarComponent from "Components/Header";
import FooterComponent from "Components/Footer";
import CookiePopupComponent from "Components/CookiePopup";

export default props => {
    const classes = style();

    return (
        <section className={classes.body}>
            <section id="menu" className={classes.menu}>
                <NavBarComponent />
            </section>

            <section className ={classes.mainContentGap}>
                <main className={classes.mainContentGap} />
            </section>

            <section className ={classes.mainContentGap}>
                <FooterComponent className={classes.mainContentGap} />
            </section>

            <CookiePopupComponent />
        </section>
    );
}
