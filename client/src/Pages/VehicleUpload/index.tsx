import React from 'react';

import NavBarComponent from '../../Components/Header';
import FooterComponent from '../../Components/Footer';

import VehicleUploadInputsComponent from '../../Components/VehicleUploadInputs';

import style from './styles';
import { IClasses } from '../../Common/Interfaces/IClasses';

interface IHomeProps {
}

// TODO these props should be used
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VehicleUploadPage: React.FC<IHomeProps> = (props: IHomeProps) => {
    const classes: IClasses = style();

    return (
        <section className={classes.body}>
            <section id="menu" className={classes.menu}>
                <NavBarComponent />
            </section>

            <section>
                <VehicleUploadInputsComponent />
            </section>

            <section className={classes.mainContentGap}>
                <FooterComponent className={classes.mainContentGap} />
            </section>
        </section>
    );
};

export default VehicleUploadPage;
