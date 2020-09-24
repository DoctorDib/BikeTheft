import React from 'react';
import style from './styles';

import NavBarComponent from "../../Components/Header/index";
import FooterComponent from "../../Components/Footer/index";
import CookiePopupComponent from "../../Components/CookiePopup/index";

interface IHomeProps {

}

export default (props: IHomeProps) => {
    const classes: any = style();

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
