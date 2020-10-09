import React from 'react';

import NavBarComponent from '../../Components/Header/index';
import FooterComponent from '../../Components/Footer/index';
import style from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';
// import CookiePopupComponent from "../../Components/CookiePopup/index";

interface IHomeProps {

}

// TODO these props should be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HomePage: React.FC<IHomeProps> = (props: IHomeProps) => {
    const classes: IClasses = style();

    return (
        <section className={classes.body}>
            <section id="menu" className={classes.menu}>
                <NavBarComponent />
            </section>










            {/* // test */}

            <section className={classes.mainContentGap}>
                <FooterComponent className={classes.mainContentGap} />
            </section>
        </section>
    );
};

export default HomePage;
