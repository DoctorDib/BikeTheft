import React from 'react';

import NavBarComponent from '../../Components/Header';
import FooterComponent from '../../Components/Footer';

import VehicleUploadFieldsComponent from '../../Components/VehicleUploadFields';

import style from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IHomeProps {}

const VehicleUploadPage = (): React.ReactElement<IHomeProps> => {
    const classes: IClasses = style();

    return (
        <section className={classes.body}>
            <section id="menu" className={classes.menu}>
                <NavBarComponent />
            </section>

            <section>
                <VehicleUploadFieldsComponent />
            </section>

            <section className={classes.mainContentGap}>
                <FooterComponent className={classes.mainContentGap} />
            </section>
        </section>
    );
};

export default VehicleUploadPage;
