import React from 'react';
import style from './styles';

import NavBarComponent from "../../Components/Header/index";
import FooterComponent from "../../Components/Footer/index";
import CookiePopupComponent from "../../Components/CookiePopup/index";

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
